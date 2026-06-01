# docs/ — Planning & reference

Why this folder exists: it holds the **thinking** behind the build (requirements,
visual language, voice) separately from the **code**. Read these before changing
anything substantial. Start with the PRD.

| File | What it is | Read when |
|---|---|---|
| [PRD.md](./PRD.md) | Product Requirements — scope, pages, features, architecture, phases, open questions. **The contract.** | Before any build work or scope change |
| [design-system.md](./design-system.md) | Visual language — colors, type, spacing, components, motion, a11y. Mirrors the code's design tokens. | Building/altering any UI |
| [brand-voice.md](./brand-voice.md) | How IMC Motor sounds (Hungarian). CTAs, microcopy, formatting. | Writing/editing any copy |
| [content-editing.md](./content-editing.md) | Non-developer guide to editing products/prices/copy | Editing `src/data/*` content |
| [shopify-mapping.md](./shopify-mapping.md) | Field-by-field data → Shopify map | Migration / data shape changes |
| [assets-motion-research.md](./assets-motion-research.md) | Icon/motion/SVG/texture libraries + snippets | Adding icons/animation/assets |

**Status:** Brand decisions confirmed; **Phase 0 + Phase 1 built** (see
[PRD §15](./PRD.md)). The app lives in `../src`; quickstart in
[`../README.md`](../README.md).

Source brief lives one level up: [`../imcmotor-website-overview.md`](../imcmotor-website-overview.md).
The root [`../CLAUDE.md`](../CLAUDE.md) is the navigation index for the whole project.
