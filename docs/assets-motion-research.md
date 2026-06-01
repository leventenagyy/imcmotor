# IMC Motor — Assets & Motion research

> Library + resource recommendations for **SVGs, icons, motion, and texture**,
> filtered against [design-system.md](./design-system.md) (premium editorial
> minimal, calm motion, photography-led, `prefers-reduced-motion` as a hard gate)
> and the confirmed stack (Vite + React + TS + Tailwind v4). Includes paste-ready
> snippets, not just a library list.

**Status:** v0.2 · Phase 0/1 **built**. Remaining snippets stay valid for later phases.

> **Build update (what shipped vs. this plan).** Installed: **`lucide-react`** +
> **`motion`**. *Deferred* (not yet needed): `vite-plugin-svgr` (the interim
> wordmark is a Bodoni **text** `Logo` component, not an imported SVG, per
> design-system §8), `tw-animate-css` (drawers/menus use Motion's
> `AnimatePresence` instead), and `LazyMotion`/`m` (used plain `motion.*` +
> `MotionConfig reducedMotion="user"` in `src/main.tsx` for simplicity — revisit
> `LazyMotion` if bundle size matters). Reduced-motion gate is wired.
>
> **Correction to §1:** lucide **v1 removed brand logos** (Facebook/Instagram/
> YouTube). Footer social marks are therefore inlined from Simple Icons in
> [`src/components/layout/SocialIcons.tsx`](../src/components/layout/SocialIcons.tsx).

> **Scope note (read this).** This is a curated **library/tool** scan plus a few
> **hand-authored** snippets — *not* a catalog of pre-made finished assets (no
> stock Lottie files, no illustration packs). For a photo-led editorial site,
> off-the-shelf decorative assets read as generic and fight the gallery-calm
> direction; the right approach is a small set of libraries + custom marks set in
> type/SVG. Real product photography stays the hero (design-system §7).

---

## 0. Decision summary

**Install when build starts (Phase 0/1):**
```
lucide-react        # UI icons (thin-line, currentColor-themed)
motion              # Motion for React — formerly Framer Motion (reveals, gestures)
vite-plugin-svgr    # import .svg as React components (wordmark, placeholders, custom marks)
tw-animate-css      # Tailwind v4 CSS enter/exit (accordion, drawer, toast) — no JS
```
**Evaluate later (not foundational):** `lenis` (smooth scroll), `@number-flow/react` (stat counters).
**Deliberately NOT adopting:** `gsap` project-wide, `lottie`/`rive` at launch, flat illustration packs (unDraw etc.) — all clash with the calm, photo-led direction.

---

## 1. Icons — Lucide

[Lucide](https://lucide.dev) (`lucide-react`) is the editorial-minimal default:
the maintained Feather fork, ~1,500 consistent thin-line icons, per-icon
tree-shaking, inherits `currentColor`. Tune `strokeWidth={1.5}` (default is 2) for
a lighter, more editorial line that recedes behind photography.

```tsx
import { ShoppingBag } from "lucide-react";

// icon recedes to --color-ink; flip to accent only on active state
<ShoppingBag className="size-5 text-ink" strokeWidth={1.5} aria-hidden />
```
Icon-only buttons need `aria-label` (design-system §9).

**Map to the component inventory (design-system §5)** — confirm exact slugs at
[lucide.dev/icons](https://lucide.dev/icons):

| Where | Icons |
|---|---|
| Header / nav | `Menu`, `X`, `Search`, `ShoppingBag`, `Heart`, `User`, `ChevronDown` |
| MegaMenu / Breadcrumbs / Pagination | `ChevronRight`, `ChevronLeft`, `ArrowRight`, `ArrowUpRight` |
| CollectionToolbar / Filter | `SlidersHorizontal`, `Filter`, `Check`, `ChevronDown` |
| QuantityStepper / Cart | `Plus`, `Minus`, `Trash2` |
| Accordion (FAQ/specs) | `Plus`/`Minus` or `ChevronDown` (rotate on open) |
| Contact / Service | `MapPin`, `Phone`, `Mail`, `Clock`, `Calendar`, `Truck` |
| Feedback / states | `Check` (success), `Info`, `AlertCircle`, `Loader2` (spinner) |
| Footer social | `Instagram`, `Facebook`, `Youtube` |

> ⚠️ **Lucide has no dedicated motorcycle glyph** (only `Bike` = bicycle). For any
> motorcycle/scooter mark, author a small custom SVG and import it via svgr (§4).
> Alternatives if Lucide lacks something: [Tabler](https://tabler.io/icons) (5,000+,
> 2px stroke) or [Phosphor](https://phosphoricons.com) (multi-weight) — but keep the
> set visually consistent; don't mix families.

---

## 2. Motion — Motion for React (already nominated in design-system §6)

`motion` (v12.x, React 19-compatible) is the right and only animation runtime you
need. Formerly Framer Motion; import from `motion/react`.

**Provider — wire the reduced-motion gate once, keep the bundle small.**
`MotionConfig reducedMotion="user"` auto-disables transform/layout animation when
the OS requests it (keeps opacity), satisfying the non-negotiable gate.
`LazyMotion` + `domAnimation` keeps the runtime ~5kb.

```tsx
// src/lib/motion.tsx
import { LazyMotion, domAnimation, MotionConfig } from "motion/react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
// use <m.div> (not <motion.div>) under LazyMotion strict mode
export { m } from "motion/react";
```

**Staggered hero reveal (design-system §6: fade + 12–16px rise, 60–80ms stagger).**
```tsx
const reveal = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
};
// <m.h1 variants={reveal} initial="hidden" animate="show" custom={0} />
```

**Scroll reveal (subtle, once):**
```tsx
<m.section
  variants={reveal} initial="hidden"
  whileInView="show" viewport={{ once: true, margin: "-10% 0px" }}
/>
```
Rules: micro-interactions 150–300ms `ease-out`; color/opacity/transform only;
**no scale shift on button hover** (design-system §5 button spec).

**On GSAP:** as of **30 Apr 2025 GSAP is 100% free incl. all former Club plugins**
(SplitText, MorphSVG, ScrollTrigger) after Webflow acquired GreenSock. Tempting,
but **do not dual-ship two animation libraries.** Motion covers the calm direction.
Only consider GSAP for a *single* signature effect (e.g. a MorphSVG logo reveal),
and even then weigh it against just doing it in Motion.

---

## 3. CSS-first motion — for the simple cases (no JS)

design-system §6 says "CSS for simple cases." For Tailwind v4:

- **[`tw-animate-css`](https://github.com/Wombosvideo/tw-animate-css)** — the
  v4-native replacement for `tailwindcss-animate` (which doesn't support v4's
  CSS-first config; it's also what shadcn/ui now ships). Gives `animate-in`/
  `animate-out`, fade/slide/zoom presets, accordion utilities. Use for `Accordion`,
  `CartDrawer`, `MobileNav`, `Toast` enter/exit without pulling Motion into every
  primitive.
  ```css
  /* src/index.css */
  @import "tailwindcss";
  @import "tw-animate-css";
  ```

- **Native CSS scroll-driven reveals** (View Timeline) — zero-JS fade-ups with a
  built-in progressive-enhancement fallback:
  ```css
  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .reveal-up {
        animation: reveal-up linear both;
        animation-timeline: view();
        animation-range: entry 0% cover 30%;
      }
      @keyframes reveal-up {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: none; }
      }
    }
  }
  ```
  Reduced-motion users and unsupporting browsers simply see the final state.

---

## 4. SVG tooling — ship your own marks

For the interim **Bodoni "IMC MOTOR" wordmark** (design-system §8), the
`<Placeholder>` system, and any custom glyphs (e.g. a scooter mark):

- **[`vite-plugin-svgr`](https://www.npmjs.com/package/vite-plugin-svgr)** — import
  any SVG as a typed React component and theme it via `currentColor`. Runs SVGO to
  optimize. Usage: `import Logo from "./logo.svg?react"`.
  ```ts
  // vite.config.ts
  import svgr from "vite-plugin-svgr";
  export default defineConfig({
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,                                   // scale to 1em
          replaceAttrValues: { "#000": "currentColor",
                               "#000000": "currentColor" },
        },
      }),
    ],
  });
  ```
  Keep source SVGs minimal (no inline `width/height`, single path where possible)
  so they scale and inherit color cleanly.

---

## 5. Texture & depth — the one tasteful addition

design-system §4 forbids gratuitous gradients/glows/glass; depth comes from
whitespace, scale, and 1px lines. The **one** on-trend, on-brand exception that fits
"occasional duotone-on-ink section for drama" (§7) is **subtle SVG film grain** —
tactile print-like depth without WebGL cost.

```tsx
// src/components/ui/Grain.tsx — absolute, low-opacity overlay for ink sections
export function Grain() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full
                                opacity-[0.05] mix-blend-overlay">
      <filter id="imc-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.8"
                      numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#imc-grain)" />
    </svg>
  );
}
```
Tune opacity (0.03–0.06) and `baseFrequency`. Generators if you'd rather author
visually: [fffuel nnnoise](https://www.fffuel.co/nnnoise/),
[uwarp nnnoise](https://www.uwarp.design/nnnoise).

**Repeatable SVG patterns** ([Hero Patterns](https://heropatterns.com),
[SVGBackgrounds](https://www.svgbackgrounds.com)) exist but mostly **skip** them —
a busy pattern fights gallery-calm. At most a barely-visible texture on
`--color-surface-sunken` wells.

---

## 6. Smooth scroll — optional, late, careful

[Lenis](https://lenis.darkroom.engineering) (`lenis`, ~3kb, import `lenis/react`)
is the 2026 industry standard for the "premium glide" editorial feel and pairs with
Motion's `useScroll`. **Caveats for this project:** hijacking native scroll has real
a11y/perf trade-offs and must hard-respect `prefers-reduced-motion`. Treat it as a
*try-on-real-content* enhancement near the end of Phase 1, not a foundation — it's
easy to add late. (Note: the old `@studio-freight/react-lenis` package is retired;
use `lenis`.)

---

## 7. Vector animation (Lottie / Rive) — skip at launch

[dotLottie](https://www.npmjs.com/package/@lottiefiles/dotlottie-react) (WASM, files
up to 80% smaller than legacy Lottie JSON) and [Rive](https://rive.app) are
excellent, but a calm, photo-led editorial site doesn't want mascot/illustration
motion — it undercuts the tone. Only worth it for a single animated logo reveal or
loading state, and Motion usually covers that. **Recommendation: skip for launch.**

---

## 8. Number / stat motion — for `StatStrip`

No new dependency needed — animate a Motion value:
```tsx
import { animate, useMotionValue, useTransform } from "motion/react";
// const mv = useMotionValue(0); animate(mv, 1200, { duration: 1.2, ease: "easeOut" });
// const text = useTransform(mv, (v) => Math.round(v).toLocaleString("hu-HU"));
// <m.span>{text}</m.span>
```
If you want typographically rolling digits, evaluate
[`@number-flow/react`](https://number-flow.barvian.me) — but check bundle cost first.

---

## 9. ⚠️ Brand logos & motorcycle imagery — not a library problem

Vespa / Aprilia / Moto Guzzi / Piaggio marks are trademarks — no free SVG library
legitimately provides them. design-system §8 is right: **set brand names in type,
not fake logos**, until official assets arrive via the dealer relationship. Avoid
flat illustration packs (unDraw etc.) — their cartoon-flat style clashes with the
high-contrast, photo-led editorial look.

---

## Sources

- Icons: [Lucide](https://lucide.dev) · [PkgPulse: Lucide vs Heroicons vs Phosphor 2026](https://www.pkgpulse.com/guides/lucide-vs-heroicons-vs-phosphor-react-icon-libraries-2026) · [allsvgicons: Best Free SVG Icon Libraries 2026](https://allsvgicons.com/blog/best-free-svg-icon-libraries-2026/)
- Motion: [Motion changelog](https://motion.dev/changelog) · [Framer Motion → Motion upgrade guide](https://motion.dev/docs/react-upgrade-guide)
- GSAP free: [Webflow: GSAP becomes free](https://webflow.com/blog/gsap-becomes-free) · [CSS-Tricks](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/)
- Tailwind v4 motion: [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) · [Tailwind animation docs](https://tailwindcss.com/docs/animation)
- SVG tooling: [vite-plugin-svgr](https://www.npmjs.com/package/vite-plugin-svgr) · [SVGR options](https://react-svgr.com/docs/options/)
- Texture: [fffuel nnnoise](https://www.fffuel.co/nnnoise/) · [Hero Patterns](https://heropatterns.com)
- Smooth scroll: [Lenis](https://lenis.darkroom.engineering) · [lenis GitHub](https://github.com/darkroomengineering/lenis)
- Vector animation: [dotlottie-react](https://www.npmjs.com/package/@lottiefiles/dotlottie-react) · [Lottie vs Rive](https://www.callstack.com/blog/lottie-vs-rive-optimizing-mobile-app-animation)
