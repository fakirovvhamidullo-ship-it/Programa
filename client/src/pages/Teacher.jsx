import { useState } from 'react'
import { Bot } from 'lucide-react'
import { Card, Button } from '../components/ui'
import { useI18n } from '../i18n/useI18n'
import { askTeacher } from '../lib/aiTeacher'
import { useLocation } from 'react-router-dom'

export default function TeacherPage() {
  const { t, lang } = useI18n()
  const loc = useLocation()
  const lessonId = loc.pathname.startsWith('/lesson/') ? Number(loc.pathname.split('/')[2]) : null
  const [text, setText] = useState('')
  const hello = t('teacherHello')
  const [messages, setMessages] = useState([{ role: 'ai', text: hello }])

  const send = (q) => {
    const question = (q ?? text).trim()
    if (!question) return
    const answer = askTeacher(question, lang, lessonId)
    setMessages((m) => [...m, { role: 'user', text: question }, { role: 'ai', text: answer }])
    setText('')
  }

  return (
    <div>
      <h1>
        <Bot size={28} style={{ verticalAlign: 'middle' }} /> {t('teacherTitle')}
      </h1>
      <p className="muted">{t('teacherSub')}</p>
      <p className="muted">{t('teacherHint')}</p>
      <Card style={{ padding: 16 }}>
        <div className="teacher-log" style={{ maxHeight: 420 }}>
          {messages.map((m, i) => (
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
          <Button>{t('teacherSend')}</Button>
        </form>
      </Card>
    </div>
  )
}
