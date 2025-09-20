# Custom DemoMM

Full-stack Vite + React + TypeScript app with an Express + Prisma backend.

## Quickstart (Local Dev)

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run seed   # creates admin@example.com / Admin1234!
npm run dev
```

Vite serves on `http://localhost:5173` and proxies API calls to `http://localhost:5174`.

## Backend Overview

- Express with Helmet, CORS, CSRF, and session cookies (SQLite store)
- Prisma (SQLite by default) models: User, Donation, Program, Story, ContactMessage, ImpactStat, PasswordResetToken
- Auth: `GET /api/session`, `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `POST /api/auth/password/request`, `POST /api/auth/password/confirm`
- Content: Programs (`/api/programs`), Stories (`/api/stories`), Impact (`/api/impact`), Contact (`/api/contact`)
- Donations: `/api/donations` (POST), `/api/donations/me`, admin list at `/api/donations`

Admin portal login: `admin@example.com` / `Admin1234!`

## Build for production

```bash
npm run build
npm run preview
```

## Notes
- Tailwind is configured; global styles at `styles/globals.css` imported in `src/main.tsx`.
- If port `5173` is busy, Vite auto-selects another port.
