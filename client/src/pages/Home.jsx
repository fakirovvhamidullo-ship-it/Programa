import { Link } from 'react-router-dom'
import { Button, Card } from '../components/ui'
import { Illu } from '../components/Illustrations'
import { BLOCKS } from '../data/levels'
import { useApp } from '../context/AppContext'
import { useI18n } from '../i18n/useI18n'

const path = [
  ['🖥', 'block_computer'],
  ['🧠', 'block_programming'],
  ['🌐', 'block_web'],
  ['🎮', 'block_games'],
  ['🐍', 'block_python'],
  ['🗄', 'block_backend'],
  ['🏆', 'block_final'],
]

export default function Home() {
  const { user } = useApp()
  const { t } = useI18n()
  return (
    <div>
      <Card className="hero">
        <div className="particles">
          {Array.from({ length: 18 }, (_, i) => (
            <span key={i} className="dot" style={{ left: `${(i * 53) % 100}%`, animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>
        <div className="muted">DEVHUB</div>
        <h1>DEVHUB</h1>
        <div className="lead">{t('heroLead')}</div>
        <p className="sub">{t('heroSub')}</p>
        <div className="hero-actions">
          <Link to={user ? '/learn' : '/auth'}>
            <Button>{t('startLearn')}</Button>
          </Link>
          <Link to="/learn">
            <Button variant="ghost">{t('viewPath')}</Button>
          </Link>
        </div>
        <div className="glass float-code">
          {`function learn() {\n  const you = "zero";\n  return you + " → builder";\n}`}
        </div>
        <div className="chip-float cpu glass">CPU · 0/1</div>
        <div className="chip-float ram glass">RAM · live</div>
      </Card>
      <h2 className="mt">{t('howTitle')}</h2>
      <div className="ref-grid">
        {[t('how1'), t('how2'), t('how3'), t('how4')].map((line) => (
          <Card key={line} style={{ padding: 16 }}>
            <b>{line}</b>
          </Card>
        ))}
      </div>
      <h2 className="mt">{t('yourPath')}</h2>
      <div className="path">
        {path.map(([e, key], i) => (
          <Card key={key} className="path-item">
            <div className="path-emoji">{e}</div>
            <div>
              <b>{t(key)}</b>
              {i < path.length - 1 && <div className="muted">↓</div>}
            </div>
          </Card>
        ))}
      </div>
      <h2>{t('courseBlocks')}</h2>
      <div className="ref-grid blocks-grid">
        {BLOCKS.map((b) => (
          <Card key={b.id} className="block-card" style={{ '--accent': b.color }}>
            <div className="block-cover">
              <Illu type={b.id === 'final' ? 'final' : b.id} />
              <span className="block-index">{b.index}</span>
            </div>
            <div className="block-body">
              <h3>
                {b.emoji} {t(`block_${b.id}`)}
              </h3>
              <p className="muted">
                {t('lessonsRange')} {b.lessons[0]}–{b.lessons.at(-1)}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
