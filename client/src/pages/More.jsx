import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Button, Card, Modal, ProgressBar, AvatarView, StatCard } from '../components/ui'
import { ACHIEVEMENTS, SHOP_ITEMS } from '../data/meta'
import { LESSONS } from '../data/lessons'
import { REFERENCE } from '../data/reference'
import { PROJECTS } from '../data/projects'
import { useApp } from '../context/AppContext'
import { useI18n } from '../i18n/useI18n'
import { WebEditor, PythonEditor, JsConsole } from '../components/editors'
import { GameArena } from '../components/GameArena'
import { Illu } from '../components/Illustrations'

export function Profile() {
  const { user, progress, level, logout, updateProfile } = useApp()
  const [form, setForm] = useState({ username: user?.username || '', email: user?.email || '', password: '' })
  if (!user) return <Navigate to="/auth" />
  return (
    <div>
      <Card className="profile-head">
        <AvatarView user={user} progress={progress} />
        <div className="grow">
          <h1>{user.username}</h1>
          <p className="muted">
            Level {level.level} · {level.name} · {progress.profile?.bio}
          </p>
          <ProgressBar value={level.progress} />
        </div>
        <Button variant="ghost" onClick={logout}>
          Выход
        </Button>
      </Card>
      <div className="grid-stats mt">
        <StatCard label="XP" value={progress.xp} icon="⭐" />
        <StatCard label="DevCoins" value={progress.devCoins} icon="🪙" />
        <StatCard label="Серия" value={`${progress.streak} дн.`} icon="🔥" />
        <StatCard label="Уроки" value={`${progress.completedLessons.length}/30`} icon="📘" />
        <StatCard label="Проекты" value={progress.completedProjects.length} icon="🛠" />
        <StatCard label="Достижения" value={`${progress.achievements.length}/${ACHIEVEMENTS.length}`} icon="🏅" />
      </div>
      <Card style={{ padding: 18 }} className="mt">
        <h3>Изменить данные</h3>
        <label className="field">
          Username
          <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        </label>
        <label className="field">
          Email
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label className="field">
          Новый пароль
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </label>
        <Button onClick={() => updateProfile({ username: form.username, email: form.email }, form.password || undefined)}>Сохранить</Button>
      </Card>
    </div>
  )
}

export function ProgressPage() {
  const { progress, level, isLessonUnlocked, user } = useApp()
  if (!user) return <Navigate to="/auth" />
  const pct = Math.round((progress.completedLessons.length / 30) * 100)
  return (
    <div>
      <h1>Прогресс</h1>
      <Card style={{ padding: 18 }}>
        <h3>Общий прогресс {pct}%</h3>
        <ProgressBar value={pct} />
        <div className="grid-stats mt">
          <StatCard label="Уроки" value={`${progress.completedLessons.length} / 30`} />
          <StatCard label="XP" value={progress.xp} />
          <StatCard label="Level" value={`${level.level} ${level.name}`} />
          <StatCard label="Streak" value={`${progress.streak} дней`} />
          <StatCard label="Проекты" value={progress.completedProjects.length} />
          <StatCard label="Достижения" value={progress.achievements.length} />
        </div>
      </Card>
      <h3>Календарь обучения</h3>
      <div className="calendar">
        {LESSONS.map((l) => {
          const done = progress.completedLessons.includes(l.id)
          const now = isLessonUnlocked(l.id) && !done
          return (
            <Card key={l.id} className={`day-cell ${done ? 'done' : now ? 'now' : 'lock'}`}>
              День {l.id} {done ? '✅' : now ? '🔵' : '🔒'}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export function AchievementsPage() {
  const { progress } = useApp()
  return (
    <div>
      <h1>Достижения</h1>
      <div className="ref-grid">
        {ACHIEVEMENTS.map((a) => {
          const on = progress.achievements.includes(a.id)
          return (
            <Card key={a.id} className="term" style={{ opacity: on ? 1 : 0.5 }}>
              <div style={{ fontSize: 32 }}>{a.icon}</div>
              <b>{a.title}</b>
              <p className="muted">{a.desc}</p>
              {on ? 'Получено' : 'Закрыто'}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export function SettingsPage() {
  const { settings, setSettings, resetProgress, setLanguage } = useApp()
  const { t } = useI18n()
  const [ask, setAsk] = useState(false)
  return (
    <div>
      <h1>{t('settings')}</h1>
      <Card style={{ padding: 18 }}>
        <label className="field">
          {t('theme')}
          <select value={settings.theme} onChange={(e) => setSettings({ ...settings, theme: e.target.value })}>
            <option value="default">{t('themeDark')}</option>
            <option value="light">{t('themeLight')}</option>
            <option value="ember">Ember</option>
            <option value="matrix">Matrix</option>
          </select>
        </label>
        <label className="field">
          {t('language')}
          <select
            value={settings.language}
            onChange={(e) => {
              const language = e.target.value
              setLanguage?.(language)
              setSettings({ ...settings, language })
            }}
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="tg">Тоҷикӣ</option>
          </select>
        </label>
        <label className="field">
          {t('fontScale')}
          <input type="range" min="0.9" max="1.25" step="0.05" value={settings.fontScale} onChange={(e) => setSettings({ ...settings, fontScale: Number(e.target.value) })} />
        </label>
        <label className="field">
          {t('editorFont')}
          <input type="number" value={settings.editor.fontSize} onChange={(e) => setSettings({ ...settings, editor: { ...settings.editor, fontSize: Number(e.target.value) } })} />
        </label>
        <label className="quiz-opt">
          <input type="checkbox" checked={settings.sound} onChange={(e) => setSettings({ ...settings, sound: e.target.checked })} /> {t('sound')}
        </label>
        <label className="quiz-opt">
          <input type="checkbox" checked={settings.animations} onChange={(e) => setSettings({ ...settings, animations: e.target.checked })} /> {t('animations')}
        </label>
        <Button variant="danger" onClick={() => setAsk(true)}>
          {t('resetProgress')}
        </Button>
      </Card>
      <Modal open={ask} title="Сбросить прогресс?" onClose={() => setAsk(false)}>
        <p>Уроки, XP, серия и достижения обнулятся. Это нельзя отменить.</p>
        <div className="row" style={{ justifyContent: 'center' }}>
          <Button
            variant="danger"
            onClick={() => {
              resetProgress()
              setAsk(false)
            }}
          >
            Да, сбросить
          </Button>
          <Button variant="ghost" onClick={() => setAsk(false)}>
            Отмена
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export function SearchPage() {
  const [q, setQ] = useState('')
  const query = q.trim().toLowerCase()
  const hits = useMemo(() => {
    if (!query) return []
    const out = []
    LESSONS.forEach((l) => {
      const blob = `${l.title} ${l.description} ${l.category} ${l.parts.map((p) => p.heading || p.title).join(' ')}`.toLowerCase()
      if (blob.includes(query) || query === 'ram' && [2, 3].includes(l.id)) {
        out.push({ type: 'Урок', title: `Урок ${l.id}: ${l.title}`, to: `/lesson/${l.id}` })
      }
    })
    REFERENCE.forEach((c) =>
      c.items.forEach((it) => {
        if (`${it.term} ${it.name} ${it.text}`.toLowerCase().includes(query)) {
          out.push({ type: `Термин · ${c.title}`, title: `${it.term} — ${it.name}`, to: '/reference' })
        }
      }),
    )
    PROJECTS.forEach((p) => {
      if (`${p.title} ${p.desc}`.toLowerCase().includes(query)) out.push({ type: 'Проект', title: p.title, to: `/projects/${p.id}` })
    })
    if (query === 'ram') {
      out.push({ type: 'Практика', title: 'Практика RAM — куда класть данные', to: '/lesson/3' })
    }
    return out
  }, [query])
  return (
    <div>
      <h1>Поиск</h1>
      <input style={{ width: '100%', maxWidth: 640, padding: 12, borderRadius: 999, border: '1px solid var(--stroke)', background: 'var(--card)' }} placeholder="RAM, HTML, цикл..." value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="mt">
        {hits.map((h, i) => (
          <Link key={h.title + i} to={h.to}>
            <Card className="term" style={{ marginBottom: 8 }}>
              <span className="muted">{h.type}</span>
              <div>{h.title}</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function ReferencePage() {
  const { completeDaily } = useApp()
  const [cat, setCat] = useState('html')
  const cur = REFERENCE.find((d) => d.id === cat)
  return (
    <div>
      <h1>Справочник</h1>
      <div className="row">
        {REFERENCE.map((d) => (
          <Button
            key={d.id}
            variant={cat === d.id ? 'primary' : 'ghost'}
            onClick={() => {
              setCat(d.id)
              completeDaily('dailyRef')
            }}
          >
            {d.title}
          </Button>
        ))}
      </div>
      <div className="ref-grid mt">
        {cur.items.map((it) => (
          <Card key={it.term} className="term">
            <b>{it.term}</b>
            <div>{it.name}</div>
            <p className="muted">{it.text}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function ShopPage() {
  const { progress, buyItem, equip } = useApp()
  return (
    <div>
      <h1>Магазин DevCoins</h1>
      <p>Баланс: 🪙 {progress.devCoins}. Покупки не нужны для прохождения курса.</p>
      <div className="ref-grid">
        {SHOP_ITEMS.map((it) => {
          const own = progress.ownedItems.includes(it.id)
          return (
            <Card key={it.id} className="term">
              <b>{it.name}</b>
              <p className="muted">{it.desc}</p>
              <p>{it.price} 🪙</p>
              {own ? (
                <Button variant="ghost" onClick={() => equip(it.type === 'effect' ? 'effect' : it.type, it.id)}>
                  Надеть
                </Button>
              ) : (
                <Button onClick={() => buyItem(it.id)}>Купить</Button>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export function PracticePage() {
  const { markFirstCode, completeDaily } = useApp()
  const [tab, setTab] = useState('web')
  return (
    <div>
      <h1>Практика</h1>
      <div className="row">
        <Button variant={tab === 'web' ? 'primary' : 'ghost'} onClick={() => setTab('web')}>
          HTML/CSS/JS
        </Button>
        <Button variant={tab === 'py' ? 'primary' : 'ghost'} onClick={() => setTab('py')}>
          Python
        </Button>
        <Button variant={tab === 'js' ? 'primary' : 'ghost'} onClick={() => setTab('js')}>
          JavaScript
        </Button>
        <Button variant={tab === 'game' ? 'primary' : 'ghost'} onClick={() => setTab('game')}>
          Игра
        </Button>
      </div>
      <div className="mt">
        {tab === 'web' && (
          <WebEditor
            initial={{ html: '<h1>Hello DevHub</h1>', css: 'h1{color:#6ee7ff}', js: 'console.log("run")' }}
            onRun={() => {
              markFirstCode()
              completeDaily('dailyCode')
            }}
          />
        )}
        {tab === 'py' && <PythonEditor starter={'print("Hello Python")'} onRun={() => markFirstCode()} />}
        {tab === 'js' && <JsConsole starter={'console.log(2+2)'} expect={['4']} onRun={() => markFirstCode()} />}
        {tab === 'game' && <GameArena mode="full" />}
      </div>
    </div>
  )
}

export function ProjectsPage() {
  const { progress, completeProject } = useApp()
  return (
    <div>
      <h1>Практические проекты</h1>
      <div className="ref-grid">
        {PROJECTS.map((p) => {
          const open = progress.completedLessons.includes(p.afterLesson) || p.afterLesson === 0
          const done = progress.completedProjects.includes(p.id)
          return (
            <Card key={p.id} className="term">
              <Illu type={p.block === 'final' ? 'final' : p.block} />
              <h3>{p.title}</h3>
              <p className="muted">{p.desc}</p>
              {!open && <p>Откроется после урока {p.afterLesson}</p>}
              {open && (
                <Link to={`/projects/${p.id}`}>
                  <Button>{done ? 'Открыть снова' : 'Начать проект'}</Button>
                </Link>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export function ProjectDetail() {
  const { id } = useParams()
  const project = PROJECTS.find((p) => p.id === id)
  const { completeProject, markFirstCode, progress } = useApp()
  if (!project) return <p>Проект не найден</p>
  const done = progress.completedProjects.includes(project.id)
  const pass = () => {
    if (!done) completeProject(project.id, project.xp, project.coins)
  }
  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.desc}</p>
      {project.kind === 'web' && <WebEditor initial={project.starter} onRun={markFirstCode} onPass={pass} />}
      {project.kind === 'python' && <PythonEditor starter={project.starter} onPass={pass} />}
      {project.kind === 'game' && <GameArena mode="full" onWin={pass} />}
      {project.kind === 'js-calc' && (
        <JsConsole
          starter={`function calc(a, op, b) {\n  if (op === "+") return a + b;\n  if (op === "-") return a - b;\n  if (op === "*") return a * b;\n  if (op === "/") return a / b;\n}\nconsole.log(calc(10, "+", 5));\nconsole.log(calc(10, "*", 2));`}
          expect={['15', '20']}
          onPass={pass}
        />
      )}
      {project.kind === 'pc-build' && (
        <Card style={{ padding: 16 }}>
          <p>Отметь, что схема ПК собрана: CPU, RAM, GPU, диск связаны через плату.</p>
          <Button onClick={pass}>Засчитать проект</Button>
        </Card>
      )}
      {(project.kind === 'api' || project.kind === 'crud' || project.kind === 'final') && (
        <Card style={{ padding: 16 }}>
          <p>Открой практику в уроке или нажми, когда проверил API/CRUD вживую.</p>
          <Link to={project.kind === 'final' ? '/lesson/30' : project.kind === 'api' ? '/lesson/27' : '/lesson/29'}>
            <Button variant="ghost">К уроку</Button>
          </Link>
          <Button onClick={pass}>Засчитать проект</Button>
        </Card>
      )}
      {done && <p className="muted">Проект уже дал XP. Повторно опыт не фармится.</p>}
    </div>
  )
}
