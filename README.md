# IMC Motor — website

Modern, Hungarian-language e-commerce **front end** for IMC Motor (Vespa ·
Aprilia · Moto Guzzi · Piaggio, Dunakeszi). Built with **Vite + React +
TypeScript + Tailwind v4**, deployed as a static site on **GitHub Pages**.
Front-end only with **mock data**, structured for an eventual **Shopify**
migration. Visual direction: **premium editorial minimal**.

> 📍 New here? Read [`CLAUDE.md`](./CLAUDE.md) (the routing index) and
> [`docs/PRD.md`](./docs/PRD.md) (requirements). Status: **Phase 0 + Phase 1**
> built (scaffold, design system, and showcase pages).

## Quickstart

```bash
npm install      # install dependencies (Node 20.19+ / 22 recommended)
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check + production build → dist/
npm run preview  # preview the production build locally
```

## What's built (Phase 0 + 1)

- Design system + tokens (Rosso accent, Bodoni Moda + Jost), reusable UI kit.
- Layout: header with brand mega-menu, mobile drawer, footer, announcement bar.
- **Finished pages:** Home, Collection (data-driven, filter + sort), Product
  detail (variants, add-to-cart), Cart (+ drawer, persisted), Contact (map +
  form), Service (editable price list + promo).
- Client-side cart (localStorage). News list + article.
- On-brand placeholders for later-phase pages (checkout, booking, account,
  legal, financing, warranty, motorhotel) so navigation is complete.

See the roadmap in [`docs/PRD.md` §15](./docs/PRD.md).

## Editing content (no deep coding needed)

All products, prices, promos, navigation and copy live in [`src/data/`](./src/data).
Edit those files — components read from them. See
[`docs/content-editing.md`](./docs/content-editing.md).

## Project structure

See [`CLAUDE.md`](./CLAUDE.md) for the full map. In short:
`src/data` (content) · `src/components` (ui/layout/commerce/content) ·
`src/routes` (pages) · `src/lib` (cart, format, seo, booking) ·
`docs/` (PRD, design system, brand voice, guides).

## Deployment (GitHub Pages)

1. Put this project in its **own GitHub repo** (decided — not the workspace repo).
2. Repo → **Settings → Pages → Source: GitHub Actions**.
3. Push to `main`. [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)
   builds and deploys automatically. It sets the base path to `/<repo>/` for
   project pages, and `public/404.html` handles SPA deep links.

**Custom domain (`imcmotor.hu`) later:** add a `public/CNAME` file with the
domain, remove the `BASE_PATH` env from the workflow (base becomes `/`), and set
`pathSegmentsToKeep = 0` in [`public/404.html`](./public/404.html).

## Notes

- Hungarian only at launch. Images are intentional placeholders until real
  assets arrive (drop a real `src` into the data — see content guide).
- No backend: checkout/booking/account are front-end flows or placeholders;
  forms are mocked. This is by design (PRD §3).
