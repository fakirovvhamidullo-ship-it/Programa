import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/useI18n'

function installed() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
}

export function InstallPhone() {
  const { t } = useI18n()
  const [prompt, setPrompt] = useState(null)
  const [kind, setKind] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (installed()) return
    const ua = navigator.userAgent
    const ios = /iphone|ipad|ipod/i.test(ua)
    const android = /android/i.test(ua)
    if (ios) setKind('ios')
    else if (android) setKind('android')
    else return
    const onPrompt = (event) => {
      event.preventDefault()
      setPrompt(event)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  if (!kind || done) return null

  const add = async () => {
    if (!prompt) return
    prompt.prompt()
    const choice = await prompt.userChoice
    setPrompt(null)
    if (choice.outcome === 'accepted') setDone(true)
  }

  return (
    <div className="glass install-app">
      <img src="/devhub-logo-192.png" alt="" />
      <div>
        <strong>{t('installTitle')}</strong>
        <p>{done ? t('installDone') : kind === 'ios' ? t('installIos') : prompt ? t('installHint') : t('installAndroid')}</p>
      </div>
      {prompt ? (
        <button type="button" className="btn primary" onClick={add}>
          {t('installBtn')}
        </button>
      ) : null}
    </div>
  )
}
