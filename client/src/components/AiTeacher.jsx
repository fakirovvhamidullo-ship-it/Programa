import { useState } from 'react'
import { Bot, Send, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useI18n } from '../i18n/useI18n'
import { askTeacher } from '../lib/aiTeacher'

export function AiTeacher() {
  const { t, lang } = useI18n()
  const { user } = useApp()
  const loc = useLocation()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const lessonId = loc.pathname.startsWith('/lesson/') ? Number(loc.pathname.split('/')[2]) : null
  const [messages, setMessages] = useState([])

  const hello = t('teacherHello')
  const shown = messages.length ? messages : [{ role: 'ai', text: hello }]

  const send = (q) => {
    const question = (q ?? text).trim()
    if (!question) return
    const answer = askTeacher(question, lang, lessonId)
    setMessages((m) => [...(m.length ? m : [{ role: 'ai', text: hello }]), { role: 'user', text: question }, { role: 'ai', text: answer }])
    setText('')
  }

  if (!user || loc.pathname.startsWith('/lesson/')) return null

  return (
    <>
      <button type="button" className="teacher-fab" onClick={() => setOpen((v) => !v)} aria-label={t('teacher')}>
        <Bot size={22} />
      </button>
      {open && (
        <div className="teacher-panel glass">
          <div className="teacher-head">
            <b>
              <Bot size={18} /> {t('teacherTitle')}
            </b>
            <button type="button" className="btn ghost" onClick={() => setOpen(false)} aria-label={t('cancel')}>
              <X size={16} />
            </button>
          </div>
          <p className="muted" style={{ margin: '0 0 8px', fontSize: 13 }}>
            {t('teacherSub')}
          </p>
          <div className="teacher-log">
            {shown.map((m, i) => (
              <div key={i} className={`teacher-msg ${m.role}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="teacher-sugs">
            {[t('suggest1'), t('suggest2'), t('suggest3'), t('suggest4')].map((s) => (
              <button type="button" key={s} className="teacher-sug" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
          <form
            className="teacher-form"
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
          >
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder={t('teacherPlaceholder')} />
            <button type="submit" className="btn primary">
              <Send size={16} /> {t('teacherSend')}
            </button>
          </form>
        </div>
      )}
    </>
  )
}
