# IMC Motor — Design System

> Single source of truth for the visual language. The PRD references this; the
> future code (`src/index.css` design tokens + Tailwind theme) must mirror it.
> Direction: **Premium editorial minimal** — Italian, photo-led, gallery-calm.

**Status:** Draft v0.2 · Brand choices **confirmed** — Rosso accent, Bodoni Moda
+ Jost, informal "te". Remaining open items in [PRD.md → §16](./PRD.md).

---

## 1. Design principles

1. **Editorial, not e-commerce-y.** Big confident type, generous whitespace,
   hairline rules, lots of air. The page should feel like a design magazine for
   Italian motorcycles, not a busy webshop.
2. **Photography is the hero.** Layouts are frames for imagery. UI chrome stays
   quiet so bikes carry the page. (Until real photos exist, placeholders follow
   the same disciplined system — see §8.)
3. **One accent, used sparingly.** A single accent color marks actions and
   moments. Everything else is warm neutral. Restraint = premium.
4. **Intentional, not decorated.** No gratuitous gradients, glows, or glass.
   Depth comes from whitespace, scale contrast, and 1px lines.
5. **Calm motion.** Movement reveals and guides; it never shows off. Always
   honor `prefers-reduced-motion`.
6. **Accessible by default.** WCAG 2.1 AA is a requirement, not a nice-to-have
   (contrast, focus, keyboard, touch targets, alt text).

### Deviations from the ui-ux-pro-max auto-recommendation (intentional)
The design skill's top auto-picks were **Liquid Glass** style + **Playfair
Display / Inter** fonts + a gold accent. We deliberately override:
- **Style → refined editorial minimalism** (not Liquid Glass). Glass morphing is
  trendy, contrast-risky, and flagged "moderate-poor performance"; it fights the
  gallery-calm direction the client chose.
- **Fonts → Bodoni Moda + Jost** (not Playfair/Inter). Inter is the canonical
  "AI-slop" body font; Bodoni is literally named after the Italian punchcutter
  Giambattista Bodoni — on-brand heritage, more distinctive than Playfair.
- The skill's neutral palette and a11y checklist are kept.

---

## 2. Color

Warm, stone-based neutrals (not cold grays) for an Italian, paper-like feel.

### Neutrals (shared, fixed)
| Token | Hex | Use |
|---|---|---|
| `--color-paper` | `#FAF8F5` | Page background (warm off-white) |
| `--color-surface` | `#FFFFFF` | Cards, sheets, raised surfaces |
| `--color-surface-sunken` | `#F2EEE8` | Wells, alternating sections |
| `--color-ink` | `#17130F` | Primary text / near-black |
| `--color-ink-soft` | `#3A332D` | Headings on light, strong UI text |
| `--color-stone` | `#6B6259` | Muted/body-secondary text (≥4.5:1 on paper) |
| `--color-hairline` | `#E6DFD5` | Borders, dividers, table rules |
| `--color-overlay` | `rgba(23,19,15,0.55)` | Modal/scrim backdrop |

### Accent — ✅ **confirmed: Rosso (Italian racing red)**
The single brand accent is **Rosso**. (Oro gold below was the considered
alternative — kept for reference, not in use.)

**Rosso (Italian racing red) — IN USE**
| Token | Hex | Use |
|---|---|---|
| `--color-accent` | `#C81D25` | Primary CTAs, active states, key links |
| `--color-accent-hover` | `#A8161D` | Hover/pressed |
| `--color-accent-ink` | `#FFFFFF` | Text/icons on accent |
*Why:* iconic for Italian motorcycles; ties Vespa/Aprilia/Moto Guzzi/Piaggio
together; energetic without breaking minimalism.

**Oro (refined gold/amber) — considered alternative, NOT in use**
| Token | Hex | Use |
|---|---|---|
| `--color-accent` | `#B07D2B` | Primary CTAs, active states |
| `--color-accent-hover` | `#8F6420` | Hover/pressed |
| `--color-accent-ink` | `#1A1510` | Text/icons on accent |
*Why:* maximally "luxury editorial," matches the skill's premium pick; reads
more fashion/heritage than motorsport.

### Semantic (independent of accent, so red-as-accent never means "error")
| Token | Hex | Use |
|---|---|---|
| `--color-success` | `#3F7D3F` | In-stock, confirmation |
| `--color-warning` | `#B5852A` | Low stock, caution |
| `--color-danger` | `#B42318` | Errors, destructive (distinct from accent red) |
| `--color-info` | `#3A332D` | Neutral notices (we avoid blue clichés) |

> **Contrast rule:** body text ≥ 4.5:1, large/UI text ≥ 3:1. Never use
> `--color-stone` lighter for body. Accent text on accent bg must pass 4.5:1.

---

## 3. Typography

**Display:** `Bodoni Moda` (serif, high-contrast didone) — headlines, hero,
big numerals, section titles. Weights 400/500/600/700. Display only — never body.

**Body / UI:** `Jost` (geometric grotesque) — body copy, nav, buttons, labels,
forms, prices. Weights 300/400/500/600.

Both load from Google Fonts and **include `latin-ext`** so Hungarian glyphs
(`ő ű Ő Ű á é í ó ö ú ü`) render correctly. **Verify ő/ű in both faces during
build** (acceptance criterion).

```css
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Jost:wght@300;400;500;600&display=swap');
```
```
fontFamily: {
  display: ['"Bodoni Moda"', 'Georgia', 'serif'],
  sans:    ['"Jost"', 'system-ui', 'sans-serif'],
}
```

> _Considered alternative (not chosen):_ `Fraunces` (display) + `Hanken Grotesk`
> (body) — warmer/softer, also Hungarian-safe.

### Type scale (fluid)
| Role | Font | Size (clamp) | Weight | Leading | Tracking |
|---|---|---|---|---|---|
| Display / Hero | Bodoni Moda | `clamp(3rem, 8vw, 7rem)` | 500 | 0.98 | -0.02em |
| H1 | Bodoni Moda | `clamp(2.5rem, 5vw, 4.5rem)` | 500 | 1.05 | -0.01em |
| H2 | Bodoni Moda | `clamp(2rem, 3.5vw, 3rem)` | 500 | 1.1 | -0.01em |
| H3 | Bodoni Moda | `clamp(1.5rem, 2vw, 2rem)` | 600 | 1.15 | 0 |
| Lead | Jost | `1.25rem` | 400 | 1.6 | 0 |
| Body | Jost | `1rem` (16px min) | 400 | 1.65 | 0 |
| Small | Jost | `0.875rem` | 400 | 1.55 | 0 |
| Eyebrow / Label | Jost | `0.75rem` | 600 | 1.2 | `0.18em`, UPPERCASE |

- **Measure:** 60–75 characters for body blocks.
- **Numerals:** prices and specs may use Bodoni for editorial emphasis on PDP.

---

## 4. Spacing, grid & layout

- **Base unit:** 4px. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- **Container:** `max-width: 1320px`; gutters `clamp(20px, 5vw, 80px)`.
- **Grid:** 12-column, column gap 24–32px. Embrace **asymmetry** (e.g. 7/5,
  8/4 splits, offset captions, full-bleed images breaking the container).
- **Section rhythm:** vertical padding `py-20` mobile → `py-32` desktop.
  Whitespace is a feature; when unsure, add space.
- **Radii (crisp/editorial):** `--radius-sm: 2px`, `--radius-md: 6px`. Product
  imagery stays square (radius 0–2px). No pill buttons.
- **Borders:** 1px `--color-hairline`. Lines do the structural work, not boxes.
- **Elevation:** mostly flat. Shadows reserved for true overlays:
  `--shadow-overlay: 0 24px 60px -20px rgba(23,19,15,0.35)`.
- **Z-index scale:** base 0 · sticky header 30 · dropdown/mega-menu 40 ·
  drawer/scrim 50 · modal 60 · toast 70.

---

## 5. Components (inventory)

Built as small, typed React components (see PRD §12). Each must have hover,
focus-visible, disabled, and loading states where relevant.

- **Primitives:** `Button` (primary/secondary/ghost/link), `IconButton`,
  `Tag`/`Badge`, `Eyebrow`, `Price` (with compare-at strikethrough),
  `Divider`, `Container`, `Section`.
- **Forms:** `FormField` (label + hint + error), `Input`, `Select`, `Textarea`,
  `Checkbox`, `Radio`, `QuantityStepper`, `DatePicker`, `SlotPicker`.
- **Navigation:** `Header` (sticky), `MegaMenu` (brand/model browse), `MobileNav`
  (drawer), `Breadcrumbs`, `Pagination`, `AnnouncementBar`, `Footer`.
- **Commerce:** `ProductCard`, `BrandCard`, `CollectionToolbar` (sort+filter),
  `FilterGroup`, `Gallery`, `VariantSelector`, `AddToCart`, `CartLineItem`,
  `CartDrawer`, `OrderSummary`, `Stepper` (checkout & booking), `EmptyState`.
- **Content:** `Hero`, `FeatureRow`, `StatStrip`, `PriceList` (service),
  `NewsCard`, `Accordion` (FAQ/specs), `MapEmbed`, `Newsletter`, `Toast`.

### Button spec (reference)
- Primary: accent bg, `--color-accent-ink` text, `radius-md`, `padding 14px 28px`,
  `font-weight 600`, uppercase optional eyebrow style for hero CTAs.
- Hover: shift to `--color-accent-hover` (color transition, **no scale shift**).
- Focus: 2px `--color-ink` focus ring, 2px offset.
- All clickable elements get `cursor-pointer`; touch target ≥ 44×44px.

---

## 6. Motion

- **Micro-interactions:** 150–300ms, `ease-out`. Color/opacity/transform only.
- **Page load:** one orchestrated, staggered reveal (fade + 12–16px rise,
  60–80ms stagger) for hero + first section. Don't animate everything.
- **Scroll reveals:** subtle, once, with `IntersectionObserver`/Motion `whileInView`.
- **Library:** `motion` (Motion for React) when helpful; CSS for simple cases.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` → disable
  transforms/reveals, keep instant opacity. Non-negotiable.

---

## 7. Imagery & art direction

- **Ratios:** hero 16:9 (or full-bleed), product 4:5, card 3:4, editorial 3:2.
- **Treatment:** full-bleed, minimal rounding, generous crops. Captions in
  `Eyebrow` style. Occasional duotone-on-ink section for drama.
- **Performance:** `loading="lazy"` below the fold, width/height set to prevent
  layout shift, WebP/AVIF when real assets arrive, `srcset` for responsive.
- **Alt text:** required and descriptive (Hungarian).

---

## 8. Placeholder system (until real assets exist)

No invented logos or fake photos passed off as real. Placeholders must look
deliberate and be trivially swappable.

- **Image placeholder:** warm stone block (`--color-surface-sunken`) with a thin
  hairline frame and a centered `Eyebrow` label naming the intended asset
  (e.g. `VESPA · PRIMAVERA 125 · 4:5`). One shared `<Placeholder ratio label />`
  component; replacing it later = swapping the `src`.
- **Logo:** set the wordmark in **Bodoni Moda** ("IMC MOTOR") as an interim
  logotype — looks intentional, not broken; real logo drops into one slot.
- **Brand marks (Vespa/Aprilia/etc.):** name set in type, not fake logos, to
  avoid trademark misuse. Swap for official assets when licensed.
- **Avatars/maps:** neutral placeholders; Google Map embed is real on Contact.

---

## 9. Accessibility checklist (gate for every page)
- [ ] Text contrast ≥ 4.5:1 (3:1 large/UI); verified for the chosen accent.
- [ ] Visible `focus-visible` rings; tab order matches visual order.
- [ ] Icon-only buttons have `aria-label`; inputs have associated `<label>`.
- [ ] All meaningful images have HU alt text; decorative ones `alt=""`.
- [ ] Color never the sole signal (pair with icon/text).
- [ ] Touch targets ≥ 44×44px; no hover-only critical actions.
- [ ] `prefers-reduced-motion` respected.
- [ ] Responsive with no horizontal scroll at 375 / 768 / 1024 / 1440px.
