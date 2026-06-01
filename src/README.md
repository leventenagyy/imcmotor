# src/ — application code

Vite + React + TypeScript app. Entry: [`main.tsx`](./main.tsx) →
[`App.tsx`](./App.tsx) (routes) → pages in [`routes/`](./routes).

| Folder | What's there |
|---|---|
| [`data/`](./data) | **Editable content** — products, collections, services, news, navigation, site settings, home. Shapes in `types.ts` (Shopify-aligned). Start here to change content. |
| [`components/`](./components) | UI building blocks: `ui/` (primitives), `layout/` (header/footer/nav), `commerce/` (product/cart), `content/` (hero/news/etc.). |
| [`routes/`](./routes) | One file per page. Mapped to URLs in `App.tsx`. |
| [`lib/`](./lib) | Cart state, formatting (HUF/date), SEO head, booking helpers, small utils. |
| `index.css` | Tailwind import + **design tokens** (mirror of `docs/design-system.md`). |

**Conventions:** TypeScript strict; no copy hardcoded in components (pull from
`data/`); design values come from tokens in `index.css`; accessibility is a gate
(see `docs/design-system.md §9`). Import via the `@/` alias (e.g. `@/components/ui`).
