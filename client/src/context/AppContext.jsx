import { createContext, useContext, useEffect, useState } from 'react'
import { LESSONS } from '../data/lessons'
import { ACHIEVEMENTS, DAILY_QUESTS, SHOP_ITEMS } from '../data/meta'
import { getLevel } from '../data/levels'
import { addDays, hashPassword, loadJson, randomSalt, saveJson, todayKey, uid } from '../lib/utils'

const AppContext = createContext(null)
const USERS_KEY = 'devhub_users'
const SESSION_KEY = 'devhub_session'

function emptyProgress() {
  return {
    currentDay: 1,
    completedLessons: [],
    completedParts: {},
    awarded: {},
    xp: 0,
    devCoins: 25,
    streak: 0,
    lastLessonDate: null,
    unlockDates: { 1: todayKey() },
    achievements: [],
    completedProjects: [],
    ownedItems: [],
    supplies: { hint: 0, doubleXp: 0 },
    equipped: { theme: 'default', avatar: 'default', frame: 'none', effect: 'none', editor: 'night' },
    flags: {},
    daily: { date: todayKey() },
    currentPartIndex: {},
    calendar: {},
    retryAfter: {},
    retryUntil: {},
    resumeAt: {},
    profile: { bio: 'Учусь создавать технологии с нуля.' },
  }
}

function defaultSettings() {
  const language = loadJson('devhub_lang', 'ru') || 'ru'
  return {
    theme: 'default',
    language: ['ru', 'en', 'tg'].includes(language) ? language : 'ru',
    fontScale: 1,
    sound: true,
    animations: true,
    editor: { fontSize: 14, theme: 'night', wrap: true },
  }
}

export function AppProvider({ children }) {
  const [users, setUsers] = useState(() => loadJson(USERS_KEY, []))
  const [sessionId, setSessionId] = useState(() => loadJson(SESSION_KEY, null))
  const [progress, setProgress] = useState(emptyProgress)
  const [settings, setSettings] = useState(defaultSettings)
  const [toast, setToast] = useState(null)
  const [achievementQueue, setAchievementQueue] = useState([])
  const [ready, setReady] = useState(false)

  const user = users.find((u) => u.id === sessionId) || null

  useEffect(() => {
    if (!user) {
      setProgress(emptyProgress())
      setSettings(defaultSettings())
      setReady(true)
      return
    }
    setProgress(loadJson(`devhub_progress_${user.id}`, emptyProgress()))
    const loaded = loadJson(`devhub_settings_${user.id}`, defaultSettings())
    const language = loadJson('devhub_lang', loaded.language || 'ru')
    setSettings({ ...loaded, language: ['ru', 'en', 'tg'].includes(language) ? language : 'ru' })
    setReady(true)
  }, [user?.id])

  useEffect(() => {
    saveJson(USERS_KEY, users)
  }, [users])

  useEffect(() => {
    saveJson(SESSION_KEY, sessionId)
  }, [sessionId])

  useEffect(() => {
    if (!user) return
    saveJson(`devhub_progress_${user.id}`, progress)
  }, [progress, user])

  useEffect(() => {
    saveJson('devhub_lang', settings.language || 'ru')
    if (!user) return
    saveJson(`devhub_settings_${user.id}`, settings)
  }, [settings, user])

  const setLanguage = (language) => {
    const next = ['ru', 'en', 'tg'].includes(language) ? language : 'ru'
    saveJson('devhub_lang', next)
    setSettings((s) => ({ ...s, language: next }))
  }

  useEffect(() => {
    if (!user) return
    setProgress((p) => {
      if (p.daily?.date === todayKey()) return p
      return { ...p, daily: { date: todayKey() } }
    })
  }, [user])

  const notify = (text) => {
    setToast({ text, id: Date.now() })
    setTimeout(() => setToast(null), 2800)
  }

  const persistUsers = (next) => setUsers(next)

  const register = async ({ username, email, password, confirm }) => {
    if (!username?.trim() || !email?.trim() || !password) throw new Error('fillAll')
    if (password.length < 6) throw new Error('passShort')
    if (password !== confirm) throw new Error('passMismatch')
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === username.toLowerCase(),
    )
    if (exists) throw new Error('userExists')
    const salt = randomSalt()
    const passwordHash = await hashPassword(password, salt)
    const account = {
      id: uid(),
      username: username.trim(),
      email: email.trim(),
      passwordHash,
      salt,
      createdAt: Date.now(),
    }
    persistUsers([...users, account])
    setSessionId(account.id)
    notify(settings.language === 'en' ? 'Account created. Welcome to DevHub!' : settings.language === 'tg' ? 'Ҳисоб сохта шуд. Хуш омадӣ ба DevHub!' : 'Аккаунт создан. Добро пожаловать в DevHub!')
    return account
  }

  const login = async ({ login: ident, password }) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === ident.toLowerCase() || u.username.toLowerCase() === ident.toLowerCase(),
    )
    if (!found) throw new Error('notFound')
    const hash = await hashPassword(password, found.salt)
    if (hash !== found.passwordHash) throw new Error('badPass')
    setSessionId(found.id)
    notify(`${settings.language === 'en' ? 'Welcome back' : settings.language === 'tg' ? 'Бозгашт муборак' : 'С возвращением'}, ${found.username}`)
  }

  const logout = () => {
    setSessionId(null)
  }

  const updateProfile = async (patch, password) => {
    if (!user) return
    setUsers((list) =>
      list.map((u) => {
        if (u.id !== user.id) return u
        return { ...u, ...patch }
      }),
    )
    if (patch.username || patch.email) notify('Данные профиля обновлены')
    if (password) {
      if (password.length < 6) throw new Error('passShort')
      const salt = randomSalt()
      const passwordHash = await hashPassword(password, salt)
      setUsers((list) => list.map((u) => (u.id === user.id ? { ...u, salt, passwordHash } : u)))
      notify('Пароль изменён')
    }
  }

  const isLessonUnlocked = (id) => {
    if (id === 1) return true
    return progress.completedLessons.includes(id - 1)
  }

  const isAttemptLocked = (id) => {
    const until = progress.retryUntil?.[id]
    return typeof until === 'number' && Date.now() < until
  }

  const failAttempt = (lessonId, spot) => {
    const early = Number(lessonId) <= 5
    const strikesNow = progress.resumeAt?.[lessonId]?.hourStrikes || 0
    const dayLock = !early || strikesNow >= 10
    setProgress((p) => {
      const prev = p.resumeAt?.[lessonId] || {}
      const strikes = prev.hourStrikes || 0
      const lockDay = !early || strikes >= 10
      const until = Date.now() + (lockDay ? 24 : 1) * 60 * 60 * 1000
      return {
        ...p,
        resumeAt: {
          ...p.resumeAt,
          [lessonId]: {
            ...prev,
            ...(spot || {}),
            hourStrikes: lockDay ? 0 : strikes + 1,
            lastLock: lockDay ? 'day' : 'hour',
          },
        },
        retryUntil: { ...(p.retryUntil || {}), [lessonId]: until },
        calendar: { ...p.calendar, [todayKey()]: 'fail' },
      }
    })
    const lang = settings.language
    const msg = !early
      ? lang === 'en'
        ? 'Wrong. This lesson waits 1 day, then the same question.'
        : lang === 'tg'
          ? 'Нодуруст. Ин дарс 1 рӯз, баъд ҳамин савол.'
          : 'Неверно. Этот урок на 1 день, потом тот же вопрос.'
      : dayLock
        ? lang === 'en'
          ? '11th wrong answer. Wait 1 day, then the same question.'
          : lang === 'tg'
            ? 'Хатои 11-ум. 1 рӯз интизор, баъд ҳамин савол.'
            : '11-й раз. Жди 1 день, потом тот же вопрос.'
        : lang === 'en'
          ? 'Wrong. In 1 hour you continue the same question.'
          : lang === 'tg'
            ? 'Нодуруст. Баъди 1 соат ҳамин савол.'
            : 'Неверно. Через 1 час продолжишь этот же вопрос.'
    notify(msg)
  }

  const saveResume = (lessonId, spot) => {
    setProgress((p) => {
      const prev = p.resumeAt?.[lessonId] || {}
      if (prev.part === spot.part && prev.question === spot.question && prev.mistakes === spot.mistakes) return p
      return { ...p, resumeAt: { ...p.resumeAt, [lessonId]: { ...prev, ...spot } } }
    })
  }

  const partKey = (lessonId, partId) => `${lessonId}:${partId}`

  const grantXp = (amount, awardKey) => {
    setProgress((p) => {
      if (awardKey && p.awarded[awardKey]) return p
      return {
        ...p,
        xp: p.xp + amount,
        awarded: awardKey ? { ...p.awarded, [awardKey]: true } : p.awarded,
      }
    })
  }

  const grantCoins = (amount, awardKey) => {
    setProgress((p) => {
      if (awardKey && p.awarded[awardKey]) return p
      return {
        ...p,
        devCoins: p.devCoins + amount,
        awarded: awardKey ? { ...p.awarded, [awardKey]: true } : p.awarded,
      }
    })
  }

  const setFlag = (key, value = true) => {
    setProgress((p) => ({ ...p, flags: { ...p.flags, [key]: value } }))
  }

  const completeDaily = (flag) => {
    setProgress((p) => {
      if (p.daily?.[flag]) return p
      const q = DAILY_QUESTS.find((d) => d.flag === flag)
      return {
        ...p,
        devCoins: p.devCoins + (q?.coins || 0),
        daily: { ...p.daily, date: todayKey(), [flag]: true },
      }
    })
  }

  const evaluateAchievements = (next) => {
    const unlocked = []
    for (const a of ACHIEVEMENTS) {
      if (next.achievements.includes(a.id)) continue
      if (a.check(next)) unlocked.push(a)
    }
    if (!unlocked.length) return next
    let xp = next.xp
    let coins = next.devCoins
    const ids = [...next.achievements]
    unlocked.forEach((a) => {
      ids.push(a.id)
      xp += a.xp
      coins += a.coins
    })
    setAchievementQueue((q) => [...q, ...unlocked])
    return { ...next, achievements: ids, xp, devCoins: coins }
  }

  const completePart = (lessonId, part, { perfect } = {}) => {
    const key = partKey(lessonId, part.id)
    const lesson = LESSONS.find((l) => l.id === lessonId)
    const idx = lesson.parts.findIndex((p) => p.id === part.id)
    const xpMap = { theory: 15, interactive: 20, practice: 35, quiz: 30 }
    setProgress((p) => {
      const already = p.completedParts[key]
      let next = {
        ...p,
        completedParts: { ...p.completedParts, [key]: true },
        currentPartIndex: { ...p.currentPartIndex, [lessonId]: Math.min(idx + 1, lesson.parts.length - 1) },
        flags: {
          ...p.flags,
          perfectQuizzes: (p.flags.perfectQuizzes || 0) + (perfect && part.type === 'quiz' && !already ? 1 : 0),
        },
        daily: p.daily?.dailyPart ? p.daily : { ...p.daily, date: todayKey(), dailyPart: true, awardedPart: true },
      }
      if (!already) {
        const add = xpMap[part.type] || 20
        next.xp += add
        next.awarded = { ...next.awarded, [`part:${key}`]: true }
        if (!p.daily?.dailyPart) next.devCoins += 8
      }
      return evaluateAchievements(next)
    })
    if (settings.sound) beep(880, 0.06)
  }

  const completeLesson = (lessonId) => {
    setProgress((p) => {
      if (p.completedLessons.includes(lessonId)) return p
      const today = todayKey()
      let streak = 1
      if (p.lastLessonDate === today) streak = p.streak
      else if (p.lastLessonDate === addDays(today, -1)) streak = (p.streak || 0) + 1
      const unlockDates = { ...p.unlockDates, [lessonId + 1]: today }
      let next = {
        ...p,
        completedLessons: [...p.completedLessons, lessonId],
        currentDay: Math.max(p.currentDay, lessonId + 1),
        xp: p.xp + ((p.supplies?.doubleXp || 0) > 0 ? 200 : 100),
        supplies: (p.supplies?.doubleXp || 0) > 0 ? { ...p.supplies, doubleXp: p.supplies.doubleXp - 1 } : p.supplies,
        lastLessonDate: today,
        streak,
        unlockDates,
        calendar: { ...p.calendar, [today]: 'done' },
      }
      if (lessonId === 11) next.flags = { ...next.flags, firstCode: true }
      return evaluateAchievements(next)
    })
    if (settings.sound) beep(1200, 0.12)
  }

  const completeProject = (projectId, xp, coins) => {
    setProgress((p) => {
      if (p.completedProjects.includes(projectId)) return p
      return evaluateAchievements({
        ...p,
        completedProjects: [...p.completedProjects, projectId],
        xp: p.xp + xp,
        devCoins: p.devCoins + coins,
      })
    })
    notify('Проект засчитан')
  }

  const buyItem = (id) => {
    const item = SHOP_ITEMS.find((s) => s.id === id)
    if (!item) return
    setProgress((p) => {
      if (p.devCoins < item.price) {
        notify('Не хватает DevCoins')
        return p
      }
      const stock = { ...(p.supplies || {}), [item.id]: (p.supplies?.[item.id] || 0) + 1 }
      notify(`Куплено: ${item.name}. Теперь их ${stock[item.id]}`)
      return evaluateAchievements({
        ...p,
        supplies: stock,
        ownedItems: p.ownedItems.includes(id) ? p.ownedItems : [...p.ownedItems, id],
        devCoins: p.devCoins - item.price,
      })
    })
  }

  const takeHint = () => {
    if ((progress.supplies?.hint || 0) < 1) return false
    setProgress((p) => ({
      ...p,
      supplies: { ...(p.supplies || {}), hint: Math.max(0, (p.supplies?.hint || 0) - 1) },
    }))
    return true
  }
  const equip = (slot, id) => {
    setProgress((p) => ({ ...p, equipped: { ...p.equipped, [slot]: id } }))
    if (id !== 'default') notify('Надето')
  }

  const resetProgress = () => {
    setProgress(emptyProgress())
    notify('Прогресс сброшен')
  }

  const markFirstCode = () => {
    setProgress((p) =>
      evaluateAchievements({
        ...p,
        flags: { ...p.flags, firstCode: true },
        daily: { ...p.daily, date: todayKey(), dailyCode: true },
      }),
    )
    completeDaily('dailyCode')
  }

  const level = getLevel(progress.xp)

  const value = {
    ready,
    users,
    user,
    progress,
    settings,
    setSettings,
    setLanguage,
    toast,
    achievementQueue,
    shiftAchievement: () => setAchievementQueue((q) => q.slice(1)),
    register,
    login,
    logout,
    updateProfile,
    isLessonUnlocked,
    isAttemptLocked,
    failAttempt,
    saveResume,
    completePart,
    completeLesson,
    completeProject,
    buyItem,
    takeHint,
    equip,
    resetProgress,
    grantXp,
    grantCoins,
    setFlag,
    completeDaily,
    markFirstCode,
    notify,
    level,
    setProgress,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  return useContext(AppContext) || {
    ready: false,
    user: null,
    users: [],
    progress: emptyProgress(),
    settings: defaultSettings(),
    toast: null,
    achievementQueue: [],
    shiftAchievement: () => {},
    isLessonUnlocked: () => true,
    completePart: () => {},
    completeLesson: () => {},
    notify: () => {},
    takeHint: () => false,
    level: { level: 1, name: 'Новичок', progress: 0 },
  }
}

function beep(freq, dur) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.frequency.value = freq
    o.connect(g)
    g.connect(ctx.destination)
    g.gain.value = 0.04
    o.start()
    o.stop(ctx.currentTime + dur)
  } catch {
    /* ignore */
  }
}
