# src/routes/ — pages

One component per page; URLs are wired in [`../App.tsx`](../App.tsx). Routes are
lowercase-hyphenated Hungarian (PRD §7). Each page sets its own SEO via `<Seo>`.

| Page | Route | Status |
|---|---|---|
| `HomePage` | `/` | ✅ built |
| `CollectionPage` | `/vespa`, `/aprilia`, `/moto-guzzi`, `/piaggio`, `/ujdonsagok`, `/kiarusitas`, `/b125`, `/kiegeszitok`, `/hasznalt-motorok` | ✅ data-driven (filter + sort via URL) |
| `ProductPage` | `/termek/:handle` | ✅ variants + add-to-cart |
| `CartPage` | `/kosar` | ✅ (cart drawer in `commerce/`) |
| `CheckoutPage` | `/penztar` | ✅ multi-step, mocked (clears cart on order) |
| `ServicePage` | `/szerviz` | ✅ price list + promo |
| `ServiceBookingPage` | `/szerviz/foglalas` | ✅ scheduled `BookingFlow` (service mode) |
| `RentalPage` | `/berles` | ✅ fleet grid + `BookingFlow` (rental mode) |
| `ContactPage` | `/kapcsolat` | ✅ map + mock form |
| `NewsPage` / `NewsArticlePage` | `/hirek`, `/hirek/:slug` | ✅ list + article |
| `StubPage` | account, legal, finanszírozás, garancia, motorhotel | ⏳ on-brand placeholder (later phase) |
| `NotFoundPage` | `*` | ✅ |

**Adding a page:** create the component here, add a `<Route>` in `App.tsx`, link
to it from `src/data/navigation.ts`, and update [`../../CLAUDE.md`](../../CLAUDE.md).
Pull content from `src/data`, compose with `components/`.
