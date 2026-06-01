# Shopify migration mapping

The front end is built so the data shapes ([`src/data/types.ts`](../src/data/types.ts))
map onto Shopify with minimal rework. This is the field-by-field reference for the
future migration (PRD §13, §17). Nothing here is wired yet — it's the plan.

## Objects

| Front-end (`types.ts`) | Shopify | Notes |
|---|---|---|
| `Product` | Product | |
| `Product.handle` | `product.handle` | URL slug; keep identical to preserve links |
| `Product.title` | `product.title` | |
| `Product.vendor` (Brand) | `product.vendor` | Vespa / Aprilia / Moto Guzzi / Piaggio |
| `Product.productType` | `product.product_type` | "Robogó", "Sport", "Kiegészítő", … |
| `Product.tags` | `product.tags` | incl. `hasznalt` for used bikes |
| `Product.descriptionHtml` | `product.body_html` | |
| `Product.images[]` | `product.images[]` | `src`/`alt`; replace placeholders with CDN URLs |
| `Product.options[]` | `product.options[]` | e.g. Szín, Méret, Állapot |
| `Variant` | ProductVariant | |
| `Variant.price` (HUF int) | `variant.price` | Shopify stores decimal; HUF has no minor unit |
| `Variant.compareAtPrice` | `variant.compare_at_price` | sale display |
| `Variant.availableForSale` | `variant.available` / inventory | |
| `Variant.selectedOptions[]` | `variant.selectedOptions` | option name/value pairs |
| `Variant.sku` | `variant.sku` | |
| `Collection` | Collection (manual) | membership from `product.collections[]` → collects |
| `NewsPost` | Article (Online Store Blog) | |
| `site` settings | Shop settings / metafields | hours, contact, social |

## Custom / app-backed (not core Shopify objects)

| Front-end | Shopify approach |
|---|---|
| `services` (price list + promo) | Metafields on a "Szerviz" page, or a content section |
| `bookableServices` + booking flow | Booking app (e.g. Sesami/Appointo) or a custom app + metafields |
| Cart context (`lib/cart.tsx`) | Storefront API cart / Online Store cart |
| Checkout flow (placeholder) | Shopify Checkout (hosted) |
| Account screens (placeholder) | Shopify customer accounts |
| Newsletter (mock) | Shopify Forms / Klaviyo / Mailchimp |
| Redirects (old UNAS URLs) | Shopify URL Redirects (`/admin/redirects`) — see PRD §11 |

## Migration order (suggested)
1. Create products/collections in Shopify from `src/data` (CSV or Admin API).
2. Map options/variants; upload real images; set inventory.
3. Decide architecture: **theme** (Liquid) re-implementing this design, or
   **Hydrogen** (React — reuses these components most directly).
4. Wire cart/checkout to Storefront API / Shopify Checkout.
5. Add booking app; migrate service content to metafields.
6. Configure URL redirects from the legacy site; verify SEO/canonicals.
