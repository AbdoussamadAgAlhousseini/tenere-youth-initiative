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
- A **Google Cloud** project for OAuth login (see step 3).

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

## 3. Google OAuth (production login)

The public site works without it, but member/admin **login** needs Google
credentials in production (the dev-login is disabled outside development).

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) →
   **Create Credentials → OAuth client ID → Web application**.
2. **Authorized redirect URIs** (production domain is `www.tenere-youth.org`):
   `https://www.tenere-youth.org/api/auth/callback/google`
   `https://tenere-youth.org/api/auth/callback/google`
   (add `https://<project>.vercel.app/api/auth/callback/google` too if you also
   use the default Vercel domain).
3. Copy the **Client ID** and **Client secret** into the env vars below.

---

## 4. Environment variables (Vercel → Settings → Environment Variables)

| Variable | Value | Notes |
|---|---|---|
| `DATABASE_URL` | Supabase **transaction pooler** URI (port `6543`) ending in `?pgbouncer=true` | app runtime |
| `DIRECT_URL` | Supabase **session pooler / direct** URI (port `5432`) | migrations |
| `AUTH_SECRET` | output of `openssl rand -base64 32` | **use a fresh strong value** |
| `AUTH_URL` | `https://<your-domain>` | your production URL |
| `AUTH_GOOGLE_ID` | Google OAuth client ID | from step 3 |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret | from step 3 |
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
- Sign in via Google, then visit `/fr/admin` (your Google account starts as
  `USER`; promote it to `ADMIN` once — see below).
- If you changed the domain after the first deploy, update `AUTH_URL`,
  `NEXT_PUBLIC_SITE_URL`, and the Google redirect URI, then redeploy.

### Promote your account to ADMIN

The seeded admin is `admin@tenereyouth.org` (no real login). To make **your**
Google account an admin, run once against the production DB (locally, with the
production `DATABASE_URL` in `.env`):

```bash
npx tsx -e "import{PrismaClient}from'@prisma/client';const d=new PrismaClient();d.user.update({where:{email:'YOU@gmail.com'},data:{role:'ADMIN'}}).then(()=>console.log('done')).finally(()=>d.\$disconnect())"
```

Or use Supabase's SQL editor:
`update "User" set role = 'ADMIN' where email = 'YOU@gmail.com';`

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
