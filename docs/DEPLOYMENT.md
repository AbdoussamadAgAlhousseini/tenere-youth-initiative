# Deploying to Vercel

The Tenere Youth Initiative site is a Next.js 15 app backed by Supabase
(PostgreSQL). This guide takes you from the current code to a live site.

> The database (Supabase) is already created and seeded. You do **not** need to
> re-run migrations to go live.

---

## 0. Prerequisites

- A **GitHub** account (to host the code).
- A **Vercel** account (free) — sign in with GitHub.
- Your **Supabase** project (already set up).

---

## 1. Push the code to GitHub

The repository is already initialized locally with a first commit. Create an
empty GitHub repo (no README), then:

```bash
git remote add origin https://github.com/<you>/tenere.git
git branch -M main
git push -u origin main
```

> `.env` is git-ignored — your secrets are **not** pushed. You'll set them in
> Vercel instead.

---

## 2. Import the project into Vercel

1. Vercel → **Add New… → Project** → import your GitHub repo.
2. Framework preset: **Next.js** (auto-detected). Leave build & output settings
   default (`next build`). Node.js version: **20 or later**.
3. **Before the first deploy**, add the environment variables (step 4). The
   build queries Supabase to prerender pages, so the DB vars must be present.

---

## 3. Admin login (password-only)

Login is **password-only** — no email, no Google. Set a single env var
`ADMIN_PASSWORD` (below); anyone who enters it at `/fr/sign-in` is signed in as
the seeded admin (`admin@tenereyouth.org`, role ADMIN) and lands on `/fr/tenere`.

To change the password later:

```bash
vercel env rm ADMIN_PASSWORD production --yes
printf '%s' 'YOUR-NEW-PASSWORD' | vercel env add ADMIN_PASSWORD production
vercel --prod   # redeploy so the new value takes effect
```

---

## 4. Environment variables (Vercel → Settings → Environment Variables)

| Variable | Value | Notes |
|---|---|---|
| `DATABASE_URL` | Supabase **transaction pooler** URI (port `6543`) ending in `?pgbouncer=true` | app runtime |
| `DIRECT_URL` | Supabase **session pooler / direct** URI (port `5432`) | migrations |
| `AUTH_SECRET` | output of `openssl rand -base64 32` | **use a fresh strong value** |
| `AUTH_URL` | `https://<your-domain>` | your production URL |
| `ADMIN_PASSWORD` | the admin login password | **keep secret**; change anytime (step 3) |
| `NEXT_PUBLIC_SITE_URL` | `https://<your-domain>` | used by SEO (canonical, sitemap, OG) |
| `CLOUDINARY_*` | _optional_ | only if you use Cloudinary uploads |

> The DB password contains special characters — keep it **percent-encoded** in
> the URLs exactly as in your local `.env` (`$` → `%24`, `&` → `%26`).

Add each variable to **Production** (and Preview if you want preview
deployments to work).

---

## 5. Deploy

Click **Deploy**. Vercel runs `npm install` (which runs `prisma generate` via
the `postinstall` script) then `next build`. First build takes a couple of
minutes.

---

## 6. Post-deploy checklist

- Visit `https://<your-domain>` → should redirect to `/fr`.
- Check `https://<your-domain>/sitemap.xml`, `/robots.txt`, `/feed.xml`.
- Go to `/fr/sign-in`, enter the `ADMIN_PASSWORD`, and you land on `/fr/tenere`
  signed in as admin.
- If you changed the domain after the first deploy, update `AUTH_URL` and
  `NEXT_PUBLIC_SITE_URL`, then redeploy.

---

## Notes

- **Database schema** is already applied to Supabase (via `prisma db push`).
  Future schema changes: edit `prisma/schema.prisma` then `npm run db:push`
  (simple) or adopt `prisma migrate` for versioned migrations.
- **Prisma + pooler**: the app uses the pgBouncer transaction pooler at runtime
  (`?pgbouncer=true` disables prepared statements, required for pgBouncer).
- **Content freshness**: public pages use ISR (`revalidate = 30`) so admin edits
  appear within ~30s; admin lists are `force-dynamic` (always fresh).
- **Re-seeding** (optional, destructive-friendly since it upserts):
  `npm run db:seed` with the production `DATABASE_URL`.
