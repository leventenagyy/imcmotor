# src/components/ — UI building blocks

Small, typed, reusable React components. Grouped by role; each group has a barrel
`index.ts`. Visual values come from the design tokens in `src/index.css`
(mirror of [`docs/design-system.md`](../../docs/design-system.md)) — don't
hardcode colors/spacing.

| Group | Contains |
|---|---|
| `ui/` | Primitives: `Button`, `Container`, `Section`, `Eyebrow`, `Price`, `Tag`, `Reveal`, `Media`/`Placeholder`, `QuantityStepper`, form controls, `Breadcrumbs`, `EmptyState`. |
| `layout/` | `Layout` (shell), `Header` (+ brand mega-menu), `MobileNav`, `Footer`, `AnnouncementBar`, `Logo`, `SocialIcons`. |
| `commerce/` | `ProductCard`, `BrandCard`, `ProductGrid`, `VariantSelector`, `Gallery`, `CartLineItem`, `CartDrawer`, `OrderSummary`, `CollectionToolbar`. |
| `content/` | `Hero`, `NewsCard`, `Newsletter`, `MapEmbed`, `PriceList`, `PageHeader`. |

**Rules of the house**
- Icons are **SVG** (lucide-react; brand logos inlined in `layout/SocialIcons.tsx` — lucide dropped them). Never emojis.
- Interactive elements get `cursor-pointer`, visible focus, ≥44px touch targets, and `aria-label` when icon-only.
- Motion uses `motion/react`; reduced-motion is honored globally (`<MotionConfig reducedMotion="user">`) and in `Reveal`.
- Copy belongs in `src/data`, not in components.
