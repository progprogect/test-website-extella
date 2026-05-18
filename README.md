# Лендинг вебинара (тест)

Простой одностраничник с формой регистрации на вебинар про ИИ: заявки уходят через **Next.js API Route** и сохраняются в **PostgreSQL** через **Prisma**.

Пиксель Meta в проект **не** включён — можно будет добавить после деплоя.

## Локальный запуск

1. Создайте БД Postgres (локально или в облаке) и скопируйте строку подключения в файл `.env` (ориентир — `.env.example`).

2. Установите зависимости и примените миграции:

```bash
cp .env.example .env   # затем впишите реальный DATABASE_URL
npm install
npx prisma migrate deploy
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Railway

1. Создайте проект на [Railway](https://railway.app), добавьте сервис **PostgreSQL**.
2. Подключите репозиторий как веб-сервис. В переменные окружения сервиса приложения добавьте `DATABASE_URL` — строку подключения к Postgres (Railway может подставить её из плагина БД через **Variable Reference**).
3. Укажите **Start Command**:

```bash
npm run start:railway
```

Команда применит миграции (`prisma migrate deploy`) и запустит `next start`.

Сборка по умолчанию: `npm run build` (в ней уже есть `prisma generate`).

## API

- `POST /api/leads` — тело JSON: `{ "name", "email", "phone?", "company?" }`.

## Стек

Next.js (App Router), TypeScript, Tailwind CSS, Prisma, PostgreSQL.
