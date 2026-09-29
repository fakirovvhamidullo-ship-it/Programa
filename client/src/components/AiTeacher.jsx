import { useEffect, useRef, useState } from 'react'
import { Bot, Eraser, Send, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useI18n } from '../i18n/useI18n'
import { askTeacher } from '../lib/aiTeacher'

const FOLLOW = [
  { key: 'followSimple', text: { ru: 'Проще', en: 'Simpler', tg: 'Осонтар' } },
  { key: 'followExample', text: { ru: 'Пример', en: 'Example', tg: 'Мисол' } },
  { key: 'followPython', text: { ru: 'На Python', en: 'In Python', tg: 'Дар Python' } },
]

export function AiTeacher({ embedded = false } = {}) {
  const { t, lang } = useI18n()
  const { user } = useApp()
  const loc = useLocation()
  const [open, setOpen] = useState(embedded)
  const [text, setText] = useState('')
  const lessonId = loc.pathname.startsWith('/lesson/') ? Number(loc.pathname.split('/')[2]) : null
  const [messages, setMessages] = useState([])
  const logRef = useRef(null)
  const hello = t('teacherHello')
  const shown = messages.length ? messages : [{ role: 'ai', text: hello }]
  const canFollow = messages.some((m) => m.role === 'user')

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [shown, open])

  const send = (q) => {
    const question = (q ?? text).trim()
    if (!question) return
    const history = messages.length ? messages : [{ role: 'ai', text: hello }]
    const answer = askTeacher(question, lang, lessonId, history)
    setMessages((m) => [...(m.length ? m : [{ role: 'ai', text: hello }]), { role: 'user', text: question }, { role: 'ai', text: answer }])
    setText('')
  }

  const clear = () => {
    setMessages([])
    setText('')
  }

  if (!user && !embedded) return null
  if (!embedded && loc.pathname === '/teacher') return null

  const panel = (
    <div className={embedded ? 'teacher-embed' : 'teacher-panel glass'}>
      {!embedded && (
        <div className="teacher-head">
          <b>
            <Bot size={18} /> {t('teacherTitle')}
          </b>
          <div className="row" style={{ gap: 4 }}>
            <button type="button" className="btn ghost" onClick={clear} aria-label={t('teacherClear')}>
              <Eraser size={16} />
            </button>
            <button type="button" className="btn ghost" onClick={() => setOpen(false)} aria-label={t('cancel')}>
              <X size={16} />
            </button>
          </div>
        </div>
      )}
      <p className="muted" style={{ margin: '0 0 8px', fontSize: 13 }}>
        {t('teacherSub')}
      </p>
      <div className="teacher-log" ref={logRef} style={embedded ? { maxHeight: 420 } : undefined}>
        {shown.map((m, i) => (
          <div key={i} className={`teacher-msg ${m.role}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="teacher-sugs">
        {[t('suggest1'), t('suggest2'), t('suggest3'), lessonId ? t('suggest4') : t('suggest5')].map((s) => (
          <button type="button" key={s} className="teacher-sug" onClick={() => send(s)}>
            {s}
          </button>
        ))}
      </div>
      {canFollow && (
        <div className="teacher-sugs">
          {FOLLOW.map((f) => (
            <button type="button" key={f.key} className="teacher-sug on" onClick={() => send(f.text[lang] || f.text.ru)}>
              {f.text[lang] || f.text.ru}
            </button>
          ))}
          {embedded && (
            <button type="button" className="teacher-sug" onClick={clear}>
              {t('teacherClear')}
            </button>
          )}
        </div>
      )}
      <form
        className="teacher-form"
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
      >
        <textarea
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send()
            }
          }}
          placeholder={t('teacherPlaceholder')}
        />
        <button type="submit" className="btn primary">
          <Send size={16} /> {t('teacherSend')}
        </button>
      </form>
    </div>
  )

  if (embedded) return panel

  return (
    <>
      <button type="button" className="teacher-fab" onClick={() => setOpen((v) => !v)} aria-label={t('teacher')}>
        <Bot size={22} />
      </button>
      {open && panel}
    </>
  )
}
