import { Link } from 'react-router-dom'
import { Card } from '../components/ui'
import { Illu } from '../components/Illustrations'
import { BlockIcon } from '../components/BlockIcon'
import { LessonBadge } from '../components/LessonBadge'
import { BLOCKS } from '../data/levels'
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
          <Card key={b.id} className="block" style={{ '--accent': b.color }}>
            <Illu type={b.id === 'final' ? 'final' : b.id} />
            <h2>
              <span className="muted">{b.index}</span>
              <BlockIcon id={b.id} />
              {t(`block_${b.id}`)}
            </h2>
            <div className="nodes">
              {b.lessons.map((id) => {
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
                    <LessonBadge id={id} lang={lang} done={done} locked={!unlocked} />
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
