import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { Card } from '../components/ui'
import { Illu } from '../components/Illustrations'
import { BLOCKS } from '../data/levels'
import { LESSONS } from '../data/lessons'
import { localizeLesson } from '../data/localizeLesson'
import { useApp } from '../context/AppContext'
import { useI18n } from '../i18n/useI18n'

export default function Learn() {
  const { progress, isLessonUnlocked } = useApp()
  const { t, lang } = useI18n()
  return (
    <div>
      <h1>{t('mapTitle')}</h1>
      <p className="muted">{t('mapHint')}</p>
      <div className="map">
        {BLOCKS.map((b) => (
          <Card key={b.id} className="block">
            <Illu type={b.id === 'final' ? 'final' : b.id} />
            <h2>
              {b.index} {b.emoji} {t(`block_${b.id}`)}
            </h2>
            <div className="nodes">
              {b.lessons.map((id) => {
                const lesson = localizeLesson(LESSONS[id - 1], lang)
                const done = progress.completedLessons.includes(id)
                const unlocked = isLessonUnlocked(id)
                const current = unlocked && !done
                return (
                  <Link
                    key={id}
                    to={unlocked ? `/lesson/${id}` : '#'}
                    className={`node ${done ? 'done' : current ? 'current' : 'locked'}`}
                    onClick={(e) => {
                      if (!unlocked) e.preventDefault()
                    }}
                  >
                    {done ? '✓' : unlocked ? id : <Lock size={16} />}
                    <div>{lesson.title.split(' ')[0]}</div>
                  </Link>
                )
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
