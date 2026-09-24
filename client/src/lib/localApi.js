let items = [{ id: 1, name: 'coin' }]
let itemSeq = 2
let users = [
  { id: 1, username: 'ada', email: 'ada@devhub.local', progress: 3 },
  { id: 2, username: 'neo', email: 'neo@devhub.local', progress: 1 },
]
let userSeq = 3

function clone(x) {
  return JSON.parse(JSON.stringify(x))
}

export function localRequest(method, path, body) {
  const m = method.toUpperCase()
  if (path === '/api/health' && m === 'GET') {
    return { status: 200, data: { ok: true, service: 'devhub-local', mode: 'browser' } }
  }
  if (path === '/api/lab/items' && m === 'GET') return { status: 200, data: clone(items) }
  if (path === '/api/lab/items' && m === 'POST') {
    const row = { id: itemSeq++, name: body?.name || 'item' }
    items.push(row)
    return { status: 201, data: row }
  }
  const putItem = path.match(/^\/api\/lab\/items\/(\d+)$/)
  if (putItem && m === 'PUT') {
    const id = Number(putItem[1])
    const row = items.find((i) => i.id === id)
    if (!row) return { status: 404, data: { error: 'not found' } }
    row.name = body?.name || row.name
    return { status: 200, data: clone(row) }
  }
  if (putItem && m === 'DELETE') {
    const id = Number(putItem[1])
    items = items.filter((i) => i.id !== id)
    return { status: 200, data: { ok: true } }
  }
  if (path === '/api/crud/users' && m === 'GET') return { status: 200, data: clone(users) }
  if (path === '/api/crud/users' && m === 'POST') {
    const row = { id: userSeq++, username: body?.username || 'user', email: body?.email || '', progress: body?.progress || 0 }
    users.push(row)
    return { status: 201, data: row }
  }
  const crud = path.match(/^\/api\/crud\/users\/(\d+)$/)
  if (crud && m === 'PUT') {
    const id = Number(crud[1])
    const row = users.find((u) => u.id === id)
    if (!row) return { status: 404, data: { error: 'not found' } }
    Object.assign(row, body)
    return { status: 200, data: clone(row) }
  }
  if (crud && m === 'DELETE') {
    users = users.filter((u) => u.id !== Number(crud[1]))
    return { status: 200, data: { ok: true } }
  }
  return { status: 404, data: { error: 'Маршрут не найден в локальном API' } }
}

export function runLocalSql(sql) {
  const q = String(sql || '').trim()
  if (!q) return { error: 'empty' }
  if (/\b(drop|alter)\b/i.test(q)) return { error: 'Этот запрос запрещён в песочнице.' }
  if (/^select\s+\*\s+from\s+users/i.test(q)) return { rows: clone(users) }
  if (/^select\s+\*\s+from\s+lab_items/i.test(q)) return { rows: clone(items) }
  const ins = q.match(/^insert\s+into\s+users\s*\(([^)]+)\)\s*values\s*\(([^)]+)\)/i)
  if (ins) {
    const cols = ins[1].split(',').map((s) => s.trim())
    const vals = ins[2].split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
    const row = { id: userSeq++, username: 'user', email: '', progress: 0 }
    cols.forEach((c, i) => {
      row[c] = /^\d+$/.test(vals[i]) ? Number(vals[i]) : vals[i]
    })
    users.push(row)
    return { ok: true, inserted: row }
  }
  const upd = q.match(/^update\s+users\s+set\s+(\w+)\s*=\s*(.+?)\s+where\s+id\s*=\s*(\d+)/i)
  if (upd) {
    const row = users.find((u) => u.id === Number(upd[3]))
    if (row) row[upd[1]] = upd[2].replace(/^['"]|['"]$/g, '')
    return { ok: true }
  }
  const del = q.match(/^delete\s+from\s+users\s+where\s+id\s*=\s*(\d+)/i)
  if (del) {
    users = users.filter((u) => u.id !== Number(del[1]))
    return { ok: true }
  }
  return { error: 'Песочница понимает SELECT/INSERT/UPDATE/DELETE для таблицы users (без сервера).', hint: 'Попробуй: SELECT * FROM users;' }
}
