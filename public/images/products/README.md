# Product photos — drop them here

One folder per product **handle**, with master photos named `<handle>-NN.<ext>`
(`01`, `02`, … in the same order as the `images[]` array in
[`src/data/products.ts`](../../../src/data/products.ts) — the Hungarian `alt`
text tells you which angle is which: `oldalnézet` = side = `01`).

```
public/images/products/
└─ vespa-primavera-125/
   ├─ vespa-primavera-125-01.jpg   (side / oldalnézet → main)
   ├─ vespa-primavera-125-02.jpg
   └─ vespa-primavera-125-03.jpg
```

**Then run:** `npm run images` — converts masters to responsive WebP
(`-640/-1024/-1600.webp` + a fallback `.webp`), padded onto a clean white canvas
at the right ratio (4:5 bikes, 1:1 accessories). It never upscales, so use the
highest-res masters you have (2000px+ ideal). After that, the photos get wired
into `products.ts` (replacing `src: null`).

Masters (`.jpg/.png`) can be deleted after conversion or kept in a separate
`assets-source/` folder; only the `.webp` files are served.

## Handles (folder names)

**Bikes (4:5):** `vespa-primavera-125`, `vespa-sprint-125`, `vespa-gts-300-super`,
`vespa-946-10-anniversario`, `aprilia-rs-660`, `aprilia-tuono-660`,
`aprilia-sr-gt-200`, `aprilia-rx-125`, `moto-guzzi-v7-stone`, `moto-guzzi-v85-tt`,
`moto-guzzi-v100-mandello`, `piaggio-liberty-125`, `piaggio-medley-125`,
`piaggio-mp3-400`, `piaggio-1-electric`

**Used (4:5, shoot in-house):** `hasznalt-vespa-gts-300`, `hasznalt-moto-guzzi-v7`

**Accessories (1:1):** `integralt-bukosisak-premium`, `motoros-kesztyu-touring`,
`mistral-kipufogo-v7`

> Any product without a photo keeps rendering the clean placeholder — partial
> rollout is fine, no broken state.
