import { LANGS } from './index'
import { useI18n } from './useI18n'

export function LangSwitch({ compact }) {
  const { lang, setLang } = useI18n()
  return (
    <select className={`lang-select ${compact ? 'compact' : ''}`} value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language">
      {LANGS.map((l) => (
        <option key={l.id} value={l.id}>
          {compact ? l.short : l.label}
        </option>
      ))}
    </select>
  )
}
