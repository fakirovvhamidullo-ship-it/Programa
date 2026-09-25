import { useEffect, useMemo, useState } from 'react'
import { Button, Card, ProgressBar } from './ui'
import { Illu } from './Illustrations'
import { JsConsole, PythonEditor, WebEditor } from './editors'
import { GameArena } from './GameArena'
import { BLOCKS } from '../data/levels'
import { localRequest, runLocalSql } from '../lib/localApi'
import { useI18n } from '../i18n/useI18n'
import { useApp } from '../context/AppContext'

export function TheoryView({ part }) {
  return (
    <div className="theory">
      <h2>{part.heading}</h2>
      {part.sections.map((s, i) => (
        <div key={i}>
          {s.h && <h3>{s.h}</h3>}
          {s.p && <p>{s.p}</p>}
          {s.list && (
            <ul>
              {s.list.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          )}
          {s.callout && <div className="callout">{s.callout}</div>}
        </div>
      ))}
    </div>
  )
}

export function QuizView({ part, startAt = 0, startMistakes = 0, onPass, onFail, onProgress }) {
  const { t } = useI18n()
  const { takeHint } = useApp()
  const [i, setI] = useState(Math.min(startAt, Math.max(0, (part.questions?.length || 1) - 1)))
  const [picked, setPicked] = useState(null)
  const [done, setDone] = useState(false)
  const [mistakes] = useState(startMistakes)
  const [hint, setHint] = useState(t('quizPick'))
  const [failed, setFailed] = useState(false)
  const q = part.questions[i]

  useEffect(() => {
    onProgress?.({ question: i, mistakes })
  }, [i, mistakes])

  const goNext = () => {
    if (i + 1 >= part.questions.length) {
      setDone(true)
      onPass?.({ perfect: mistakes === 0 })
      return
    }
    setI(i + 1)
    setPicked(null)
    setHint(t('quizPickShort'))
  }

  if (!q) return <p>{t('quizPick')}</p>

  if (failed) {
    return (
      <Card style={{ padding: 20 }}>
        <h3>{t('quizFailedTitle')}</h3>
        <p>{t('quizFailedP')}</p>
      </Card>
    )
  }

  if (done) {
    return (
      <Card style={{ padding: 20 }}>
        <h3>{t('quizPassTitle')}</h3>
        <p>{t('quizPassP')}</p>
      </Card>
    )
  }

  return (
    <div>
      <div className="muted">
        {t('question')} {i + 1} / {part.questions.length}
      </div>
      <h3 style={{ fontSize: 22, lineHeight: 1.35 }}>{typeof q.q === 'string' ? q.q : ''}</h3>
      <p style={{ color: picked !== null && picked !== q.correct ? '#fb7185' : '#6ee7ff', fontWeight: 700 }}>{hint}</p>
      {q.options.map((opt, idx) => {
        const isPick = picked === idx
        const showGood = picked !== null && idx === q.correct && picked === q.correct
        const showBad = isPick && picked !== q.correct
        return (
          <button
            type="button"
            key={`${i}-${idx}`}
            className="quiz-opt"
            style={{
              borderColor: showGood ? '#34d399' : showBad ? '#fb7185' : undefined,
              background: showGood ? 'rgba(52,211,153,.18)' : showBad ? 'rgba(251,113,133,.18)' : undefined,
              color: showGood ? '#34d399' : showBad ? '#fb7185' : undefined,
            }}
            onClick={() => {
              if (picked === q.correct || failed) return
              setPicked(idx)
              if (idx === q.correct) {
                setHint(q.explain ? `${t('quizOk')} ${q.explain}` : t('quizOk'))
                window.setTimeout(goNext, 700)
              } else {
                const helped = takeHint()
                setHint(helped && q.explain ? q.explain : t('quizBad'))
                window.setTimeout(() => {
                  setPicked(null)
                  setHint(t('quizPickShort'))
                }, 700)
              }
            }}
          >
            {typeof opt === 'string' ? opt : ''}
          </button>
        )
      })}
    </div>
  )
}

function OrderPractice({ items, answer, startStep = 0, onPass, onFail }) {
  const { t } = useI18n()
  const steps = answer?.length ? answer : items || []
  const [pool] = useState(() => {
    const s = [...steps].sort(() => Math.random() - 0.5)
    if (s[0] === steps[0] && s.length > 1) {
      const t0 = s[0]
      s[0] = s[s.length - 1]
      s[s.length - 1] = t0
    }
    return s
  })
  const [built, setBuilt] = useState(() => steps.slice(0, Math.max(0, Math.min(startStep, steps.length))))
  const [msg, setMsg] = useState(t('quizPick'))
  const [err, setErr] = useState(false)
  const [failed, setFailed] = useState(false)

  const click = (step) => {
    if (failed || built.includes(step)) return
    const need = steps[built.length]
    if (step !== need) {
      setErr(true)
      setMsg(t('quizBad'))
      return
    }
    const next = [...built, step]
    setBuilt(next)
    setErr(false)
    if (next.length === steps.length) {
      setMsg(t('quizOk'))
      onPass?.()
    } else {
      setMsg(`${t('quizOk')} ${next.length}/${steps.length}`)
    }
  }

  return (
    <div style={{ position: 'relative', zIndex: 5 }}>
      <p style={{ color: err ? '#fb7185' : '#6ee7ff', fontWeight: 800, fontSize: 18 }}>{msg}</p>
      <div style={{ margin: '12px 0' }}>
        {steps.map((step, i) => (
          <div key={step} className="path-item glass" style={{ marginTop: 8, borderColor: built[i] ? '#34d399' : undefined }}>
            <div>{i + 1}</div>
            <b>{built[i] || '...'}</b>
          </div>
        ))}
      </div>
      {pool.map((step) => {
        const used = built.includes(step)
        return (
          <div
            key={step}
            role="button"
            tabIndex={0}
            onMouseDown={(e) => {
              e.preventDefault()
              e.stopPropagation()
              click(step)
            }}
            style={{
              marginTop: 10,
              padding: 16,
              borderRadius: 16,
              border: used ? '2px solid #34d399' : '2px solid #6ee7ff',
              background: used ? 'rgba(52,211,153,.2)' : 'rgba(16,22,40,.95)',
              color: '#fff',
              cursor: used ? 'default' : 'pointer',
              fontSize: 18,
              fontWeight: 700,
              opacity: used ? 0.45 : 1,
              userSelect: 'none',
            }}
          >
            {used ? '✓ ' : ''}
            {step}
          </div>
        )
      })}
    </div>
  )
}

function MatchPractice({ pairs, onPass }) {
  const [sel, setSel] = useState(null)
  const [links, setLinks] = useState({})
  const [msg, setMsg] = useState('Выбери термин слева, затем его значение справа.')
  const rights = useMemo(() => [...pairs.map((p) => p[1])].sort(() => Math.random() - 0.5), [pairs])
  const connect = (left, right) => {
    const pair = pairs.find((p) => p[0] === left)
    if (!pair || pair[1] !== right) {
      setMsg('Неверная пара. Попробуй другую.')
      setSel(null)
      return
    }
    const next = { ...links, [left]: right }
    setLinks(next)
    setSel(null)
    if (pairs.every((p) => next[p[0]] === p[1])) {
      setMsg('Все пары верны!')
      onPass?.()
    } else setMsg('Верно. Собери остальные пары.')
  }
  return (
    <div>
      <p className="muted">{msg}</p>
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div className="grow">
          {pairs.map((p) => (
            <button
              key={p[0]}
              className={`quiz-opt ${sel === p[0] ? 'good' : ''}`}
              onClick={() => {
                setSel(p[0])
                setMsg(`Выбрано: ${p[0]}. Теперь нажми значение справа.`)
              }}
            >
              {p[0]} → {links[p[0]] || '...'}
            </button>
          ))}
        </div>
        <div className="grow">
          {rights.map((r) => (
            <button
              key={r}
              className="quiz-opt"
              onClick={() => {
                if (!sel) {
                  setMsg('Сначала нажми термин слева.')
                  return
                }
                connect(sel, r)
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ChecksPractice({ checks, onPass }) {
  const [st, setSt] = useState({})
  const [msg, setMsg] = useState('Отметь верные утверждения, затем проверь.')
  return (
    <div>
      <p style={{ color: '#6ee7ff', fontWeight: 700 }}>{msg}</p>
      {checks.map((c) => (
        <label key={c.text} className="quiz-opt" style={{ cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={!!st[c.text]}
            onChange={(e) => setSt({ ...st, [c.text]: e.target.checked })}
          />{' '}
          {c.text}
        </label>
      ))}
      <Button
        className="mt"
        type="button"
        onClick={() => {
          const good = checks.every((c) => !!st[c.text] === c.ok)
          setMsg(good ? 'Верно! Часть засчитана.' : 'Есть ошибки. Подумай ещё и проверь снова.')
          if (good) onPass?.()
        }}
      >
        Проверить
      </Button>
    </div>
  )
}

function CasesPractice({ cases, onPass }) {
  const opts = ['CPU', 'RAM', 'Диск', 'GPU']
  const [ans, setAns] = useState({})
  const [msg, setMsg] = useState('Выбери ответ в каждом списке.')
  return (
    <div>
      <p style={{ color: '#6ee7ff', fontWeight: 700 }}>{msg}</p>
      {cases.map((c) => (
        <div key={c.text} className="field">
          <span>{c.text}</span>
          <select
            value={ans[c.text] || ''}
            onChange={(e) => {
              const next = { ...ans, [c.text]: e.target.value }
              setAns(next)
              setMsg(`Выбрано: ${e.target.value}`)
              if (cases.every((x) => next[x.text] === x.answer)) {
                setMsg('Верно! Часть засчитана.')
                onPass?.()
              }
            }}
          >
            <option value="">выбери</option>
            {opts.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}

function Interactive({ part, onPass }) {
  const [info, setInfo] = useState('Кликни элемент, чтобы узнать роль.')
  const [clicked, setClicked] = useState({})
  const [bits, setBits] = useState([0, 0, 0, 1])
  const [done, setDone] = useState(false)

  const pass = () => {
    if (done) return
    setDone(true)
    onPass?.()
  }

  if (part.kind === 'pc-diagram' || part.kind === 'hardware-cards') {
    const parts = [
      ['CPU', 'Мозг: выполняет инструкции.'],
      ['RAM', 'Рабочий стол: быстро, но забывает при выключении.'],
      ['SSD', 'Шкаф: файлы живут после выключения.'],
      ['GPU', 'Художник кадров и 3D.'],
    ]
    return (
      <div>
        <p style={{ color: '#6ee7ff', fontWeight: 700 }}>{info}</p>
        <div className="pc-board">
          {parts.map((p) => (
            <Card
              key={p[0]}
              className="pc-part"
              style={{ outline: clicked[p[0]] ? '2px solid #6ee7ff' : undefined, cursor: 'pointer' }}
              onClick={() => {
                setInfo(p[1])
                const next = { ...clicked, [p[0]]: true }
                setClicked(next)
                if (parts.every((x) => next[x[0]])) pass()
              }}
            >
              <b>{p[0]}</b>
            </Card>
          ))}
        </div>
        <Button className="mt" type="button" onClick={pass}>
          Я понял схему
        </Button>
      </div>
    )
  }
  if (part.kind === 'io-cycle' || part.kind === 'browser-flow' || part.kind === 'request-flow' || part.kind === 'game-loop' || part.kind === 'os-layers' || part.kind === 'final-stack') {
    const flows = {
      'io-cycle': ['Ввод', 'Обработка', 'Вывод'],
      'browser-flow': ['URL', 'HTTP запрос', 'HTML', 'Рендер'],
      'request-flow': ['Frontend', 'Request', 'Backend', 'Database', 'Response'],
      'game-loop': ['Input', 'Update', 'Collide', 'Draw'],
      'os-layers': ['Железо', 'ОС', 'Программы', 'Ты'],
      'final-stack': ['React UI', 'Express API', 'SQLite', 'Прогресс'],
    }
    const list = flows[part.kind] || []
    return (
      <div>
        <p style={{ color: '#6ee7ff', fontWeight: 700 }}>Нажимай шаги по очереди.</p>
        {list.map((x, i) => (
          <button
            type="button"
            key={x}
            className="quiz-opt"
            style={{ background: clicked[x] ? 'rgba(52,211,153,.2)' : undefined, borderColor: clicked[x] ? '#34d399' : undefined }}
            onClick={() => {
              const next = { ...clicked, [x]: true }
              setClicked(next)
              if (list.every((step) => next[step])) pass()
            }}
          >
            {i + 1}. {x}
          </button>
        ))}
        <Button className="mt" type="button" onClick={pass}>
          Дальше
        </Button>
      </div>
    )
  }
  if (part.kind === 'bits') {
    const val = bits.reduce((a, b, i) => a + b * 2 ** (bits.length - 1 - i), 0)
    return (
      <div>
        <p style={{ color: '#6ee7ff', fontWeight: 700 }}>Кликни бит, чтобы переключить 0/1.</p>
        <div className="row">
          {bits.map((b, i) => (
            <Button key={i} variant="ghost" type="button" onClick={() => setBits(bits.map((x, j) => (j === i ? 1 - x : x)))}>
              {b}
            </Button>
          ))}
        </div>
        <p>Число: {val}</p>
        <Button type="button" onClick={pass}>
          Засчитать интерактив
        </Button>
      </div>
    )
  }
  return (
    <div>
      <Illu type={BLOCKS.find((b) => b.id === 'web') ? 'web' : 'computer'} />
      <Button type="button" onClick={pass}>
        Понятно
      </Button>
    </div>
  )
}

function ApiLab({ onPass }) {
  const [out, setOut] = useState('')
  const call = (method, path, body) => {
    const res = localRequest(method, path, body)
    setOut(`${method} ${path}\n${res.status}\n${JSON.stringify(res.data, null, 2)}`)
    if (res.status < 400) onPass?.()
  }
  return (
    <div>
      <p className="muted">Учебный API в браузере — сервер не нужен.</p>
      <div className="row">
        <Button onClick={() => call('GET', '/api/health')}>GET /health</Button>
        <Button onClick={() => call('GET', '/api/lab/items')}>GET items</Button>
        <Button onClick={() => call('POST', '/api/lab/items', { name: 'coin' })}>POST item</Button>
        <Button onClick={() => call('PUT', '/api/lab/items/1', { name: 'gem' })}>PUT item</Button>
        <Button variant="ghost" onClick={() => call('DELETE', '/api/lab/items/1')}>
          DELETE
        </Button>
      </div>
      <pre className="console">{out}</pre>
    </div>
  )
}

function SqlLab({ onPass }) {
  const [sql, setSql] = useState('SELECT * FROM users;')
  const [out, setOut] = useState('')
  const run = () => {
    const data = runLocalSql(sql)
    setOut(JSON.stringify(data, null, 2))
    if (!data.error) onPass?.()
  }
  return (
    <div>
      <p className="muted">SQL выполняется локально в памяти браузера.</p>
      <textarea className="field" style={{ width: '100%', minHeight: 80 }} value={sql} onChange={(e) => setSql(e.target.value)} />
      <Button onClick={run}>Выполнить SQL</Button>
      <pre className="console">{out}</pre>
    </div>
  )
}

function CrudLab({ onPass }) {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({ username: 'neo', email: 'neo@hub' })
  const refresh = () => {
    setRows(localRequest('GET', '/api/crud/users').data)
    onPass?.()
  }
  const create = () => {
    localRequest('POST', '/api/crud/users', form)
    refresh()
  }
  return (
    <div>
      <p className="muted">CRUD без сервера: данные живут в этой вкладке.</p>
      <div className="row">
        <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Button onClick={create}>Создать</Button>
        <Button variant="ghost" onClick={refresh}>
          Прочитать
        </Button>
      </div>
      <ul>
        {rows.map((r) => (
          <li key={r.id}>
            {r.id} {r.username} {r.email}
            <Button
              variant="ghost"
              onClick={() => {
                localRequest('DELETE', `/api/crud/users/${r.id}`)
                setRows(localRequest('GET', '/api/crud/users').data)
                onPass?.()
              }}
            >
              Удалить
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FinalLab({ onPass }) {
  const [checks, setChecks] = useState({})
  const items = ['Регистрация и вход работают', 'Профиль показывает XP', 'Локальный API понятен', 'CRUD понятен', 'Прогресс сохраняется', 'Интерфейс аккуратный']
  return (
    <div>
      {items.map((t) => (
        <label key={t} className="quiz-opt">
          <input
            type="checkbox"
            checked={!!checks[t]}
            onChange={(e) => {
              const n = { ...checks, [t]: e.target.checked }
              setChecks(n)
              if (items.every((i) => n[i])) onPass?.()
            }}
          />{' '}
          {t}
        </label>
      ))}
    </div>
  )
}

export function PracticeView({ part, startStep = 0, onPass, onRun, onFail }) {
  if (part.kind === 'choice-build' || part.kind === 'algo-order' || part.kind === 'order-cpu') {
    return <OrderPractice items={part.items} answer={part.answer} startStep={startStep} onPass={onPass} onFail={onFail} />
  }
  if (part.kind === 'pc-match') return <MatchPractice pairs={part.pairs} onPass={onPass} />
  if (part.kind === 'paths') return <ChecksPractice checks={part.checks} onPass={onPass} />
  if (part.kind === 'ram-story') return <CasesPractice cases={part.cases} onPass={onPass} />
  if (part.kind === 'js-run') return <JsConsole starter={part.starter} expect={part.expect} onPass={onPass} onRun={onRun} />
  if (part.kind === 'web') return <WebEditor initial={part.starter} checks={part.checks} anyCheck={part.anyCheck} onPass={onPass} onRun={onRun} />
  if (part.kind === 'python') return <PythonEditor starter={part.starter} expect={part.expect} onPass={onPass} onRun={onRun} />
  if (part.kind === 'game-mini') return <GameArena mode="trainer" onWin={onPass} />
  if (part.kind === 'game-full') return <GameArena mode="full" onWin={onPass} />
  if (part.kind === 'api') return <ApiLab onPass={onPass} />
  if (part.kind === 'sql') return <SqlLab onPass={onPass} />
  if (part.kind === 'crud') return <CrudLab onPass={onPass} />
  if (part.kind === 'final') return <FinalLab onPass={onPass} />
  return <Button onClick={onPass}>Отметить практику</Button>
}

export function InteractiveView({ part, onPass }) {
  return <Interactive part={part} onPass={onPass} />
}

export function LessonProgress({ lesson, progress }) {
  const done = lesson.parts.filter((p) => progress.completedParts[`${lesson.id}:${p.id}`]).length
  const pct = Math.round((done / lesson.parts.length) * 100)
  return (
    <div>
      <div className="muted">
        {done} / {lesson.parts.length} выполнено
      </div>
      <ProgressBar value={pct} />
    </div>
  )
}
