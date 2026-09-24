import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Modal } from '../components/ui'
import { InteractiveView, LessonProgress, PracticeView, QuizView, TheoryView } from '../components/lesson'
import { getLesson } from '../data/lessons'
import { localizeLesson } from '../data/localizeLesson'
import { useApp } from '../context/AppContext'
import { useI18n } from '../i18n/useI18n'

export default function Lesson() {
  const { id } = useParams()
  const { lang, t } = useI18n()
  const raw = getLesson(id)
  const lesson = localizeLesson(raw, lang)
  const nav = useNavigate()
  const { user, progress, isLessonUnlocked, failAttempt, saveResume, completePart, completeLesson } = useApp()
  const [showWin, setShowWin] = useState(false)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  const startIdx = useMemo(() => {
    if (!lesson) return 0
    const resumePart = progress.resumeAt?.[lesson.id]?.part
    const resumePiece = lesson.parts[resumePart]
    if (resumePiece && !progress.completedParts[`${lesson.id}:${resumePiece.id}`]) return resumePart
    const saved = progress.currentPartIndex?.[lesson.id]
    const firstTodo = lesson.parts.findIndex((p) => !progress.completedParts[`${lesson.id}:${p.id}`])
    if (firstTodo === -1) return lesson.parts.length - 1
    if (typeof saved === 'number') return Math.min(Math.max(saved, firstTodo), lesson.parts.length - 1)
    return Math.max(0, firstTodo)
  }, [lesson, progress])

  const [idx, setIdx] = useState(startIdx)
  const [practiceKey, setPracticeKey] = useState(0)

  useEffect(() => {
    setIdx(startIdx)
  }, [lesson?.id])

  if (!user) return <Navigate to="/auth" />
  if (!lesson) return <p>{t('lessonNotFound')}</p>
  if (!isLessonUnlocked(lesson.id)) {
    return (
      <Card style={{ padding: 24 }}>
        <h2>{t('lessonClosed')}</h2>
        <p>{t('lessonClosedHint')}</p>
        <Link to="/learn">
          <Button>{t('toMap')}</Button>
        </Link>
      </Card>
    )
  }

  const until = lesson ? progress.retryUntil?.[lesson.id] : 0
  const locked = typeof until === 'number' && now < until
  if (locked) {
    const spotLock = progress.resumeAt?.[lesson.id] || {}
    const piece = lesson.parts[spotLock.part]
    const qIndex = spotLock.question || 0
    const word =
      piece?.type === 'quiz'
        ? piece.questions?.[qIndex]?.q
        : piece?.answer?.[spotLock.step ?? qIndex]
    const day = spotLock.lastLock === 'day'
    const early = lesson.id <= 5
    const leftMs = Math.max(0, until - now)
    const totalSec = Math.ceil(leftMs / 1000)
    const hh = Math.floor(totalSec / 3600)
    const mm = Math.floor((totalSec % 3600) / 60)
    const ss = totalSec % 60
    const clock = `${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
    return (
      <Card style={{ padding: 24 }}>
        <h2>{t('attemptUsed')}</h2>
        <p>{day ? (early ? t('waitDay') : t('waitDayLate')) : t('waitHour')}</p>
        {word ? <p className="callout">{word}</p> : null}
        {!day && early ? (
          <p>
            {t('pauseCount')}: {spotLock.hourStrikes || 0} / 10
          </p>
        ) : null}
        <p>
          {t('waitLeft')}: {clock}
        </p>
        <Link to="/learn">
          <Button>{t('toMap')}</Button>
        </Link>
      </Card>
    )
  }

  const spot = progress.resumeAt?.[lesson.id] || {}
  const part = lesson.parts[idx]
  const key = `${lesson.id}:${part.id}`
  const done = !!progress.completedParts[key]

  const finishPart = (extra) => {
    completePart(lesson.id, part, extra)
    setIdx((cur) => {
      const next = lesson.parts.findIndex((p, i) => i > cur && !progress.completedParts[`${lesson.id}:${p.id}`])
      return next >= 0 ? next : cur
    })
    const remaining = lesson.parts.filter((p) => p.id !== part.id && !progress.completedParts[`${lesson.id}:${p.id}`])
    if (remaining.length === 0 && !progress.completedLessons.includes(lesson.id)) {
      completeLesson(lesson.id)
      setShowWin(true)
    }
  }

  return (
    <div>
      <p className="muted">
        {t('day')} {lesson.day} · {lesson.duration} {t('min')} · +{lesson.xp} {t('xpLesson')}
      </p>
      <h1>
        {t('lesson')} {lesson.id}. {lesson.title}
      </h1>
      <p>{lesson.description}</p>
      <Card className="callout" style={{ padding: 14 }}>
        <b>{t('howTitle')}</b>
        <p style={{ margin: '8px 0 0' }}>{t('how3')}</p>
        <p className="muted" style={{ margin: '6px 0 0' }}>{t('how4')}</p>
      </Card>
      <LessonProgress lesson={lesson} progress={progress} />
      <div className="lesson-layout mt">
        <Card className="part-list" style={{ padding: 12 }}>
          {lesson.parts.map((p, i) => (
            <button
              key={p.id}
              className={`${i === idx ? 'on' : ''} ${progress.completedParts[`${lesson.id}:${p.id}`] ? 'ok' : ''}`}
              onClick={() => setIdx(i)}
            >
              {progress.completedParts[`${lesson.id}:${p.id}`] ? '✓' : i + 1}. {p.title}
            </button>
          ))}
        </Card>
        <Card style={{ padding: 18 }}>
          {part.type === 'theory' && (
            <>
              <TheoryView part={part} />
              {!done ? <Button onClick={() => finishPart()}>{t('markTheory')}</Button> : <p className="muted">{t('theoryDone')}</p>}
            </>
          )}
          {part.type === 'interactive' && <InteractiveView part={part} onPass={() => !done && finishPart()} />}
          {part.type === 'interactive' && done && <p className="muted">{t('interactiveDone')}</p>}
          {part.type === 'practice' && (
            <PracticeView
              key={`${lesson.id}-${part.id}-${practiceKey}`}
              part={part}
              startStep={spot.step || 0}
              onRun={() => {}}
              onPass={() => finishPart()}
              onFail={(s) => failAttempt(lesson.id, { part: idx, ...(s || {}) })}
            />
          )}
          {part.type === 'quiz' && (
            <QuizView
              key={`${lesson.id}-quiz-${practiceKey}`}
              part={part}
              startAt={spot.question || 0}
              startMistakes={spot.mistakes || 0}
              onProgress={(s) => saveResume?.(lesson.id, { part: idx, ...s })}
              onPass={(e) => finishPart(e)}
              onFail={(s) => failAttempt(lesson.id, { part: idx, ...(s || {}) })}
            />
          )}
          {done && part.type !== 'theory' && (
            <Button variant="ghost" className="mt" onClick={() => setPracticeKey((k) => k + 1)}>
              {t('tryAgain')}
            </Button>
          )}
        </Card>
      </div>
      <Modal open={showWin} onClose={() => setShowWin(false)}>
        <div className="big-check">✓</div>
        <h2>{t('lessonDone')}</h2>
        <p>
          {t('lessonDoneP')} {lesson.id} {t('of30')}.
        </p>
        <p>⭐ +100 XP</p>
        <p>
          🔥 {t('streak')}: {progress.streak} {progress.streak === 1 ? t('day1') : t('days')}
        </p>
        <p>
          {t('progress')}: {t('lesson')} {lesson.id} / 30
        </p>
        {lesson.id < 30 && <p className="muted">{t('nextTomorrow')}</p>}
        {lesson.id === 30 && <p>🏆 {t('courseComplete')}</p>}
        <div className="row" style={{ justifyContent: 'center' }}>
          <Button onClick={() => nav('/learn')}>{t('toMap')}</Button>
          <Button variant="ghost" onClick={() => nav('/progress')}>
            {t('progress')}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
