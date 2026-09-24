# DEVHUB

Интерактивная образовательная платформа. Всё работает в браузере: аккаунты, прогресс, Python, учебный API и SQL — без сервера и без ключей.

## Запуск

```
cd client
npm install
npm run dev
```

Открой http://localhost:5173

Пароли хранятся только как хэш с солью в localStorage. Уроки работают без сервера.

## Выкладка

Фронтенд — Vercel, бэкенд — Railway, база — Neon.

1. На [neon.tech](https://neon.tech) создай проект Postgres и скопируй connection string.
2. На [railway.app](https://railway.app) новый сервис из папки `server`. Start command: `npm start`. Переменные:
   - `DATABASE_URL` — строка Neon
   - `CLIENT_ORIGIN` — адрес сайта на Vercel, например `https://devhub.vercel.app`
3. На [vercel.com](https://vercel.com) импортируй репозиторий. Root Directory: `client`. Framework: Vite.
   Переменная `VITE_API_URL` — адрес Railway, например `https://devhub-api.up.railway.app`.
4. Проверка бэкенда: `https://твой-railway/api/health` должен ответить `{ "ok": true, "db": "neon" }`.
