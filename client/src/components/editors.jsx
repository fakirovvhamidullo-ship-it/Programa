import { useEffect, useMemo, useState } from 'react'
import { Copy, Play, RotateCcw } from 'lucide-react'
import { Button } from './ui'
import { runPythonSmart } from '../lib/python'
import { useApp } from '../context/AppContext'

function useEditorTheme() {
  const id = useApp()?.progress?.equipped?.editor
  if (id === 'editor-dracula' || id === 'editor-solar') return id
  return ''
}

function lines(text) {
  return text.split('\n').length
}

export function WebEditor({ initial, onRun, checks = [], anyCheck, onPass }) {
  const editorSkin = useEditorTheme()
  const [tab, setTab] = useState('html')
  const [pane, setPane] = useState('code')
  const [html, setHtml] = useState(initial?.html || '')
  const [css, setCss] = useState(initial?.css || '')
  const [js, setJs] = useState(initial?.js || '')
  const [src, setSrc] = useState('')
  const [log, setLog] = useState('')
  const [ok, setOk] = useState(false)

  const doc = useMemo(
    () => `<!doctype html><html><head><style>${css}</style></head><body>${html}<script>
const _c = console;
console.log = (...a) => { parent.postMessage({t:'log', m: a.join(' ')}, '*'); _c.log(...a)};
try { ${js} } catch(e) { parent.postMessage({t:'log', m: String(e)}, '*') }
<\/script></body></html>`,
    [html, css, js],
  )

  useEffect(() => {
    const h = (e) => {
      if (e.data?.t === 'log') setLog((s) => s + e.data.m + '\n')
    }
    window.addEventListener('message', h)
    return () => window.removeEventListener('message', h)
  }, [])

  const run = () => {
    setLog('')
    setSrc(doc + `<!-- ${Date.now()} -->`)
    onRun?.()
    const blob = `${html}\n${css}\n${js}`.toLowerCase()
    const pass = checks.length
      ? anyCheck
        ? checks.some((c) => blob.includes(c.value.toLowerCase()))
        : checks.every((c) => {
            if (c.type === 'html-contains') return html.toLowerCase().includes(c.value.toLowerCase())
            if (c.type === 'css-contains') return css.toLowerCase().includes(c.value.toLowerCase())
            if (c.type === 'js-contains') return js.toLowerCase().includes(c.value.toLowerCase())
            return true
          })
      : true
    setOk(pass)
    if (pass) onPass?.()
    setPane('preview')
  }

  useEffect(() => {
    const t = setTimeout(() => setSrc(doc), 280)
    return () => clearTimeout(t)
  }, [doc])

  const value = tab === 'html' ? html : tab === 'css' ? css : js
  const setValue = tab === 'html' ? setHtml : tab === 'css' ? setCss : setJs

  return (
    <div className={`glass editor ${pane === 'preview' ? 'show-preview' : 'show-code'}`}>
      <div className="editor-mobile-switch">
        <button className={pane === 'code' ? 'on' : ''} onClick={() => setPane('code')}>
          Код
        </button>
        <button className={pane === 'preview' ? 'on' : ''} onClick={() => setPane('preview')}>
          Preview
        </button>
      </div>
      <div className="editor-code">
        <div className="tabs">
          {[
            ['html', 'HTML'],
            ['css', 'CSS'],
            ['js', 'JavaScript'],
          ].map(([id, label]) => (
            <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>
              {label}
            </button>
          ))}
          <Button onClick={run}>
            <Play size={14} /> Запустить
          </Button>
          <button className="icon-btn" onClick={() => { setHtml(initial.html || ''); setCss(initial.css || ''); setJs(initial.js || '') }}>
            <RotateCcw size={14} /> Сбросить
          </button>
          <button className="icon-btn" onClick={() => navigator.clipboard.writeText(value)}>
            <Copy size={14} /> Копировать
          </button>
        </div>
        <div className={`code-wrap ${editorSkin}`}>
          <div className="gutter">
            {Array.from({ length: lines(value) }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea spellCheck={false} value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div className="console">LIVE CONSOLE{'\n'}{log || (ok ? 'Проверка практики: ок' : '')}</div>
      </div>
      <iframe title="preview" className="preview" sandbox="allow-scripts" srcDoc={src} />
    </div>
  )
}

export function JsConsole({ starter, expect = [], onPass, onRun }) {
  const editorSkin = useEditorTheme()
  const [code, setCode] = useState(starter)
  const [out, setOut] = useState('')
  const [ok, setOk] = useState(false)
  const run = () => {
    const logs = []
    const fake = { log: (...a) => logs.push(a.map(String).join(' ')) }
    try {
      const fn = new Function('console', code)
      fn(fake)
      const text = logs.join('\n')
      setOut(text)
      onRun?.()
      const pass = expect.every((e) => text.includes(e))
      setOk(pass)
      if (pass) onPass?.()
      else if (!expect.length) {
        setOk(true)
        onPass?.()
      }
    } catch (e) {
      setOut(String(e.message))
      setOk(false)
    }
  }
  return (
    <div className="glass" style={{ padding: 12 }}>
      <div className={`code-wrap ${editorSkin}`}>
        <div className="gutter">
          {Array.from({ length: lines(code) }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} />
      </div>
      <div className="row mt">
        <Button onClick={run}>
          <Play size={14} /> Запустить
        </Button>
        <button className="icon-btn" onClick={() => setCode(starter)}>
          Сбросить
        </button>
        <button className="icon-btn" onClick={() => navigator.clipboard.writeText(code)}>
          Копировать
        </button>
      </div>
      <pre className="console">{out || 'output'}</pre>
      {ok && <p className="muted">Практика засчитана.</p>}
    </div>
  )
}

export function PythonEditor({ starter, expect = [], onPass, onRun }) {
  const editorSkin = useEditorTheme()
  const [code, setCode] = useState(starter)
  const [out, setOut] = useState('')
  const [err, setErr] = useState('')
  const run = async () => {
    onRun?.()
    const res = await runPythonSmart(code)
    setOut(res.output || '')
    setErr((res.errors || []).join('\n'))
    const text = res.output || ''
    if (!res.errors?.length && expect.every((e) => text.includes(e))) onPass?.()
    if (!expect.length && !res.errors?.length && text) onPass?.()
  }
  return (
    <div className="glass" style={{ padding: 12 }}>
      <div className={`code-wrap ${editorSkin}`}>
        <div className="gutter">
          {Array.from({ length: lines(code) }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} />
      </div>
      <div className="row mt">
        <Button onClick={run}>Запустить Python</Button>
        <button className="icon-btn" onClick={() => setCode(starter)}>
          Сбросить
        </button>
      </div>
      <pre className="console">{out}</pre>
      {err && <p className="error">{err}</p>}
    </div>
  )
}
