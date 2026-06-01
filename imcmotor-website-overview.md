# IMC Motor — Website Structure & Build Reference

> Context document for Claude Code. Purpose: understand the existing website (imcmotor.hu) before producing a design plan and building a replacement. Sections 1–6 describe **what exists today**. Section 8 captures the **confirmed direction** for the rebuild.

> **Project direction at a glance:** Front-end redesign and build of a new e-commerce store, designed for an eventual **Shopify** migration. Scope for now is the **front end only** — no backend logic. Full webshop UX (catalog → product → cart → checkout) should be designed in, including upgraded **scheduled-booking** UI for service/rentals (front end only, no backend). Launch is **Hungarian-only**. No existing integrations need to be preserved (clean break from UNAS). Product/inventory data will be available later. See Section 8 for detail.

---

## 1. Business Overview

**Legal entity:** Importőr Motorcenter Kft.
**Brand name:** IMC Motor (a.k.a. IMC Motor Dunakeszi)
**Domain:** https://www.imcmotor.hu/
**Location:** 2120 Dunakeszi, Kikerics köz 4. (Pest county, near Budapest)
**Phone:** +36 70 397 2543
**Email:** szalon@imcmotor.hu (sales) / szerviz@imcmotor.hu (service)
**Hours:** Mon–Fri 09:00–18:00 · Sat 09:00–13:00 · Sun closed
**Language:** Hungarian (primary), with an EN toggle present in the UI
**Tenure:** 30+ years in business; positions itself as one of Hungary's largest motorcycle specialists.

**What the business does:**
- Authorized dealer / importer for four Italian brands: **Vespa, Aprilia, Moto Guzzi, Piaggio** (Piaggio Group)
- New motorcycle & scooter sales (50cc scooters up to large-displacement sport bikes)
- Used motorcycle sales (also listed via hasznaltauto.hu partner page)
- Rental / test ride fleet
- Full-service workshop: maintenance, diagnostics, roadworthiness inspection (műszaki vizsga), origin checks, document handling — also services other Italian/international brands
- Accessories & gear: helmets, gloves, brand-specific parts, Mistral exhausts (Moto Guzzi)
- Financing, extended warranty, newsletter signup
- "Motorhotel" — seasonal motorcycle storage service

---

## 2. Technology / Platform

**Platform:** [UNAS](https://unas.hu/) — a Hungarian SaaS e-commerce / webshop platform (templated, hosted).

**Evidence:**
- Asset paths under `imcmotor.unas.hu` (e.g. `/!common_design/custom/imcmotor.unas.hu/element/...`)
- Standard UNAS webshop endpoints: `shop_cart.php`, `shop_reg.php`, `shop_order_track.php`, `shop_help.php`, `shop_contact.php`
- UNAS-style category IDs embedded in nav markup (e.g. `100001`, `540265`, `9999999249118`)

**Implications for a rebuild:**
- This is a **templated webshop**, not a custom-coded site. Theming, layout, and product structure are constrained by what UNAS exposes.
- Cart, accounts, registration, order tracking, favorites, checkout, and legal/info pages are **platform-provided** (`shop_*.php`) — not custom.
- A "new build" decision needs to address: stay on UNAS (re-theme) vs. migrate to another platform (e.g. WordPress/WooCommerce, Shopify, headless). This materially changes scope.
- SEO/meta is configured per-page (canonical, OG tags, description, robots, Google site verification present).

**Front-end characteristics observed:**
- Mobile-optimized meta present (`HandheldFriendly`, `MobileOptimized`, apple/mobile web-app capable)
- Many homepage hero/banner images are served as `space.gif` placeholders with the real image applied via CSS/background — typical UNAS template behavior
- Cookie consent layer with 4 categories (necessary, marketing, analytics, personalization), referencing Google Ads & Facebook Ads
- Login handled via JS overlay (`overlay_login()`)

---

## 3. Site Map / Page Structure

### Primary navigation
| Label (HU) | English meaning | URL |
|---|---|---|
| Újdonságok | New arrivals / 2026 models | `/2026-os-ujdonsagok-aprilia-moto-guzzi-vespa` |
| KIÁRUSÍTÁS | Clearance / sale | `/KIARUSITAS` |
| B125 (A1B) | A1-license 125 category | `/B125` |
| Vespa | Brand category | `/vespa` |
| Aprilia | Brand category | `/aprilia` |
| Moto Guzzi | Brand category | `/motoguzzi` |
| Piaggio | Brand category | `/piaggio` |
| Kiegészítők | Accessories | `/kiegeszitok` |
| Használt motorok | Used motorcycles | `/hasznaltmotorok` |
| Bérelhető / Teszt motorok | Rental / test bikes | `/motorberles` |
| Szerviz | Service | `/szerviz` |
| Elérhetőségek | Contact | `/kapcsolat` |
| Hírek | News / blog | `/hirek` |
| Finanszírozás | Financing | `/finanszirozas` |
| Kiterjesztett garancia | Extended warranty | `/garancia` |
| Motorhotel | Seasonal storage | `/spg/395261/Motorhotel` |

### Brand category → model sub-pages

**Vespa** (`/vespa`)
- Sprint 50 / Sprint 125
- Primavera 50 / Primavera 125
- Vespa 946 (`/946-Snake`)
- GTS 125 / GTS Super 125 / GTS SuperSport 125 / GTS SuperTech 125
- GTV 310
- GTS 310 (parent `/vespa/gts`): GTS 310 / Super 310 / SuperSport 310 / SuperTech 310
- Officina 8
- Electric range: Sprint S Elettrica 45, Primavera Elettrica 45, Primavera Tech Elettrica 70, Elettrica
- Vespa 80th Anniversary

**Aprilia** (`/aprilia`)
- SXR 50, SR GT 125, SR GT 200, SR GT 400
- SX 125, RX 125
- Tuareg 660, Tuono 457, RS 457, RS 660, RSV4, Tuono 660, Tuono V4

**Moto Guzzi** (`/motoguzzi`)
- Stelvio, V100 Mandello, V7, V85

**Piaggio** (`/piaggio`)
- Liberty 50 / Liberty 125
- Medley 125 / Medley 200
- Beverly 310/400
- MP3 310/400/530, MP3 400
- Piaggio 1 (electric)

**Kiegészítők / Accessories** (`/kiegeszitok`)
- Mistral (Moto Guzzi exhausts/accessories), Helmets (Bukósisakok), Gloves (Kesztyűk)
- Brand/model-specific accessory pages (V100 Mandello, Stelvio, V85, RSV4, Tuono V4, Tuareg 660, Piaggio Liberty/Medley/Beverly, Aprilia SX/RX, Vespa GTV/GTS/Primavera/Sprint, Moto Guzzi V7)

### Platform / utility pages (UNAS `shop_*.php`)
- Login overlay (`overlay_login()`), Registration (`/shop_reg.php`)
- Profile / order tracking (`/shop_order_track.php`), Favorites (`?tab=favourites`)
- Cart (`/shop_cart.php`)
- Terms / ÁSZF (`/shop_help.php?tab=terms`)
- Privacy policy / Adatkezelési tájékoztató (`/shop_help.php?tab=privacy_policy`)
- Payment info (`/shop_contact.php?tab=payment`)
- Shipping info (`/shop_contact.php?tab=shipping`)
- Contact (`/shop_contact.php`)

---

## 4. Page-Level Detail (observed content)

### Homepage (`/`)
- Top utility bar: address + phone, logo, HU/EN toggle
- Main nav (see site map)
- Hero/banner carousel area with promotional slides linking to featured models (e.g. Vespa Officina 8, Moto Guzzi V7 Sport, Aprilia Tuono 457, used Moto Guzzi MGX-21) and brand landing pages
- Tagline: "Motorozz stílusosan – nálunk kezdődik a kaland!" ("Ride in style – the adventure starts here!")
- "Kiemelt ajánlataink" (featured offers) section
- Newsletter signup (name + email + consent checkbox)
- Footer (see below)
- Cookie consent layer

### Service page (`/szerviz`)
- Services: full servicing of Piaggio/Vespa/Aprilia/Moto Guzzi + other Italian & international brands
- Current spring promo (valid until 2026.03.13): −10% parts, free pickup/delivery, complimentary inspection, fast turnaround
- CTA: book by phone (+36 70 397 2543) or email (szerviz@imcmotor.hu, with prefilled subject/body mailto)
- **Service price list** (valid from 2024.04.01):
  - Under 50cc (hourly): 18,000 Ft + VAT
  - 51–499cc (hourly): 20,000 Ft + VAT
  - Over 500cc (hourly): 25,000 Ft + VAT
  - Diagnostics: 12,000 Ft + VAT
  - Roadworthiness admin (műszaki vizsga): 12,000 Ft + VAT
  - Origin check admin (eredetvizsga): 12,000 Ft + VAT
  - Vehicle registry admin (okmányiroda): 18,000 Ft + VAT
- Service booking form: name, phone, email, bike type, chassis/VIN number, note
- Note: repairs only performed after customer approval

### Contact / About page (`/kapcsolat`)
- Email, phone, address, embedded Google Map (Dunakeszi, Kikerics köz 4)
- Opening hours
- About copy: 30+ years, mission as a specialist Italian-brand salon offering reliable, expert advice; full range from sales to insurance/warranty to apparel/accessories

---

## 5. Footer (site-wide)

**Company block:** Importőr Motorcenter Kft. · 2120 Dunakeszi, Kikerics köz 4. · +36703972543 · szalon@imcmotor.hu
**Social:** Facebook, Instagram (currently linking to generic facebook.com / instagram.com — likely placeholder/misconfigured), hasznaltauto.hu partner page
**Customer account block:** Login, Registration, Profile, Cart, Favorites
**Information block:** Terms (ÁSZF), Privacy policy, Payment, Shipping, Contact
**Secondary nav:** duplicate of main category nav (with UNAS category IDs)

---

## 6. SEO / Metadata setup (per page)

- `canonical` set per page
- `meta-description` and Open Graph tags (`og:title`, `og:description`, `og:site_name`, `og:type`, `og:url`) present
- `meta-robots: index, follow`
- `og:site_name: IMC Motor Dunakeszi`
- Google site verification meta present
- Keyword focus: brand names + "robogó", "motorszerviz", "gumiszerelés", "műszaki vizsga", "Budapest", "Pest" / "Pest vármegye", "Dunakeszi"

---

## 7. Notable observations / potential issues (for the rebuild brief)

- **Social links appear to be placeholders** (point to facebook.com / instagram.com roots, not the brand profiles) — verify and fix.
- **Image-heavy hero built on `space.gif` placeholders** with CSS backgrounds — limits accessibility (no real `alt`/`src`) and may hurt LCP/SEO.
- **Mixed/inconsistent URL conventions** — some routes are uppercase (`/KIARUSITAS`, `/B125`, `/SPRINT-50`), some lowercase (`/vespa`, `/piaggio`), some nested (`/vespa/gts/gts-125`), some flat (`/GTS-310`). A rebuild should normalize and plan 301 redirects to preserve SEO.
- **Templated UNAS theme** — visual customization and component flexibility are limited by the platform. **Decision made:** not staying on UNAS; rebuilding the front end for an eventual Shopify migration (see Section 8). Treat UNAS only as a reference for existing content/pages.
- **Two transactional layers coexist:** marketing/catalog content pages + UNAS webshop (cart/account/checkout). **Decision made:** clean break — the new build is front-end-only with mocked data; no migration of the existing commerce layer is required now (real product data comes later, mapped to Shopify).
- **Bilingual intent (HU/EN)** present but Hungarian is the real content; confirm whether EN is fully populated or partial.
- **Promos are hardcoded into page copy** (dated offers, price list with effective dates) — a rebuild should make these editable/maintainable.

---

## 8. Confirmed direction for the rebuild

These were open questions; they are now decided. Treat this section as the brief.

1. **Target platform — Shopify (eventual).** The end state is a migration to **Shopify**. For now the work is a **design rebuild only**: build a new front end, but design it as a webshop intended to live on Shopify. Structure pages, components, and the commerce flow so they map cleanly onto Shopify concepts (collections, products, variants, cart, checkout) when the migration happens. Do **not** carry over anything UNAS-specific.

2. **Scope — front end only, no backend.** Build the front end (markup, styling, components, page templates, interactive UI). **Do not build backend logic** — no real checkout processing, no order persistence, no booking backend, no auth. Where commerce or booking actions occur, build the **UI/flow** and stub/mock the data and submission. Functional wiring comes later on Shopify.

3. **Commerce scope — full webshop UX.** Design and build the **complete e-commerce experience**: catalog/collection pages → product detail pages (with variants) → cart → checkout flow, plus account-style pages (login, registration, profile/orders, favorites) as front-end screens. Full checkout UX should be present even though it's not wired to a backend yet.

4. **Product data — available later.** Canonical product/price/inventory data **will be provided**. For now, build with representative placeholder/mock data and a clean data shape that can be swapped for real product data (and later mapped to Shopify products/variants). Don't hardcode product specifics in a way that's hard to replace.

5. **Language — Hungarian only at launch.** Build **HU-only**. Drop the HU/EN toggle for now. Keep copy in Hungarian. (Structure can remain i18n-friendly if cheap, but EN is explicitly **not** required at launch.)

6. **Integrations — none to preserve.** Clean break from UNAS. **No existing integrations** need to be carried over (no hasznaltauto.hu feed, UNAS webshop layer, current newsletter provider, etc.). Build fresh.

7. **Booking flows — upgrade to scheduled booking (front end only).** Replace the current plain service/rental forms with an **upgraded scheduled-booking UI** (e.g. date/time selection, slot picking, multi-step flow). Build the **front-end experience only** — no booking backend, scheduling engine, or availability logic. Mock the data.

### Net implication for Claude Code
Build a **new, modern, Hungarian-language e-commerce front end** for IMC Motor, **Shopify-oriented in structure** but **front-end only** (no backend, mocked data). Include the full commerce journey and an upgraded booking UI. Ignore the legacy UNAS platform layer entirely except as a reference for *what content/pages exist* (Sections 3–6).
