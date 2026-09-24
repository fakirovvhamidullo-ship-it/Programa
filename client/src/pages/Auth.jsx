import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from '../components/ui'
import { useApp } from '../context/AppContext'
import { useI18n } from '../i18n/useI18n'
import { LangSwitch } from '../i18n/LangSwitch'
import { tKey } from '../i18n'

export default function Auth() {
  const { register, login, users, settings } = useApp()
  const { t } = useI18n()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '', login: '' })
  const [err, setErr] = useState('')
  const nav = useNavigate()
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      if (mode === 'register') await register(form)
      else await login({ login: form.login || form.email || form.username, password: form.password })
      nav('/learn')
    } catch (ex) {
      setErr(tKey(settings?.language || 'ru', ex.message) || ex.message)
    }
  }

  return (
    <div className="auth">
      <div className="app-bg" />
      <Card className="auth-card">
        <div className="brand" style={{ justifyContent: 'center', paddingBottom: 8 }}>
          <img className="brand-mark" src="/devhub-logo.png" alt="DevHub" style={{ width: 48, height: 48 }} />
        </div>
        <div className="row" style={{ justifyContent: 'center', marginBottom: 8 }}>
          <LangSwitch />
        </div>
        <h1>DEVHUB</h1>
        <p className="muted">{t('authHint')}</p>
        <div className="row">
          <Button variant={mode === 'login' ? 'primary' : 'ghost'} onClick={() => setMode('login')}>
            {t('login')}
          </Button>
          <Button variant={mode === 'register' ? 'primary' : 'ghost'} onClick={() => setMode('register')}>
            {t('register')}
          </Button>
        </div>
        {users.length > 0 && (
          <div className="accounts">
            <div className="muted">{t('accountsHere')}</div>
            {users.map((u) => (
              <button key={u.id} className="account-pick" onClick={() => setForm({ ...form, login: u.username, email: u.email })}>
                <b>{u.username}</b>
                <span className="muted">{u.email}</span>
              </button>
            ))}
          </div>
        )}
        <form onSubmit={submit}>
          {mode === 'register' && (
            <>
              <label className="field">
                Username
                <input value={form.username} onChange={set('username')} required />
              </label>
              <label className="field">
                Email
                <input type="email" value={form.email} onChange={set('email')} required />
              </label>
            </>
          )}
          {mode === 'login' && (
            <label className="field">
              Email / username
              <input value={form.login} onChange={set('login')} required />
            </label>
          )}
          <label className="field">
            {t('password')}
            <input type="password" value={form.password} onChange={set('password')} required />
          </label>
          {mode === 'register' && (
            <label className="field">
              {t('passwordAgain')}
              <input type="password" value={form.confirm} onChange={set('confirm')} required />
            </label>
          )}
          {err && <p className="error">{err}</p>}
          <Button>{mode === 'register' ? t('register') : t('login')}</Button>
        </form>
      </Card>
    </div>
  )
}
