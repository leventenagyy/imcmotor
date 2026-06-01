# CLAUDE.md — IMC Motor website · routing index

> **Read me first.** This is the navigation map for the project: where things
> live, what they do, and where to make a given change. Keep it current — when
> you add a folder or major file, add a line here.

## What this is
A new **Hungarian, front-end-only e-commerce site** for **IMC Motor** (Italian
motorcycle dealer — Vespa, Aprilia, Moto Guzzi, Piaggio — Dunakeszi). Built with
**Vite + React + TypeScript + Tailwind**, deployed on **GitHub Pages**, with
**mock data**, structured for an **eventual Shopify migration**. Visual direction:
**premium editorial minimal**.

**Project status:** 🟢 **Phase 0 + Phase 1 built.** Scaffold, design system, and
showcase pages (Home, Collection, Product, Cart, Contact, Service + News) run
locally and build clean (`npm run build`). Later-phase pages (checkout, booking,
account, legal, finance/warranty/motorhotel) are on-brand placeholders. Roadmap &
remaining phases: [docs/PRD.md §15](./docs/PRD.md).

## Where to look / where to edit

| If you want to… | Go to |
|---|---|
| Understand scope, pages, features, phases | [docs/PRD.md](./docs/PRD.md) ← **the contract** |
| Know colors / fonts / spacing / components | [docs/design-system.md](./docs/design-system.md) |
| Pick icon / motion / SVG / texture libraries (build-time) | [docs/assets-motion-research.md](./docs/assets-motion-research.md) |
| Write or edit Hungarian copy | [docs/brand-voice.md](./docs/brand-voice.md) |
| Edit content (products, prices, promos, nav, copy) | [src/data/](./src/data) + [docs/content-editing.md](./docs/content-editing.md) |
| Run / build / deploy the app | [README.md](./README.md) |
| See the original site analysis / brief | [imcmotor-website-overview.md](./imcmotor-website-overview.md) |
| Plan the Shopify migration | [docs/shopify-mapping.md](./docs/shopify-mapping.md) |

## Documentation map
```
CLAUDE.md                      ← you are here (routing index)
README.md                      ← human quickstart (run/build/deploy)
imcmotor-website-overview.md   ← source brief (existing site analysis + confirmed direction)
docs/
├─ README.md                   ← index of the docs folder
├─ PRD.md                      ← requirements: scope, IA, pages, features, architecture, phases
├─ design-system.md            ← visual language + design tokens (mirror in code)
├─ brand-voice.md              ← Hungarian voice, CTAs, microcopy, formatting
├─ content-editing.md          ← how to edit products/prices/copy (non-dev guide)
├─ shopify-mapping.md          ← data → Shopify field-by-field migration map
└─ assets-motion-research.md   ← icon/motion/SVG/texture libraries + paste-ready snippets
```

## Application structure (built)
Each folder has its own `README.md` (purpose + voice/design notes).
```
.github/workflows/deploy.yml   ← GitHub Pages deploy (sets base path, builds, publishes)
public/                        ← 404.html (SPA fallback), favicon.svg, robots.txt
index.html                     ← font links + SPA path-restore script
src/
├─ main.tsx · App.tsx · index.css   (entry + providers, routes, design tokens)
├─ routes/        ← one file per page (Home, Collection, Product, Cart, Service,
│                   Contact, News + StubPage placeholders, 404)   → src/routes/README.md
├─ components/    ← ui/ layout/ commerce/ content/ (each barrelled)  → src/components/README.md
├─ data/          ← EDITABLE CONTENT: products, collections, services, news,
│                   navigation, site, home + types.ts (Shopify-aligned)  → src/data/README.md
└─ lib/           ← cart (context+localStorage), format, seo, booking, cn, hooks  → src/lib/README.md
```
> **Editing content** (products, prices, promos, copy) = edit `src/data/*`, never
> hardcode in components. Guide: [docs/content-editing.md](./docs/content-editing.md).

## Key decisions (confirmed)
- Stack: **Vite + React + TS + Tailwind v4**; deploy: **GitHub Pages** (static).
- **Own dedicated GitHub repo** (not the `hermes-marketing-team` workspace repo).
- Aesthetic: **premium editorial minimal**.
- Accent: **Rosso `#C81D25`** (Italian red). Fonts: **Fraunces + Jost**.
- Tone: informal **"te"**. **Hungarian only** at launch.
- **Front-end only**, mock data, **Shopify-shaped**.
- Clean break from UNAS; no legacy integrations carried over.

## Decisions pending (see PRD §16)
- Eventual custom domain `imcmotor.hu`? (affects base path + CNAME).
- Real assets (logo/photos) — currently tasteful placeholders throughout.
- Next: build Phase 2 (checkout + scheduled booking flows) when ready.

## Conventions
- TypeScript strict; small typed components; no copy in components (use `data/`).
- Tailwind + CSS custom-property tokens that **mirror design-system.md**.
- Routes lowercase-hyphenated Hungarian (PRD §7); a11y is a gate (design-system §9).
- Commit per logical step; keep this file + folder READMEs updated as structure grows.

## ⚠️ Repo note
This folder is currently a **subdirectory of the `hermes-marketing-team`**
workspace repo (`github.com/leventenagyy/hermes-marketing-team`). **Decision:** the
site gets its **own new repo** before deploy (PRD §14). When build starts, init a
fresh repo here (and ignore this folder from the parent) — don't deploy from the
workspace repo.
