# Content editing guide

How to change what the site shows **without touching components**. Everything
below lives in [`src/data/`](../src/data). After editing, run `npm run dev` to
preview. Keep the Hungarian [brand voice](./brand-voice.md) (informal "te",
prices like `1 290 000 Ft`).

> Tip: prices are plain integers in Hungarian forint, no spaces or "Ft" in the
> data — the site formats them. Write `1890000`, the site shows `1 890 000 Ft`.

## Change a price
Open `src/data/products.ts`, find the product, change the number passed to
`variants(...)`:
```ts
variants('vespa-primavera-125', 'Szín', ['Bianco', 'Verde', 'Blu'], 1_990_000)
//                                                                    ^ new price
```

## Put a product on sale
Add `compareAtPrice` (the original, higher price) — the card/PDP show a strike-
through and an "Akció" badge automatically:
```ts
variants('aprilia-sr-gt-200', 'Szín', ['Black', 'Green'], 1_690_000, {
  compareAtPrice: 1_890_000,
})
```
Also add the product to the `kiarusitas` collection (see below).

## Mark a colour/size sold out
```ts
variants('vespa-946-10-anniversario', 'Szín', ['Verde', 'Bronzo'], 6_990_000, {
  soldOut: ['Bronzo'],
})
```

## Add a product to a collection
Edit the product's `collections` array (values are collection handles):
```ts
collections: ['vespa', 'ujdonsagok', 'b125'],
```
Available handles are in `src/data/collections.ts`.

## Add a brand-new product
Copy an existing object in `products.ts`, then change `id`, `handle` (unique URL
slug), `title`, `vendor`, `productType`, `excerpt`, `descriptionHtml`, `specs`,
`options`/`variants`, and `collections`. The product appears automatically on its
collection pages and at `/termek/<handle>`.

## Swap a placeholder for a real photo
Images use `{ src: null, ... }` → placeholder. Set `src` to a real URL (or a file
in `public/`, referenced as `/kepek/...`):
```ts
images: [{ src: '/kepek/vespa-primavera.jpg', alt: 'Vespa Primavera 125', ratio: '4/5' }]
```
Always write a meaningful Hungarian `alt`.

## Edit the service promo / price list
`src/data/services.ts` → `servicePromo` (set `active: false` to hide), and
`servicePriceList` rows. Prices here are display strings incl. `+ ÁFA` (matching
the official list).

## Edit navigation / footer
`src/data/navigation.ts` — `brandMenus` (mega-menu models), `categoryLinks`,
`primaryNav` (top links), `footerColumns`.

## Edit company info / hours / contact
`src/data/site.ts` — phone, emails, address, opening hours, social links
(replace the `#` placeholders with the real Facebook/Instagram URLs).

## Edit the home page
`src/data/home.ts` — hero text/CTAs, the `featuredHandles` list (which products
appear in "Kiemelt ajánlataink"), the service band, used/rental split, newsletter.

## Add a news post
`src/data/news.ts` — copy an entry, set a unique `slug`, `title`, `date`,
`category`, `excerpt`, `bodyHtml`. It shows at `/hirek` and `/hirek/<slug>`.
