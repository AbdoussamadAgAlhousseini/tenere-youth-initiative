# Tenere Youth Initiative — Official Website

> _The desert is not empty. No one crosses the Ténéré alone._

A premium, multilingual (FR/EN), accessible website and engagement platform for
**Tenere Youth Initiative (TYI)** — a youth-led organization empowering
pastoralist and nomadic communities.

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · shadcn/ui ·
Framer Motion · Lucide · next-intl · React Hook Form · Zod · Prisma · PostgreSQL ·
NextAuth (Auth.js) · Cloudinary · Vercel.

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env    # then fill in the values

# 3. Run the dev server
npm run dev             # http://localhost:3000
```

The root path redirects to the visitor's negotiated locale (`/fr` or `/en`).

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type-check |
| `npm run format` | Prettier |
| `npm run db:*` | Prisma helpers (generate, push, migrate, seed, studio) — _added in Phase 3_ |

## Project structure

See [`docs/00-PLANNING.md`](docs/00-PLANNING.md) for the full architecture,
folder tree, wireframes, design system, database schema and phased plan.

```
src/
├─ app/[locale]/        # localized routes (marketing, member, admin)
├─ components/          # ui/ layout/ sections/ cards/ forms/
├─ lib/                 # i18n, utils, fonts, (auth, validations…)
├─ config/              # site + navigation config
└─ server/             # db, repositories, services, actions (Phase 3+)
messages/               # fr.json · en.json
```

## Internationalization

- Locales: **French** (default) and **English**, via `next-intl`.
- Explicit locale prefixes (`/fr`, `/en`); the root negotiates via
  `Accept-Language`.
- UI strings live in `messages/{fr,en}.json`.

## Accessibility & performance

Built toward WCAG 2.2 AA (keyboard nav, ARIA, focus rings, reduced-motion
support) and Lighthouse ~100 targets. Security headers are applied globally in
`next.config.ts`.

## Roadmap

Development proceeds in phases (P1 → P9). Current status: **P1 (Scaffolding)
complete** — see the planning doc.
