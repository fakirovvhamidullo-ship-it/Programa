import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { BookOpen, Bot, Home, Map, Medal, Menu, Search, Settings, ShoppingBag, Trophy, User, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useI18n } from '../i18n/useI18n'
import { LangSwitch } from '../i18n/LangSwitch'
import { AiTeacher } from './AiTeacher'

export function Layout({ children }) {
  const app = useApp()
  const nav = useNavigate()
  const loc = useLocation()
  const { t } = useI18n()
  const [moreOpen, setMoreOpen] = useState(false)
  if (!app?.progress) return null
  const { settings, toast, achievementQueue, shiftAchievement, notify } = app
  const onLesson = loc.pathname.startsWith('/lesson/')
  const ach = achievementQueue[0]
  const more = [
    { to: '/achievements', label: t('achievements'), icon: Trophy },
    { to: '/progress', label: t('progress'), icon: Medal },
    { to: '/projects', label: t('projects'), icon: Medal },
    { to: '/reference', label: t('reference'), icon: BookOpen },
    { to: '/shop', label: t('shop'), icon: ShoppingBag },
    { to: '/settings', label: t('settings'), icon: Settings },
  ]
  return (
    <div className="app">
      <div className="shell">
        <header className="topbar">
          <div className="mobile-brand">
            <img className="brand-mark" src="/devhub-logo.png" alt="" />
            <span>DEVHUB</span>
          </div>
          <div className="topbar-tools">
            <button
              type="button"
              className="btn ghost icon-btn"
              onClick={() => app.setSettings?.({ ...settings, theme: settings.theme === 'light' ? 'default' : 'light' })}
            >
              {settings.theme === 'light' ? t('themeDark') : t('themeLight')}
            </button>
            <LangSwitch compact />
            <button type="button" className="btn ghost icon-btn" onClick={() => setMoreOpen(true)} aria-label={t('moreMenu')}>
              <Menu size={18} />
            </button>
          </div>
          <button className="search-mini" onClick={() => nav('/search')} style={{ cursor: 'text' }}>
            <Search size={16} />
            <span className="muted search-hint">{t('search')}</span>
          </button>
        </header>
        <main className="page">{children}</main>
      </div>
      <nav className="bottom-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          <Home size={22} /> {t('home')}
        </NavLink>
        <NavLink to="/learn" className={({ isActive }) => (isActive ? 'active' : '')}>
          <Map size={22} /> {t('learn')}
        </NavLink>
        {onLesson ? (
          <button type="button" className="locked" onClick={() => notify(t('teacherLocked'))}>
            <Bot size={22} /> {t('teacher')}
          </button>
        ) : (
          <NavLink to="/teacher" className={({ isActive }) => (isActive ? 'active' : '')}>
            <Bot size={22} /> {t('teacher')}
          </NavLink>
        )}
        <NavLink to="/practice" className={({ isActive }) => (isActive ? 'active' : '')}>
          <BookOpen size={22} /> {t('practice')}
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
          <User size={22} /> {t('profile')}
        </NavLink>
      </nav>
      {onLesson ? null : <AiTeacher />}
      {toast && <div className="glass toast">{toast.text}</div>}
      {ach && (
        <div className="glass achv-pop" onAnimationEnd={shiftAchievement} onClick={shiftAchievement}>
          <div style={{ fontSize: 32 }}>{ach.icon}</div>
          <b>
            {t('got')}: {ach.title}
          </b>
          <div className="muted">{ach.desc}</div>
        </div>
      )}
      {moreOpen && (
        <div className="more-sheet">
          <div className="more-head">
            <b>{t('moreMenu')}</b>
            <button type="button" className="btn ghost icon-btn" onClick={() => setMoreOpen(false)} aria-label="close">
              <X size={18} />
            </button>
          </div>
          {more.map((l) => (
            <button
              key={l.to}
              type="button"
              className="more-item"
              onClick={() => {
                setMoreOpen(false)
                nav(l.to)
              }}
            >
              <l.icon size={18} /> {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
