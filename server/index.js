const express = require('express')
const cors = require('cors')
const { spawn } = require('child_process')
const { Pool } = require('pg')
const initSqlJs = require('sql.js')

const app = express()
const PORT = process.env.PORT || 3001
const origins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

app.use(cors(origins.length ? { origin: origins } : {}))
app.use(express.json({ limit: '1mb' }))

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && !/localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL) ? { rejectUnauthorized: false } : false,
})

let sandbox

async function boot() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is missing. Put the Neon connection string in the Railway variables.')
  }
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      password_hash TEXT,
      salt TEXT,
      created_at BIGINT
    );
    CREATE TABLE IF NOT EXISTS progress (
      user_id TEXT PRIMARY KEY,
      data JSONB
    );
    CREATE TABLE IF NOT EXISTS lab_items (
      id SERIAL PRIMARY KEY,
      name TEXT
    );
    CREATE TABLE IF NOT EXISTS crud_users (
      id SERIAL PRIMARY KEY,
      username TEXT,
      email TEXT,
      progress INTEGER DEFAULT 0
    );
  `)
  const { rows } = await pool.query('SELECT COUNT(*)::int AS c FROM crud_users')
  if (!rows[0].c) {
    await pool.query('INSERT INTO crud_users (username, email, progress) VALUES ($1, $2, $3), ($4, $5, $6)', [
      'ada',
      'ada@devhub.local',
      3,
      'neo',
      'neo@devhub.local',
      1,
    ])
    await pool.query('INSERT INTO lab_items (name) VALUES ($1)', ['coin'])
  }
  const SQL = await initSqlJs()
  sandbox = new SQL.Database()
  sandbox.run(`
    CREATE TABLE crud_users (id INTEGER PRIMARY KEY, username TEXT, email TEXT, progress INTEGER);
    INSERT INTO crud_users VALUES (1, 'ada', 'ada@devhub.local', 3);
    INSERT INTO crud_users VALUES (2, 'neo', 'neo@devhub.local', 1);
  `)
}

function sandboxRows(sql) {
  const stmt = sandbox.prepare(sql)
  const out = []
  while (stmt.step()) out.push(stmt.getAsObject())
  stmt.free()
  return out
}

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true, service: 'devhub-api', db: 'neon' })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
})

app.post('/api/register', async (req, res) => {
  const { id, username, email, passwordHash, salt } = req.body || {}
  if (!id || !username || !email || !passwordHash || !salt) return res.status(400).json({ error: 'fields' })
  try {
    await pool.query(
      'INSERT INTO users (id, username, email, password_hash, salt, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
      [id, username, email, passwordHash, salt, Date.now()],
    )
    res.json({ ok: true })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

app.post('/api/progress/sync', async (req, res) => {
  const { userId, data } = req.body || {}
  if (!userId) return res.status(400).json({ error: 'userId' })
  await pool.query(
    'INSERT INTO progress (user_id, data) VALUES ($1, $2::jsonb) ON CONFLICT (user_id) DO UPDATE SET data = EXCLUDED.data',
    [userId, JSON.stringify(data || {})],
  )
  res.json({ ok: true })
})

app.get('/api/progress/:userId', async (req, res) => {
  const { rows } = await pool.query('SELECT data FROM progress WHERE user_id = $1', [req.params.userId])
  res.json(rows[0] ? rows[0].data : null)
})

app.get('/api/lab/items', async (_req, res) => {
  const { rows } = await pool.query('SELECT id, name FROM lab_items ORDER BY id')
  res.json(rows)
})

app.post('/api/lab/items', async (req, res) => {
  const { rows } = await pool.query('INSERT INTO lab_items (name) VALUES ($1) RETURNING id, name', [req.body?.name || 'item'])
  res.status(201).json(rows[0])
})

app.put('/api/lab/items/:id', async (req, res) => {
  await pool.query('UPDATE lab_items SET name = $1 WHERE id = $2', [req.body?.name || 'item', Number(req.params.id)])
  res.json({ ok: true })
})

app.delete('/api/lab/items/:id', async (req, res) => {
  await pool.query('DELETE FROM lab_items WHERE id = $1', [Number(req.params.id)])
  res.json({ ok: true })
})

app.get('/api/crud/users', async (_req, res) => {
  const { rows } = await pool.query('SELECT id, username, email, progress FROM crud_users ORDER BY id')
  res.json(rows)
})

app.post('/api/crud/users', async (req, res) => {
  const { username, email, progress } = req.body || {}
  const { rows } = await pool.query(
    'INSERT INTO crud_users (username, email, progress) VALUES ($1, $2, $3) RETURNING id, username, email, progress',
    [username || 'user', email || '', progress || 0],
  )
  res.status(201).json(rows[0])
})

app.put('/api/crud/users/:id', async (req, res) => {
  const { username, email, progress } = req.body || {}
  await pool.query('UPDATE crud_users SET username = $1, email = $2, progress = $3 WHERE id = $4', [
    username,
    email,
    progress || 0,
    Number(req.params.id),
  ])
  res.json({ ok: true })
})

app.delete('/api/crud/users/:id', async (req, res) => {
  await pool.query('DELETE FROM crud_users WHERE id = $1', [Number(req.params.id)])
  res.json({ ok: true })
})

app.post('/api/sql', (req, res) => {
  const sql = String(req.body?.sql || '').trim()
  if (!sql) return res.status(400).json({ error: 'empty' })
  const banned = /\b(drop|alter|attach|detach|pragma)\b/i
  if (banned.test(sql)) return res.status(400).json({ error: 'Этот запрос запрещён в песочнице.' })
  try {
    if (/^select/i.test(sql)) return res.json({ rows: sandboxRows(sql) })
    sandbox.run(sql)
    res.json({ ok: true })
  } catch (e) {
    res.status(400).json({ error: e.message, hint: 'Проверь имя таблицы crud_users и синтаксис SQL.' })
  }
})

app.post('/api/python', (req, res) => {
  const code = String(req.body?.code || '')
  const stdin = String(req.body?.stdin || '')
  const bin = process.platform === 'win32' ? 'py' : 'python3'
  const py = spawn(bin, process.platform === 'win32' ? ['-3', '-c', code] : ['-c', code])
  let out = ''
  let err = ''
  const killer = setTimeout(() => py.kill(), 4000)
  py.stdout.on('data', (d) => {
    out += d.toString()
  })
  py.stderr.on('data', (d) => {
    err += d.toString()
  })
  if (stdin) py.stdin.write(stdin)
  py.stdin.end()
  py.on('error', () => {
    clearTimeout(killer)
    if (!res.headersSent) res.json({ unavailable: true, output: '', errors: [] })
  })
  py.on('close', (codeExit) => {
    clearTimeout(killer)
    if (res.headersSent) return
    const errors = err
      ? [err.includes('Indentation') ? 'Проверь отступы: блоки в Python выравнивают пробелами.' : err.slice(0, 400)]
      : []
    res.json({ output: out.trim(), errors, exit: codeExit })
  })
})

boot()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => console.log('DevHub API on ' + PORT))
  })
  .catch((e) => {
    console.error(e.message)
    process.exit(1)
  })
