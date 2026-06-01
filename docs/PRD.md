# IMC Motor — Website Rebuild · Product Requirements Document (PRD)

| | |
|---|---|
| **Product** | imcmotor.hu — new e-commerce front end |
| **Owner** | Levente Nagy (for IMC Motor / Importőr Motorcenter Kft.) |
| **Author** | Claude Code |
| **Status** | 🟡 Draft v0.2 — brand decisions confirmed; awaiting build go-ahead |
| **Date** | 2026-06-01 |
| **Source brief** | [`imcmotor-website-overview.md`](../imcmotor-website-overview.md) |
| **Design system** | [`design-system.md`](./design-system.md) |
| **Brand voice** | [`brand-voice.md`](./brand-voice.md) |

> This PRD turns the confirmed brief (overview §8) plus the chosen tech/design
> direction into a buildable specification. It is the contract for what we build,
> in what order. **No app code is written until this is approved.**

---

## Table of contents
1. Summary
2. Background & problem
3. Goals & non-goals
4. Success criteria / Definition of Done
5. Users & personas
6. Scope (in / out)
7. Information architecture & sitemap
8. Page requirements
9. Feature requirements (cart, booking, filters…)
10. Design direction (summary → see design-system.md)
11. Content, localization & SEO
12. Technical architecture
13. Data model (Shopify-aligned)
14. Deployment (GitHub Pages)
15. Phased delivery plan
16. Open questions / alignment items
17. Appendix — Shopify migration map

---

## 1. Summary

Build a **new, modern, Hungarian-language e-commerce front end** for IMC Motor —
a 30+ year Italian-motorcycle specialist (Vespa, Aprilia, Moto Guzzi, Piaggio)
in Dunakeszi. **Front-end only, no backend**, with realistic **mock data**.
The structure is deliberately **Shopify-oriented** so a later migration to
Shopify is clean. Visual direction is **premium editorial minimalism**. Built
with **Vite + React + TypeScript + Tailwind**, deployed as a static site on
**GitHub Pages**. It includes the **full commerce journey** (collections →
product → cart → checkout) and an **upgraded scheduled-booking UI** for service
and rentals. It is also a **reusable template** the team can extend over time.

---

## 2. Background & problem

The current site runs on **UNAS** (a templated Hungarian webshop SaaS). It's
visually constrained, image-heavy via `space.gif` placeholders (hurts
LCP/SEO/a11y), has inconsistent URL conventions, placeholder social links, and
promos hardcoded into page copy. The business has decided to **break cleanly from
UNAS** and rebuild the front end, targeting an **eventual Shopify** store. See
overview §2, §7, §8 for full detail.

**This project** delivers the new front end + a maintainable foundation, ahead of
the commerce backend (Shopify) and real product data, both of which come later.

---

## 3. Goals & non-goals

### Goals
- G1. A genuinely **great-looking**, fast, responsive, accessible HU site.
- G2. **Complete commerce UX** end-to-end as front-end screens (mocked).
- G3. **Upgraded scheduled booking** for service & rental/test rides (mocked).
- G4. **Editable content** — products/copy/promos live in data files a
  non-developer can safely edit; no copy buried in components.
- G5. **Shopify-shaped** data & page structure for a clean future migration.
- G6. **Deployable on GitHub Pages** from a simple `git push`.
- G7. A **documented template** (this `docs/` set + `CLAUDE.md` router +
  per-folder READMEs) that's easy to navigate and extend.

### Non-goals (now)
- N1. No backend, server, database, or API.
- N2. No real checkout/payments, order persistence, or auth.
- N3. No booking engine / real availability logic.
- N4. No real product/inventory integration (data arrives later).
- N5. No English/i18n at launch (HU only; structure stays i18n-friendly if cheap).
- N6. No carry-over of UNAS, hasznaltauto.hu feed, or the current newsletter.

---

## 4. Success criteria / Definition of Done

A milestone is "done" when:
- ✅ Builds clean (`npm run build`) and runs (`npm run dev`) with no errors.
- ✅ Deploys to GitHub Pages and all routes work (incl. deep links / refresh).
- ✅ Responsive with **no horizontal scroll** at 375 / 768 / 1024 / 1440px.
- ✅ Meets the [a11y checklist](./design-system.md#9-accessibility-checklist-gate-for-every-page) (AA contrast, focus, keyboard, alt text, reduced-motion).
- ✅ Hungarian copy throughout; `ő/ű` render correctly in both fonts.
- ✅ All product/content comes from `src/data/*` (no hardcoded copy in pages).
- ✅ Cart + booking flows complete as UI with mock submit + clear "request only".
- ✅ Lighthouse (mobile) target: **Performance ≥ 90, A11y ≥ 95, Best-Practices ≥ 95, SEO ≥ 95** on the home page.

---

## 5. Users & personas

| Persona | Who | Primary need | Key journeys |
|---|---|---|---|
| **Lívia — lifestyle commuter** | Urban 20–40, wants a Vespa/Piaggio scooter | Browse stylish scooters, see price, ask/visit | Home → Vespa collection → product → contact/quote |
| **Tamás — sport rider** | 25–50, eyeing an Aprilia/Moto Guzzi | Specs, variants, test ride | Collection → product → **book test ride** |
| **Gábor — owner needing service** | Existing rider | Book maintenance / műszaki vizsga, see prices | Service → price list → **scheduled booking** |
| **Réka — gear shopper** | Any | Helmets, gloves, accessories | Accessories → product → **cart → checkout** |
| **Béla — used-bike hunter** | Budget-aware | Browse used inventory | Used motorcycles → product → contact |

The site must serve **browse-to-visit** (high-ticket bikes → lead/booking) and
**buy-online** (accessories → cart/checkout) equally well.

---

## 6. Scope

### In scope (front-end, mocked)
- Full catalog: brand collections, category collections, used, clearance, new,
  B125, accessories.
- Product detail with variants (color/size), gallery, specs, add-to-cart.
- Cart (drawer + page), client-side state, persisted to `localStorage`.
- Multi-step **checkout UI** (info → shipping → payment → review → confirmation),
  mocked submit.
- **Scheduled booking UI** for service and rental/test (date + time-slot picker,
  multi-step), mocked submit.
- Service page with editable **price list**.
- Account screens as UI: login, register, profile/orders, favorites/wishlist.
- Content pages: contact (real map + hours), news list/article, financing,
  extended warranty, motorhotel, about.
- Legal/info pages: ÁSZF, adatkezelés, fizetés, szállítás (placeholder copy,
  clearly marked).
- Newsletter signup (mock), announcement bar, cookie-consent banner (UI only).
- SEO metadata per page, sitemap-ready routes, redirect plan from old URLs.

### Out of scope — see Non-goals §3.

---

## 7. Information architecture & sitemap

Routes normalized to lowercase, hyphenated, Hungarian (fixing the old site's
mixed-case mess; old→new redirect map kept for SEO — see §11).

```
/                         Home
/ujdonsagok               New arrivals (2026 models)
/kiarusitas               Clearance / sale
/b125                     A1-license 125 category
/vespa                    Brand collection
/aprilia                  Brand collection
/moto-guzzi               Brand collection
/piaggio                  Brand collection
/kiegeszitok              Accessories collection
/hasznalt-motorok         Used motorcycles
/berles                   Rental / test bikes (+ booking)
/termek/:handle           Product detail (PDP)
/kosar                    Cart
/penztar                  Checkout (multi-step)
/szerviz                  Service (info + price list)
/szerviz/foglalas         Service booking (scheduled)
/kapcsolat                Contact (map, hours, form)
/hirek                    News list
/hirek/:slug              News article
/finanszirozas           Financing
/garancia                 Extended warranty
/motorhotel               Seasonal storage
/fiok                     Account hub
/fiok/belepes             Login
/fiok/regisztracio        Register
/fiok/rendelesek          Orders / tracking
/fiok/kedvencek           Favorites / wishlist
/info/aszf                Terms (ÁSZF)
/info/adatkezeles         Privacy policy
/info/fizetes             Payment info
/info/szallitas           Shipping info
*                         404 (HU)
```

**Global nav (header):** brands mega-menu (Vespa/Aprilia/Moto Guzzi/Piaggio with
model lists), Újdonságok, Kiárusítás, B125, Kiegészítők, Használt, Bérlés,
Szerviz, Hírek, Kapcsolat. Utility: search (later), favorites, account, cart.
**Footer:** company block, social (real links TBD), customer-account links,
info/legal links, secondary nav. (Mirrors overview §3–5.)

---

## 8. Page requirements

Priority key: **P0** = build in showcase milestone, **P1** = full-commerce
milestone, **P2** = later. (Maps to §15 phases.)

### Home `/` — **P0**
Editorial landing. Sections (data-driven from `data/home.ts`):
1. **Hero** — full-bleed image, short Bodoni headline, tagline, primary CTA
   (browse) + secondary (book test ride). Staggered load reveal.
2. **Brand row** — 4 brand cards (Vespa/Aprilia/Moto Guzzi/Piaggio) → collections.
3. **Featured models** — "Kiemelt ajánlataink" product cards (from featured flag).
4. **Newest / 2026** teaser → `/ujdonsagok`.
5. **Service & booking** band — value prop + "Időpontot foglalok" CTA.
6. **Used + Rental** split feature.
7. **News** teaser (3 cards).
8. **Newsletter** signup (mock) + trust strip (30+ év, 4 márka, szerviz).
Acceptance: LCP image optimized; all CTAs work; reveals respect reduced-motion.

### Collection `/vespa`, `/aprilia`, … `/kiegeszitok`, `/hasznalt-motorok`, `/ujdonsagok`, `/kiarusitas`, `/b125` — **P0 (template), P1 (all wired)**
One reusable, data-driven template:
- Collection hero (title + short editorial intro + image).
- **Toolbar:** result count, sort (ár ↑/↓, újdonság), view density.
- **Filters:** brand (where mixed), category/típus, ár range, kivitel/szín,
  raktárkészlet. Filter state in URL query params. Mobile = filter drawer.
- **Product grid** (responsive 2→3→4 cols) of `ProductCard`.
- Empty/edge state; pagination or "load more".
Acceptance: filtering/sorting work client-side on mock data; deep-linkable.

### Product detail `/termek/:handle` — **P0**
- Breadcrumbs; **Gallery** (thumbs + main, 4:5).
- Title (Bodoni), brand, short hook, **Price** (+ compare-at if on sale).
- **VariantSelector** (color/size) → updates price/stock/image.
- `QuantityStepper` + **AddToCart** (opens cart drawer) + favorite toggle.
- Secondary CTAs by type: bikes → "Próbamotort foglalok" / "Ajánlatot kérek";
  accessories → cart-first.
- **Specs accordion** (kategória, motor, teljesítmény, szín, stb.).
- Trust/finance/warranty mini-band; related products.
Acceptance: variant logic correct; add-to-cart updates badge + drawer.

### Cart `/kosar` + `CartDrawer` — **P0**
- Line items (image, title, variant, qty stepper, line price, remove).
- Order summary (subtotal, est. shipping note, total). Promo field (UI only).
- Empty state. Persist to `localStorage`. CTA → `/penztar`.

### Checkout `/penztar` — **P1**
Multi-step `Stepper`, mocked, **clearly non-transactional**:
1. Kapcsolat (email/phone) → 2. Szállítás (address/method) →
3. Fizetés (method UI, **no real processing**) → 4. Áttekintés →
5. Visszaigazolás (mock order number + "ez egy demó, nincs valódi fizetés").
- Validation + inline errors; order summary sticky; guest by default.

### Service `/szerviz` — **P0/P1**
- Intro (brands serviced incl. other Italian/international).
- **Editable promo band** (e.g. spring −10% parts) from data, with valid-until
  date — not hardcoded in JSX.
- **PriceList** component from `data/services.ts` (hourly tiers, diagnostics,
  műszaki/eredet/okmány admin — all `+ ÁFA`).
- "Repairs only after approval" note. CTA → `/szerviz/foglalas`, plus call/email.

### Service booking `/szerviz/foglalas` — **P1 (flagship)**
Upgraded scheduled-booking flow (mock, no availability engine):
1. **Szolgáltatás** (service type: szerviz / műszaki / diagnosztika / gumi…).
2. **Motor** (brand/model/displacement → drives price tier; chassis/VIN optional).
3. **Időpont** — `DatePicker` (calendar) + `SlotPicker` (mock slots, respecting
   shop hours: H–P 9–18, Szo 9–13, V zárva).
4. **Adatok** (name, phone, email, note).
5. **Áttekintés → Visszaigazolás** (request recorded; staff confirms).
Acceptance: full keyboard-operable; clear "request, not confirmed" messaging.

### Rental / test `/berles` — **P1**
Fleet grid + the same scheduled-booking flow adapted (pick bike → date/slot →
details). Mock fleet data.

### Contact `/kapcsolat` — **P0**
Address, phone, both emails, **real Google Map embed** (Dunakeszi, Kikerics köz
4.), opening hours, about copy (30+ év), contact form (mock).

### News `/hirek` + `/hirek/:slug` — **P1**
List of `NewsCard` from `data/news.ts`; article template (editorial typography).

### Financing / Warranty / Motorhotel — **P2**
Content pages from data; consistent layout; CTA to contact/booking.

### Account: hub / login / register / orders / favorites — **P2**
UI-only screens (forms, mock order list, wishlist from `localStorage`). No auth.

### Legal/info: ÁSZF / adatkezelés / fizetés / szállítás — **P2**
Long-form templates with **placeholder copy clearly marked** "minta szöveg —
jogi ellenőrzés szükséges".

### Global: Header, Footer, AnnouncementBar, CookieConsent, 404 — **P0**

---

## 9. Feature requirements

### 9.1 Cart (client-side)
- React context + `useReducer`; persisted to `localStorage` (`imc.cart.v1`).
- Add/update/remove/clear; quantity; derived totals; line + cart counts.
- Cross-page persistence; drawer + full page share state.
- Mock currency formatting (HUF). No tax/shipping calc beyond display notes.

### 9.2 Scheduled booking (mock)
- Reusable multi-step engine used by service + rental.
- Calendar disables Sundays + past dates; slots generated from shop hours config.
- No real availability; on submit, store request in `localStorage` + show
  confirmation with a generated reference; copy states staff will confirm.

### 9.3 Collection filtering/sorting
- Pure client-side over mock data; state synced to URL query params (shareable).
- Sort: price asc/desc, newest, name. Filters: brand, type, price range, options,
  availability.

### 9.4 Product variants
- Option model (e.g. Szín, Méret) → variant matrix; selecting options resolves
  the active variant (price, compareAt, availability, image).

### 9.5 Favorites/wishlist
- `localStorage` toggle; favorites page lists saved products. No account needed.

### 9.6 Newsletter + cookie consent + announcement bar
- Newsletter: validated form, mock success. Cookie banner: UI + `localStorage`
  acceptance (4 categories per old site), no real tag-loading. Announcement bar:
  dismissible, content from data.

---

## 10. Design direction (summary)

Full spec in **[design-system.md](./design-system.md)**. Essentials:
- **Style:** premium editorial minimalism (intentionally *not* the skill's
  Liquid-Glass auto-pick — see design-system §1).
- **Palette:** warm stone neutrals (`#FAF8F5` paper, `#17130F` ink) + **one
  accent** — ✅ **Rosso `#C81D25`** (confirmed).
- **Type:** **Bodoni Moda** (display) + **Jost** (body/UI), `latin-ext` for HU.
- **Layout:** 12-col, `max-w-1320`, asymmetric editorial, generous whitespace,
  1px hairlines, crisp small radii, flat (shadows only for overlays).
- **Motion:** calm staggered reveals; 150–300ms micro; reduced-motion honored.
- **Imagery:** disciplined `<Placeholder>` system until real assets land (§ds-8).

---

## 11. Content, localization & SEO

- **Language:** Hungarian only. Copy lives in `src/data/*` + a small UI-strings
  module; components stay copy-free.
- **Voice:** per [brand-voice.md](./brand-voice.md).
- **SEO per page:** title, meta description, canonical, Open Graph (reuse
  `og:site_name: IMC Motor Dunakeszi`), `robots: index,follow`. Implemented via a
  lightweight `<Seo>` head manager (e.g. `react-helmet-async`).
- **Keywords** (from overview §6): brand names + robogó, motorszerviz,
  gumiszerelés, műszaki vizsga, Dunakeszi, Budapest, Pest vármegye.
- **Redirects:** maintain an **old→new URL map** (e.g. `/KIARUSITAS` →
  `/kiarusitas`, `/vespa/gts/gts-125` → `/termek/vespa-gts-125`) as data, to be
  applied at the hosting/Shopify layer later. Document, don't enforce now.
- **Structured data (later):** Product/Org schema.org JSON-LD when real data lands.

---

## 12. Technical architecture

- **Stack:** Vite + React 19 + TypeScript + Tailwind v4 (`@tailwindcss/vite`),
  React Router v7, Motion (animation), react-helmet-async (SEO).
- **State:** local component state + a Cart context (localStorage). No global
  store library needed at this size.
- **Styling:** Tailwind + CSS custom properties for design tokens (mirrors
  design-system.md). Theme/accent swappable via one tokens file.
- **Content as data:** typed mock data in `src/data/*`, shapes in
  `src/data/types.ts` aligned to Shopify (see §13). Swapping to real/Shopify
  data = replacing the data layer, not the components.
- **Quality:** ESLint + Prettier + TypeScript strict; small, typed components.

### Proposed folder structure (target — built in Phase 0/1)
```
IMC MOTOR WEBSITE/
├─ CLAUDE.md                 # routing index (where things are / how to navigate)
├─ README.md                 # human quickstart (run / build / deploy)
├─ imcmotor-website-overview.md
├─ docs/                     # PRD + design + voice (this folder)
│  ├─ README.md  PRD.md  design-system.md  brand-voice.md
│  ├─ shopify-mapping.md     # (added in build) data→Shopify map
│  └─ content-editing.md     # (added in build) non-dev editing guide
├─ .github/workflows/deploy.yml
├─ public/                   # 404.html (SPA fallback), favicon, robots.txt
├─ index.html
├─ src/
│  ├─ README.md              # what's in src + routing map
│  ├─ main.tsx  App.tsx  index.css
│  ├─ routes/      README.md + one file per page (§8)
│  ├─ components/  README.md + layout/ ui/ commerce/ content/ forms/
│  ├─ data/        README.md + types.ts products.ts collections.ts
│  │               navigation.ts services.ts news.ts site.ts home.ts
│  ├─ lib/         README.md + cart.tsx booking.ts format.ts seo.tsx
│  └─ assets/      placeholders, interim logotype
├─ package.json  vite.config.ts  tailwind/postcss  tsconfig*.json
```
Every folder gets a short `README.md` (purpose + the relevant brand-voice/design
note), and `CLAUDE.md` at root is the single routing index. (Matches the client's
"one claude.md + small sub-markdown files" requirement.)

---

## 13. Data model (Shopify-aligned)

Mock data uses Shopify-shaped objects so migration is mechanical.

```ts
// Product  (→ Shopify Product)
{ id, handle, title, vendor /*brand*/, productType, tags[],
  descriptionHtml, featured, status: 'active'|'draft',
  images: [{ src, alt, ratio }],
  options: [{ name /*Szín*/, values[] }],
  variants: [Variant],
  priceRange: { min, max, currencyCode: 'HUF' },
  collections: [handle] }

// Variant  (→ Shopify ProductVariant)
{ id, title, sku, price, compareAtPrice?, availableForSale,
  selectedOptions: [{ name, value }], image? }

// Collection  (→ Shopify Collection)
{ id, handle, title, descriptionHtml, image, productHandles[] | rule }
```
Non-Shopify content (custom apps/metafields later): `services` (price list +
promo), `bookingConfig` (hours, slot length), `newsPosts`, `navigation`,
`siteSettings` (company info, hours, contacts), `redirects`.

**Mapping:** brand → `vendor`; category → `productType`/`tags`; used bikes →
products tagged `hasznalt`; accessories → `productType`. Full map in
`docs/shopify-mapping.md` (added during build).

---

## 14. Deployment (GitHub Pages)

- Static build (`vite build` → `dist/`) published via **GitHub Actions Pages**
  deploy (`actions/deploy-pages`), so the repo source isn't served directly.
- **SPA routing:** include `public/404.html` fallback (copies `index.html`) so
  deep links/refresh work on Pages; router `basename = import.meta.env.BASE_URL`.
- **Base path:** `vite.config` reads `BASE_PATH` (workflow sets it to
  `/<repo>/` for project pages). For a custom domain (`imcmotor.hu`) base = `/`
  + `public/CNAME`.
- ✅ **Confirmed:** the website gets its **own new GitHub repo** (not the
  `hermes-marketing-team` workspace repo, which holds many unrelated/private
  projects and is unsuitable to publish from).

---

## 15. Phased delivery plan

> "The full build doesn't have to happen today; start a template." (client)

| Phase | Name | Deliverable |
|---|---|---|
| **0** | **Scaffold + system** | Vite/React/TS/Tailwind project, design tokens, base components, layout (Header/Footer/AnnouncementBar), routing skeleton with all routes (stubs), mock-data shapes, GH Pages deploy working. _The template._ |
| **1** | **Showcase pages (P0)** | Home, Collection template (1 brand wired), Product detail, Cart + drawer, Contact, Service (with price list). A clickable, great-looking slice. |
| **2** | **Full commerce (P1)** | All collections wired, Checkout flow, Service & Rental scheduled-booking flows, News, favorites, newsletter. |
| **3** | **Content + polish (P2)** | Account screens, financing/warranty/motorhotel, legal/info pages, SEO/redirects map, perf/a11y pass, Lighthouse targets. |
| **4** | **Shopify migration** | (Future, separate) map data → Shopify, wire real commerce, real assets/data. |

Each phase ends meeting the relevant Definition of Done (§4). Phase 0 + part of
Phase 1 is the realistic "today/first build" target.

---

## 16. Open questions / alignment items

### ✅ Resolved (2026-06-01)
1. **Repo / hosting** — the site gets its **own new GitHub repo** (clean Pages
   deploy), separate from `hermes-marketing-team`.
2. **Accent color** — **Rosso `#C81D25`** (Italian red).
3. **Typography** — **Bodoni Moda + Jost**.
4. **Address form** — informal **"te"** throughout.

### 🟡 Still open (defaults in **bold** are my recommendation)
5. **First build target** — **Phase 0 + Phase 1 showcase** (scaffold + Home +
   Collection + PDP + Cart + Contact + Service) as the first deliverable — agree?
6. **Domain plan** — will it eventually serve at `imcmotor.hu`? (Affects base path
   + CNAME; doesn't block now.)
7. **Real assets timeline** — any chance of logo/photos before build, or
   **placeholders throughout** (current assumption)?
8. **Used bikes & rental fleet** — **invent representative mock listings** for now? (assumed yes.)

---

## 17. Appendix — Shopify migration map (preview)

| Front-end concept | Shopify concept |
|---|---|
| `data/products.ts` item | Product |
| variant (option matrix) | ProductVariant + options |
| `data/collections.ts` | Collection (manual/automated) |
| brand (`vendor`) | Product vendor / collection |
| category (`productType`) | Product type / tag |
| cart context | Shopify cart / Storefront API |
| checkout flow | Shopify Checkout |
| service price list / promo | Metafields / page / app |
| booking flow | Booking app (e.g. Sesami) or custom app |
| news posts | Shopify Blog (Online Store) |
| account screens | Customer accounts |
| redirects map | Shopify URL redirects |

Detailed field-by-field mapping → `docs/shopify-mapping.md` (build phase).
