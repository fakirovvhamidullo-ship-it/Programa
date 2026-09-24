import { useApp } from '../context/AppContext'
import { pick, tKey } from './index'

export function useI18n() {
  const app = useApp()
  const lang = app?.settings?.language || 'ru'
  const t = (key) => tKey(lang, key)
  const setLang = (language) => app?.setLanguage?.(language)
  const tx = (value) => pick(value, lang)
  return { lang, t, setLang, tx }
}
