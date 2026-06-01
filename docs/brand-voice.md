# IMC Motor — Brand Voice & Copy Guide

> How IMC Motor sounds in writing. All site copy is **Hungarian** at launch.
> This guide governs microcopy, headings, product blurbs, buttons, errors, and
> booking flows. When writing or editing copy anywhere in the project, follow
> this. Per-folder `README.md` files repeat the short version locally.

**Status:** Draft v0.1 — refine with the client's real tone once reviewed.

---

## 1. Who is speaking

A **30+ year Italian-motorcycle specialist** salon in Dunakeszi. Authorized
dealer for Vespa, Aprilia, Moto Guzzi, Piaggio, plus a full service workshop.
The voice is that of a trusted, expert friend who genuinely loves these
machines — knowledgeable, warm, never pushy, never salesy-cheesy.

**Tagline (existing):** _"Motorozz stílusosan – nálunk kezdődik a kaland!"_
("Ride in style — the adventure starts here!")

---

## 2. Voice principles

| We are | We are not |
|---|---|
| Confident, calm, expert | Hype-y, exclamation-spammy |
| Warm, human, personal | Corporate, stiff, generic |
| Precise (specs, prices, facts) | Vague, hand-wavy |
| Italian-proud, stylish | Kitschy, cliché ("bella!") |
| Helpful & advisory | Pushy, pressure-selling |

**Tone sliders** (where we land): Formal `[---o--]` Casual ·
Playful `[----o-]` Serious · Premium `[o-----]` Budget.
Net: *premium, lightly warm, mostly serious*.

---

## 3. Hungarian language rules

- **Address the customer with "te"/"-sz"** (informal, friendly) — ✅ confirmed.
  Fits the enthusiast community and the existing tagline ("Motorozz…"). Be
  consistent; **never** mix with formal "Ön".
- Natural, modern Hungarian. Keep established motoros terms
  (robogó, motor, szerviz, műszaki vizsga, eredetvizsga, bérlés, teszt).
- Keep brand & model names in their **original form** (Vespa Primavera 125,
  Moto Guzzi V7, Aprilia Tuono 660) — never translate or decline awkwardly.
- **Prices:** Hungarian format — `1 290 000 Ft` (non-breaking space as thousands
  separator, "Ft" suffix). Note VAT where relevant ("bruttó" / "+ÁFA"); the
  service price list is stated `+ ÁFA` as in the source.
- **Dates:** `2026. március 13.` format.
- Correct accents always (ő ű á é í ó ö ú ü). No accent-stripping.

---

## 4. Capitalization & punctuation

- Sentence case for headings (Hungarian doesn't title-case like English).
- **Eyebrow labels** may be UPPERCASE for editorial rhythm (e.g. `ÚJDONSÁGOK`).
- One idea per sentence. Short. Avoid exclamation inflation — the tagline earns
  one; most CTAs don't need any.
- Use proper typographic quotes „magyar idézőjel" where natural.

---

## 5. CTAs & buttons (Hungarian patterns)

Verb-first, concrete, no fluff:
- `Kosárba` (Add to cart) · `Megnézem` (View) · `Időpontot foglalok`
  (Book a slot) · `Tovább a pénztárhoz` (Continue to checkout) ·
  `Próbamotort foglalok` (Book a test ride) · `Felhívom` (Call) ·
  `Ajánlatot kérek` (Request a quote) · `Feliratkozom` (Subscribe).
- Avoid generic `Kattints ide` / `Submit`. Say what happens.

---

## 6. Microcopy & states

- **Empty cart:** "A kosarad még üres. Nézz körül a modellek között." + CTA.
- **Form errors:** specific, near the field — "Add meg a telefonszámod, hogy
  vissza tudjunk hívni." Never just "Hiba történt."
- **Booking confirmation (mock):** make clear it's a request, not a guaranteed
  booking — "Foglalási kérésedet rögzítettük. Munkatársunk visszaigazolja az
  időpontot." (front-end only; no real backend yet).
- **Stock:** `Raktáron` / `Rendelhető` / `Elfogyott`.
- **Loading:** quiet, no jokey spinners. Skeletons preferred.

---

## 7. Product & editorial copy

- Lead with the feeling, support with the spec. One-line hook, then facts.
- Product blurbs: 1–2 sentences of character + a tight spec list
  (kategória, kivitel, szín, ár). Don't bury the price.
- Service/booking copy: reassuring and precise (what happens, what it costs,
  when they'll hear back). Repairs only after customer approval — say so.
- Honesty: don't invent reviews, awards, stats, or stock numbers in placeholder
  content. Mark mock data as mock in code comments, never as fake social proof
  in the UI.

---

## 8. Quick do / don't

✅ "Vespa Primavera 125 — a városi klasszikus, most 2026-os színekben."
❌ "A LEGJOBB robogó AMIT VALAHA LÁTTÁL!!! 🔥 Kattints MOST!"

✅ "Időpontot foglalok" → opens the scheduled booking flow.
❌ "Submit" / "Küldés" with no context.

✅ `1 290 000 Ft` · `2026. március 13.`
❌ `1290000ft` · `03/13/2026`
