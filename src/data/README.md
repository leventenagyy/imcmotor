# src/data/ — editable content (the CMS-in-code)

This is where **content** lives, separate from presentation. Edit these files to
change what the site shows; components read from here via [`index.ts`](./index.ts)
selectors. Shapes are **Shopify-aligned** (see `types.ts` + `docs/shopify-mapping.md`)
so the later migration is mechanical.

| File | Holds | Notes |
|---|---|---|
| `types.ts` | TypeScript shapes | Product/Variant/Collection ≈ Shopify objects |
| `products.ts` | Product catalog | `handle` = URL slug; prices are HUF integers; `images[].src: null` → placeholder |
| `collections.ts` | Collection metadata | Membership derived from each product's `collections[]` |
| `navigation.ts` | Header mega-menu + footer | Brand model links, categories, footer columns |
| `services.ts` | Service promo, price list, bookable services | Promo/price are **data**, not baked into JSX |
| `news.ts` | News/blog posts | Newest first |
| `site.ts` | Company info, hours, contacts, social | Used by header/footer/contact/SEO |
| `home.ts` | Home page content blocks | Hero, featured handles, bands, newsletter |
| `index.ts` | Selectors | `getProductByHandle`, `getProductsByCollection`, `getPriceRange`, … |

**Brand voice when editing copy:** Hungarian, informal **"te"**, feeling-first
then facts, prices as `1 290 000 Ft`. Full rules: [`docs/brand-voice.md`](../../docs/brand-voice.md).
**Don't** invent fake reviews/stats in placeholder content.

See [`docs/content-editing.md`](../../docs/content-editing.md) for step-by-step examples.
