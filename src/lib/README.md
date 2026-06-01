# src/lib/ — app logic & helpers

Framework-light utilities and client-side state. No backend.

| File | Purpose |
|---|---|
| `cart.tsx` | Cart context + reducer, persisted to `localStorage` (`imc.cart.v1`). `useCart()` hook; also drives the cart drawer open/close. → Shopify cart later. |
| `format.ts` | Hungarian formatting: `formatHUF` (`1 290 000 Ft`), product price ranges. |
| `booking.ts` | Mock scheduled-booking helpers: opening-hours-aware slot generation, day validation, HU date formatting (used by the booking flow in a later phase). |
| `seo.tsx` | `<Seo>` — per-page `<title>`/`<meta>` via **React 19 native metadata** (no helmet). |
| `cn.ts` | Tiny className joiner. |
| `useScrollLock.ts` | Locks body scroll for drawers/menus/modals. |

**Conventions:** keep these pure/typed and UI-agnostic where possible. Currency
and dates always go through `format.ts`/`booking.ts` (brand-voice formatting rules).
