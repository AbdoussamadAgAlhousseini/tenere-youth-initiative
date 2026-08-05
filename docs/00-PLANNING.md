# Tenere Youth Initiative (TYI) — Dossier de Planification

> Document de conception validé **avant** génération du code.
> Devise : _« The desert is not empty. No one crosses the Ténéré alone. »_

---

## 0. Décisions de cadrage

| Sujet | Décision |
|---|---|
| **Paiements** | UI/UX de don complète, **traitement stubé** (pas de charge réelle). Modèle `Donation` prêt ; intégration Stripe branchable plus tard. |
| **Authentification** | **Google OAuth** via NextAuth (Auth.js v5). Adapter Prisma. |
| **Livraison** | Validation du plan → scaffolding structure + config → build fonctionnalité par fonctionnalité. |
| **Langues** | Français (défaut) + Anglais, via routing `[locale]`. |
| **Déploiement** | Vercel + PostgreSQL (Neon/Supabase/Vercel Postgres). |

---

## 1. Analyse fonctionnelle

### 1.1 Objectifs produit
Site vitrine + plateforme d'engagement pour une organisation de jeunesse dirigée par des jeunes, au service des communautés pastorales et nomades. Trois piliers :

1. **Informer** — mission, programmes, actualités, ressources, impact chiffré.
2. **Engager** — dons, bénévolat, adhésion, newsletter, événements.
3. **Gérer** — espace membre + back-office d'administration du contenu.

### 1.2 Personas
- **Visiteur / donateur** — découvre la mission, fait un don, s'abonne.
- **Jeune bénéficiaire / futur membre** — cherche programmes, événements, adhère.
- **Bénévole** — postule via formulaire, suit ses candidatures.
- **Partenaire / bailleur** — évalue la crédibilité (impact, rapports, partenaires).
- **Membre connecté** — profil, documents, messages, notifications.
- **Administrateur** — gère tout le contenu et les demandes.

### 1.3 Périmètre fonctionnel (macro)
- Site public multilingue (14+ pages/sections).
- Blog / actualités avec catégories, tags, recherche, RSS.
- Centre de ressources (rapports, guides, publications téléchargeables).
- Événements avec calendrier et inscription.
- Dons (UI), bénévolat, adhésion, contact, newsletter.
- Espace membre (dashboard, profil, documents, messages, notifications).
- Back-office admin (CRUD sur toutes les entités + statistiques).
- SEO complet, accessibilité WCAG 2.2, dark/light mode, perfs Lighthouse ~100.

### 1.4 Exigences non-fonctionnelles
| Domaine | Cible |
|---|---|
| Performance | LCP < 2 s, Lighthouse ≥ 95/100 (perf, SEO, a11y, best practices) |
| Accessibilité | WCAG 2.2 AA — clavier, ARIA, contrastes, alt text |
| SEO | Metadata dynamique, JSON-LD (Schema.org), OG/Twitter, sitemap, robots, RSS |
| Sécurité | CSRF, validation Zod, rate limiting, headers sécurisés, sanitisation, auth robuste |
| i18n | FR/EN, URLs localisées, contenu réel (pas de Lorem Ipsum) |
| Maintenabilité | TypeScript strict, composants documentés, architecture modulaire, tests |

---

## 2. Architecture technique

### 2.1 Stack (imposée par le brief)
`Next.js 15 (App Router)` · `React 19` · `TypeScript` · `Tailwind CSS` · `Framer Motion` · `shadcn/ui` · `Lucide` · `React Hook Form` · `Zod` · `Prisma` · `PostgreSQL` · `NextAuth` · `Cloudinary` · `Vercel`.

### 2.2 Principes d'architecture
- **App Router** avec segment i18n `app/[locale]/…` ; Server Components par défaut, Client Components ciblés (`"use client"`).
- **Couche data** : Prisma dans `src/server/db`, accès via *repositories* + *services* ; jamais de Prisma dans les composants clients.
- **API** : Route Handlers (`app/api/**/route.ts`) REST propre + Server Actions pour les mutations de formulaires. Validation Zod à la frontière.
- **i18n** : `next-intl` (messages FR/EN, formats, routing localisé).
- **Auth** : Auth.js v5 (NextAuth) + Prisma Adapter, Google provider, rôles (`USER`, `MEMBER`, `ADMIN`) sur le modèle `User`.
- **UI** : design system tokens (Tailwind config) → primitives shadcn → composants métier documentés.
- **Contenu** : seed Prisma avec contenu FR/EN réaliste ; images via Cloudinary (fallback local en dev).
- **State** : URL + Server Components d'abord ; `nuqs`/searchParams pour filtres ; React Hook Form pour formulaires.

### 2.3 Sécurité (transversale)
- Headers via `next.config` + middleware (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy).
- Rate limiting sur les routes sensibles (contact, newsletter, auth) — Upstash Ratelimit ou limiteur mémoire en dev.
- Sanitisation des entrées riches, validation Zod partagée client/serveur, protection CSRF sur Server Actions.

---

## 3. Arborescence des dossiers

```
tenere/
├─ docs/
│  ├─ 00-PLANNING.md            (ce document)
│  ├─ DESIGN-SYSTEM.md
│  ├─ DEPLOYMENT.md
│  └─ wireframes/
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.ts
├─ messages/
│  ├─ fr.json
│  └─ en.json
├─ public/
│  ├─ images/  logos/  illustrations/  favicons/
│  └─ robots.txt
├─ src/
│  ├─ app/
│  │  ├─ [locale]/
│  │  │  ├─ (marketing)/
│  │  │  │  ├─ page.tsx                    # Accueil
│  │  │  │  ├─ about/page.tsx              # À propos
│  │  │  │  ├─ programs/page.tsx
│  │  │  │  ├─ programs/[slug]/page.tsx
│  │  │  │  ├─ news/page.tsx               # Actualités/Blog
│  │  │  │  ├─ news/[slug]/page.tsx
│  │  │  │  ├─ resources/page.tsx
│  │  │  │  ├─ events/page.tsx
│  │  │  │  ├─ events/[slug]/page.tsx
│  │  │  │  ├─ gallery/page.tsx
│  │  │  │  ├─ donate/page.tsx
│  │  │  │  ├─ volunteer/page.tsx
│  │  │  │  ├─ membership/page.tsx
│  │  │  │  └─ contact/page.tsx
│  │  │  ├─ (member)/
│  │  │  │  ├─ dashboard/page.tsx
│  │  │  │  ├─ profile/page.tsx
│  │  │  │  ├─ documents/page.tsx
│  │  │  │  ├─ messages/page.tsx
│  │  │  │  └─ notifications/page.tsx
│  │  │  ├─ (admin)/admin/
│  │  │  │  ├─ page.tsx                    # Dashboard + stats
│  │  │  │  ├─ articles/…  events/…  users/…
│  │  │  │  ├─ documents/…  gallery/…  newsletter/…
│  │  │  │  ├─ partners/…  volunteers/…  members/…
│  │  │  ├─ layout.tsx                     # locale + providers
│  │  │  └─ not-found.tsx
│  │  ├─ api/
│  │  │  ├─ auth/[...nextauth]/route.ts
│  │  │  ├─ newsletter/route.ts
│  │  │  ├─ contact/route.ts
│  │  │  ├─ donations/route.ts             # stub
│  │  │  ├─ volunteers/route.ts
│  │  │  ├─ search/route.ts
│  │  │  └─ … (REST par ressource)
│  │  ├─ sitemap.ts
│  │  ├─ robots.ts
│  │  ├─ feed.xml/route.ts                 # RSS
│  │  └─ globals.css
│  ├─ components/
│  │  ├─ ui/            # primitives shadcn
│  │  ├─ layout/        # Navbar, Footer, LocaleSwitcher, ThemeToggle
│  │  ├─ sections/      # Hero, Stats, Programs, Testimonials, CTA, Newsletter…
│  │  ├─ cards/         # ProgramCard, BlogCard, OpportunityCard, PartnerSlider…
│  │  └─ forms/         # DonationWidget, VolunteerForm, ContactForm, NewsletterForm
│  ├─ server/
│  │  ├─ db.ts          # Prisma client singleton
│  │  ├─ repositories/  # accès data typé
│  │  ├─ services/      # logique métier
│  │  └─ actions/       # Server Actions
│  ├─ lib/
│  │  ├─ auth.ts        # config Auth.js
│  │  ├─ validations/   # schémas Zod partagés
│  │  ├─ seo.ts         # helpers metadata + JSON-LD
│  │  ├─ i18n/          # config next-intl, routing
│  │  ├─ rate-limit.ts
│  │  └─ utils.ts
│  ├─ hooks/
│  ├─ types/
│  ├─ config/           # site config, navigation, constantes
│  └─ styles/
├─ tests/               # unit (Vitest) + e2e (Playwright)
├─ .env.example
├─ next.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
├─ middleware.ts        # i18n + auth + security headers
└─ README.md
```

---

## 4. Wireframes textuels (par page)

### 4.1 Accueil
```
[ Navbar : Logo · Menu · Recherche · Langue · Thème · CTA "Faire un don" ]
[ HERO plein écran : image/vidéo désert immersive, titre mission, devise, 2 CTA ]
[ MISSION & VISION : deux colonnes, illustration SVG ]
[ NOS IMPACTS : bandeau de chiffres clés animés (compteurs) ]
[ PROGRAMMES : grille de ProgramCards (icône, titre, extrait) ]
[ ACTUALITÉS : 3 BlogCards récentes + lien "Voir tout" ]
[ TÉMOIGNAGES : slider/quote avec portrait ]
[ PARTENAIRES : logo slider en marquee ]
[ APPEL À L'ACTION : bannière "Rejoignez le mouvement" ]
[ NEWSLETTER : champ email + consentement ]
[ Footer : plan du site, réseaux, mentions, langue ]
```

### 4.2 À propos
`Hero titre` → `Notre histoire (timeline)` → `Vision` → `Mission` → `Valeurs (grille)` → `Équipe (optionnel)` → `CTA`.

### 4.3 Programmes (liste + détail)
- **Liste** : intro + filtres par thématique + grille ProgramCards.
- **Détail `[slug]`** : hero programme, objectifs, activités, impact chiffré, galerie, événements liés, CTA (bénévolat/don).

### 4.4 Actualités / Blog
- **Liste** : recherche + filtres (catégories, tags) + pagination + grille BlogCards.
- **Détail** : couverture, meta (auteur/date/temps de lecture), corps, partage social, articles liés.

### 4.5 Ressources
Filtres par type (rapport, guide, boîte à outils, publication) → liste téléchargeable (titre, description, format, taille, bouton download + export PDF).

### 4.6 Événements
Vue calendrier + liste ; détail événement (date, lieu, description, formulaire d'inscription, type : webinaire/forum/conférence).

### 4.7 Galerie
Grille masonry photos/vidéos, lightbox, filtres par album/programme.

### 4.8 Faire un don
`Widget don` : montants prédéfinis + montant personnalisé, périodicité, bloc « Votre impact », formulaire donateur, récap → confirmation (stub, pas de charge réelle).

### 4.9 Bénévolat
Intro + domaines d'expertise (multi-select) + disponibilités + formulaire RHF/Zod → confirmation.

### 4.10 Adhésion
Avantages, niveaux de cotisation, formulaire d'inscription (auth Google).

### 4.11 Contact
Formulaire (Zod + rate limit + anti-spam) + FAQ (accordion) + réseaux + carte.

### 4.12 Espace membre
Sidebar : Dashboard (résumé) · Profil · Documents · Messages · Notifications.

### 4.13 Administration
Sidebar : Dashboard (stats/graphes) · Articles · Événements · Utilisateurs · Documents · Galerie · Newsletter · Partenaires · Demandes de bénévolat · Membres. Tables avec recherche, tri, pagination, CRUD.

---

## 5. Design System (résumé — détail dans `docs/DESIGN-SYSTEM.md`)

### 5.1 Palette (thème « Sahara premium »)
| Rôle | Nom | Hex (light) |
|---|---|---|
| Sable / fond chaud | `sand` | `#F4EBDD` |
| Terre / accent chaud | `terra` | `#B5651D` |
| Vert oasis (primaire) | `oasis` | `#2E7D5B` |
| Bleu ciel/eau | `sky` | `#2B6CB0` |
| Neutres | `stone/ink` | `#1C1917 → #FAFAF9` |

Dark mode : fonds `stone-950/900`, accents désaturés, contrastes AA garantis.

### 5.2 Typographie
- **Titres** : serif élégante (ex. _Fraunces_ / _Playfair_) — caractère, chaleur.
- **Corps** : sans-serif lisible (ex. _Inter_) — neutralité, perf.
- Échelle typographique fluide (`clamp`) + rythme vertical cohérent.

### 5.3 Fondations
Espacements (échelle 4px), rayons (`sm→2xl`), ombres subtiles, motion tokens (durées/easings Framer Motion), iconographie Lucide, illustrations SVG désert.

### 5.4 Composants (réutilisables, documentés)
Buttons · Cards · Sections · Timeline · Hero · Navbar · Footer · Gallery · Modal · Accordion · Testimonials · Statistics · Map · BlogCard · OpportunityCard · ProgramCard · PartnerSlider · Newsletter · FAQ · DonationWidget · VolunteerForm.

---

## 6. Schéma de base de données (Prisma — vue d'ensemble)

Entités et relations clés (schéma complet livré dans `prisma/schema.prisma`) :

```
User (id, name, email, image, role[USER|MEMBER|ADMIN], accounts, sessions)
 └─< Member (profil étendu, cotisation, statut)
 └─< Volunteer (domaines, disponibilités, statut demande)
 └─< Message, Notification, Document

Program (slug, i18n title/desc, theme, impact) ─< Project ─< (Event, Gallery)
Article (slug, i18n, body, coverImage, status) >─ Category, >—< Tag, — author:User
Event (slug, date, location, type, i18n) ─< Registration
Partner (name, logo, url, tier)
Resource (title, type[REPORT|GUIDE|TOOLKIT|PUBLICATION], fileUrl, i18n)
Gallery (album, media[], type)
Newsletter (email, confirmed, locale)
Donation (amount, currency, frequency, donor, status[STUB])
Testimonial (author, role, quote, avatar, i18n)
Country / Language / Setting (config i18n & site)
```

Champs i18n : approche par colonnes suffixées (`titleFr/titleEn`) **ou** table de traductions — choix arrêté au scaffolding (recommandation : colonnes suffixées pour la simplicité + `next-intl` côté UI statique).

---

## 7. User Flow

```
Visiteur ─▶ Accueil ─▶ Programmes/Actualités/Ressources
                 │
                 ├─▶ Faire un don ─▶ Widget ─▶ Récap ─▶ Confirmation (stub)
                 ├─▶ Bénévolat ─▶ Formulaire ─▶ Confirmation ─▶ (admin traite)
                 ├─▶ Newsletter ─▶ Double opt-in
                 └─▶ Adhésion / Connexion ─▶ Google OAuth
                                                    │
                                          Rôle ? ───┼─ MEMBER ─▶ Espace membre
                                                    └─ ADMIN  ─▶ Back-office
```

---

## 8. Plan de développement par phases

| Phase | Contenu | Livrable |
|---|---|---|
| **P0 — Planification** | Ce document + design system + wireframes | ✅ (en cours de validation) |
| **P1 — Scaffolding** | Init Next.js 15/TS, Tailwind, shadcn, i18n, ESLint/Prettier, structure dossiers, env, middleware sécurité | Projet qui démarre, page d'accueil vide stylée |
| **P2 — Design system** | Tokens Tailwind, thème clair/sombre, typographies, primitives UI, Navbar/Footer, LocaleSwitcher, ThemeToggle | Composants de base + storybook léger (docs) |
| **P3 — Data & Auth** | Prisma schema, migrations, seed FR/EN, Auth.js Google, rôles, repositories/services | DB + login fonctionnels |
| **P4 — Pages publiques** | Accueil, À propos, Programmes (+détail), Actualités (+détail), Ressources, Événements, Galerie, Contact | Site vitrine navigable |
| **P5 — Engagement** | Don (UI/stub), Bénévolat, Adhésion, Newsletter, formulaires Zod + rate limit | Parcours d'engagement complets |
| **P6 — Espaces protégés** | Espace membre + back-office admin (CRUD + stats) | Gestion de contenu |
| **P7 — SEO/Perf/A11y** | Metadata, JSON-LD, OG, sitemap, robots, RSS, audit Lighthouse, WCAG 2.2 | Scores cibles atteints |
| **P8 — Tests & Docs** | Vitest + Playwright, README, guides install/déploiement, .env.example | Projet livrable |
| **P9 — Déploiement** | Vercel + Postgres, variables d'env, vérifs prod | Site en ligne |

---

## 9. Ce dont j'aurai besoin de toi en cours de route
- Logo(s) et éventuelles photos réelles (sinon j'utilise des placeholders + illustrations SVG).
- Coordonnées réelles (email, réseaux sociaux, pays d'intervention) — sinon contenu réaliste générique.
- Comptes de services (Cloudinary, base Postgres, Google OAuth) au moment du déploiement — je fournirai la marche à suivre.

---

_Prochaine étape : sur validation de ce plan → **Phase 1 (Scaffolding)**._
