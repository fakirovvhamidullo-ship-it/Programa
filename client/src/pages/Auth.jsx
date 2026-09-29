import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from '../components/ui'
import { useApp } from '../context/AppContext'
import { useI18n } from '../i18n/useI18n'
import { LangSwitch } from '../i18n/LangSwitch'
import { tKey } from '../i18n'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

function loadGoogleScript() {
  if (window.google?.accounts?.oauth2) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-google-auth]')
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('googleFail')), { once: true })
      return
    }
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.dataset.googleAuth = '1'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('googleFail'))
    document.head.appendChild(script)
  })
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.5 5.7-6.7 7.2l6.3 5.3C37.4 38.3 44 33 44 24c0-1.2-.1-2.3-.4-3.5z" />
    </svg>
  )
}

export default function Auth() {
  const { register, login, loginWithGoogle, users, settings } = useApp()
  const { t } = useI18n()
  const [mode, setMode] = useState('login')
  const [err, setErr] = useState('')
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '', login: '' })
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [googleBusy, setGoogleBusy] = useState(false)
  const nav = useNavigate()
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const signInGoogle = async () => {
    setErr('')
    if (!GOOGLE_CLIENT_ID) {
      setErr(t('googleMissing'))
      return
    }
    setGoogleBusy(true)
    try {
      await loadGoogleScript()
      const profile = await new Promise((resolve, reject) => {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'openid email profile',
          callback: async (resp) => {
            try {
              if (resp.error) {
                if (resp.error === 'popup_closed_by_user' || resp.error === 'access_denied') {
                  resolve(null)
                  return
                }
                throw new Error('googleFail')
              }
              const info = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${resp.access_token}` },
              })
              if (!info.ok) throw new Error('googleFail')
              const data = await info.json()
              if (!data.email || !data.sub) throw new Error('googleFail')
              resolve({ email: data.email, name: data.name || '', sub: data.sub })
            } catch (ex) {
              reject(ex)
            }
          },
          error_callback: () => reject(new Error('googleFail')),
        })
        client.requestAccessToken({ prompt: 'select_account' })
      })
      if (!profile) return
      await loginWithGoogle(profile)
      nav('/learn')
    } catch (ex) {
      setErr(tKey(settings?.language || 'ru', ex.message) || ex.message)
    } finally {
      setGoogleBusy(false)
    }
  }

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
        <button type="button" className="google-btn" onClick={signInGoogle} disabled={googleBusy}>
          <GoogleMark />
          <span>
            {t('googleLogin').split('Google')[0]}
            <span className="google-word">Google</span>
            {t('googleLogin').split('Google')[1] || ''}
          </span>
        </button>
        <div className="auth-or">{t('authOr')}</div>
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
            <span className="pass-row">
              <input type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')} required />
              <button type="button" className="pass-eye" onClick={() => setShowPass((v) => !v)}>
                {showPass ? t('hidePassword') : t('showPassword')}
              </button>
            </span>
          </label>
          {mode === 'register' && (
            <label className="field">
              {t('passwordAgain')}
              <span className="pass-row">
                <input type={showConfirm ? 'text' : 'password'} value={form.confirm} onChange={set('confirm')} required />
                <button type="button" className="pass-eye" onClick={() => setShowConfirm((v) => !v)}>
                  {showConfirm ? t('hidePassword') : t('showPassword')}
                </button>
              </span>
            </label>
          )}
          {err && <p className="error">{err}</p>}
          <Button>{mode === 'register' ? t('register') : t('login')}</Button>
        </form>
      </Card>
    </div>
  )
}
