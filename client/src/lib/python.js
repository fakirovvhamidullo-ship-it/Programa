function tokenize(src) {
  return src.replace(/\t/g, '    ').replace(/\r/g, '')
}

function pyVal(v) {
  if (v === true) return 'True'
  if (v === false) return 'False'
  if (v === null) return 'None'
  if (Array.isArray(v)) return `[${v.map(pyVal).join(', ')}]`
  if (v && typeof v === 'object') {
    return `{${Object.entries(v)
      .map(([k, val]) => `${JSON.stringify(k)}: ${pyVal(val)}`)
      .join(', ')}}`
  }
  if (typeof v === 'string') return v
  return String(v)
}

function splitArgs(s) {
  const out = []
  let cur = ''
  let q = null
  let depth = 0
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (q) {
      if (c === q) q = null
      cur += c
      continue
    }
    if (c === '"' || c === "'") {
      q = c
      cur += c
      continue
    }
    if (c === '[' || c === '{' || c === '(') depth++
    if (c === ']' || c === '}' || c === ')') depth--
    if (c === ',' && depth === 0) {
      out.push(cur.trim())
      cur = ''
    } else cur += c
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

export function runPython(code, stdin = '') {
  const output = []
  const errors = []
  const vars = Object.create(null)
  const fns = Object.create(null)
  const files = Object.create(null)
  const lines = tokenize(code).split('\n')
  const inputLines = String(stdin).split(/\r?\n/)
  let inputI = 0

  const friendly = (msg) => {
    if (/indent/i.test(msg)) return 'Проверь отступы: в Python блоки выравнивают пробелами.'
    if (/not defined|undefined/i.test(msg)) return 'Имя не найдено. Сначала создай переменную или функцию.'
    if (/Syntax/i.test(msg)) return 'Синтаксическая ошибка. Посмотри запятые, скобки и двоеточия.'
    return msg
  }

  function evalExpr(expr, env) {
    expr = expr.trim()
    if (!expr) return null
    if (expr === 'True') return true
    if (expr === 'False') return false
    if (expr === 'None') return null
    if (/^-?\d+$/.test(expr)) return Number(expr)
    if (/^-?\d+\.\d+$/.test(expr)) return Number(expr)
    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
      return expr.slice(1, -1)
    }
    if (expr.startsWith('[') && expr.endsWith(']')) {
      const inner = expr.slice(1, -1).trim()
      if (!inner) return []
      return splitArgs(inner).map((a) => evalExpr(a, env))
    }
    if (expr.startsWith('{') && expr.endsWith('}')) {
      const inner = expr.slice(1, -1).trim()
      const obj = {}
      if (!inner) return obj
      for (const part of splitArgs(inner)) {
        const idx = part.indexOf(':')
        const k = evalExpr(part.slice(0, idx), env)
        obj[k] = evalExpr(part.slice(idx + 1), env)
      }
      return obj
    }
    const lenM = expr.match(/^len\((.*)\)$/)
    if (lenM) {
      const v = evalExpr(lenM[1], env)
      return v.length ?? Object.keys(v).length
    }
    const rangeM = expr.match(/^range\((.*)\)$/)
    if (rangeM) {
      const args = splitArgs(rangeM[1]).map((a) => evalExpr(a, env))
      let start = 0
      let end = args[0]
      if (args.length >= 2) {
        start = args[0]
        end = args[1]
      }
      const arr = []
      for (let i = start; i < end; i++) arr.push(i)
      return arr
    }
    const callM = expr.match(/^([A-Za-z_][\w]*)\((.*)\)$/)
    if (callM && fns[callM[1]]) {
      const fn = fns[callM[1]]
      const args = callM[2].trim() ? splitArgs(callM[2]).map((a) => evalExpr(a, env)) : []
      const local = Object.create(env)
      fn.params.forEach((p, i) => {
        local[p] = args[i]
      })
      let ret
      runBlock(fn.body, local, (v) => {
        ret = v
      })
      return ret
    }
    const idxM = expr.match(/^([A-Za-z_][\w]*)\[(.*)\]$/)
    if (idxM) {
      const arr = env[idxM[1]]
      const key = evalExpr(idxM[2], env)
      return arr[key]
    }
    if (/^[A-Za-z_][\w]*$/.test(expr)) {
      if (!(expr in env)) throw new Error(`${expr} is not defined`)
      return env[expr]
    }
    const addM = expr.match(/^(.*)\s*\+\s*(.*)$/)
    if (addM && !expr.includes('==')) {
      const a = evalExpr(addM[1], env)
      const b = evalExpr(addM[2], env)
      return a + b
    }
    const ops = [
      ['==', (a, b) => a === b],
      ['!=', (a, b) => a !== b],
      ['>=', (a, b) => a >= b],
      ['<=', (a, b) => a <= b],
      ['>', (a, b) => a > b],
      ['<', (a, b) => a < b],
    ]
    for (const [op, fn] of ops) {
      const i = expr.indexOf(op)
      if (i > 0) return fn(evalExpr(expr.slice(0, i), env), evalExpr(expr.slice(i + op.length), env))
    }
    throw new Error(`Не могу понять выражение: ${expr}`)
  }

  function parseBlock(start, baseIndent) {
    const body = []
    let i = start
    while (i < lines.length) {
      const raw = lines[i]
      if (!raw.trim() || raw.trim().startsWith('#')) {
        i++
        continue
      }
      const indent = raw.match(/^ */)[0].length
      if (indent <= baseIndent) break
      body.push(raw)
      i++
    }
    return { body, next: i }
  }

  function runBlock(blockLines, env, onReturn) {
    let i = 0
    const getIndent = (s) => s.match(/^ */)[0].length
    while (i < blockLines.length) {
      const raw = blockLines[i]
      const line = raw.trim()
      if (!line || line.startsWith('#')) {
        i++
        continue
      }
      if (line.startsWith('return ')) {
        onReturn?.(evalExpr(line.slice(7), env))
        return 'return'
      }
      if (line.startsWith('def ')) {
        const m = line.match(/^def\s+([A-Za-z_]\w*)\((.*)\):$/)
        if (!m) throw new Error('SyntaxError: def')
        const indent = getIndent(raw)
        const { body, next } = parseBlockFrom(blockLines, i + 1, indent)
        fns[m[1]] = { params: m[2].trim() ? splitArgs(m[2]) : [], body }
        i = next
        continue
      }
      if (line.startsWith('if ') && line.endsWith(':')) {
        const indent = getIndent(raw)
        const cond = evalExpr(line.slice(3, -1), env)
        const { body, next } = parseBlockFrom(blockLines, i + 1, indent)
        i = next
        let elifBodies = []
        while (i < blockLines.length && blockLines[i].trim().startsWith('elif ') && getIndent(blockLines[i]) === indent) {
          const el = blockLines[i].trim()
          const { body: b, next: n } = parseBlockFrom(blockLines, i + 1, indent)
          elifBodies.push({ cond: el.slice(5, -1), body: b })
          i = n
        }
        let elseBody = null
        if (i < blockLines.length && blockLines[i].trim() === 'else:' && getIndent(blockLines[i]) === indent) {
          const parsed = parseBlockFrom(blockLines, i + 1, indent)
          elseBody = parsed.body
          i = parsed.next
        }
        if (cond) {
          if (runBlock(body, env, onReturn) === 'return') return 'return'
        } else {
          let done = false
          for (const e of elifBodies) {
            if (evalExpr(e.cond, env)) {
              if (runBlock(e.body, env, onReturn) === 'return') return 'return'
              done = true
              break
            }
          }
          if (!done && elseBody) {
            if (runBlock(elseBody, env, onReturn) === 'return') return 'return'
          }
        }
        continue
      }
      if (line.startsWith('for ') && line.endsWith(':')) {
        const m = line.match(/^for\s+([A-Za-z_]\w*)\s+in\s+(.*):$/)
        const indent = getIndent(raw)
        const { body, next } = parseBlockFrom(blockLines, i + 1, indent)
        const seq = evalExpr(m[2], env)
        i = next
        for (const item of seq) {
          env[m[1]] = item
          if (runBlock(body, env, onReturn) === 'return') return 'return'
        }
        continue
      }
      if (line.startsWith('print(') && line.endsWith(')')) {
        const args = splitArgs(line.slice(6, -1)).map((a) => evalExpr(a, env))
        output.push(args.map((a) => (typeof a === 'string' ? a : pyVal(a))).join(' '))
        i++
        continue
      }
      const app = line.match(/^([A-Za-z_]\w*)\.append\((.*)\)$/)
      if (app) {
        env[app[1]].push(evalExpr(app[2], env))
        i++
        continue
      }
      const assignIdx = line.match(/^([A-Za-z_]\w*)\[(.*)\]\s*=\s*(.*)$/)
      if (assignIdx) {
        env[assignIdx[1]][evalExpr(assignIdx[2], env)] = evalExpr(assignIdx[3], env)
        i++
        continue
      }
      const assign = line.match(/^([A-Za-z_]\w*)\s*=\s*(.*)$/)
      if (assign) {
        env[assign[1]] = evalExpr(assign[2], env)
        i++
        continue
      }
      if (/^[A-Za-z_]\w*\(.*\)$/.test(line)) {
        evalExpr(line, env)
        i++
        continue
      }
      throw new Error(`SyntaxError: ${line}`)
    }
    return 'ok'
  }

  function parseBlockFrom(arr, start, baseIndent) {
    const body = []
    let i = start
    while (i < arr.length) {
      const raw = arr[i]
      if (!raw.trim() || raw.trim().startsWith('#')) {
        i++
        continue
      }
      const indent = raw.match(/^ */)[0].length
      if (indent <= baseIndent) break
      body.push(raw)
      i++
    }
    return { body, next: i }
  }

  try {
    vars.input = () => {
      const v = inputLines[inputI] ?? ''
      inputI++
      return v
    }
    runBlock(lines, vars)
  } catch (e) {
    errors.push(friendly(e.message || String(e)))
  }
  return { output: output.join('\n'), errors }
}

export async function runPythonSmart(code, stdin = '') {
  return runPython(code, stdin)
}
