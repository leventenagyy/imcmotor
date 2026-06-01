import type { Collection } from './types'

/**
 * Collection metadata. Product membership is derived from each product's
 * `collections` field (see products.ts + lib helpers), so there is one source
 * of truth. Add a collection here, tag products with its handle, done.
 * (→ Shopify manual collections.)
 */
export const collections: Collection[] = [
  // --- Brand collections ---
  {
    id: 'col-vespa',
    handle: 'vespa',
    title: 'Vespa',
    excerpt: 'A városi ikon, stílusban.',
    descriptionHtml:
      '<p>1946 óta a városi szabadság szimbóluma. Időtlen forma, modern technika – a Primaverától a 946-ig.</p>',
    image: { src: null, alt: 'Vespa kollekció', ratio: '16/9' },
    kind: 'brand',
    brand: 'Vespa',
    inBrandMenu: true,
  },
  {
    id: 'col-aprilia',
    handle: 'aprilia',
    title: 'Aprilia',
    excerpt: 'Verseny-DNS az utcán.',
    descriptionHtml:
      '<p>A pályán edzett olasz sportmotorok – RS és Tuono családtól a városi SR GT robogókig.</p>',
    image: { src: null, alt: 'Aprilia kollekció', ratio: '16/9' },
    kind: 'brand',
    brand: 'Aprilia',
    inBrandMenu: true,
  },
  {
    id: 'col-moto-guzzi',
    handle: 'moto-guzzi',
    title: 'Moto Guzzi',
    excerpt: 'Mandellói örökség 1921 óta.',
    descriptionHtml:
      '<p>Jellegzetes keresztben fekvő V-motor, kézzel fogható örökség. V7, V85 TT és V100 Mandello.</p>',
    image: { src: null, alt: 'Moto Guzzi kollekció', ratio: '16/9' },
    kind: 'brand',
    brand: 'Moto Guzzi',
    inBrandMenu: true,
  },
  {
    id: 'col-piaggio',
    handle: 'piaggio',
    title: 'Piaggio',
    excerpt: 'Okos városi mobilitás.',
    descriptionHtml:
      '<p>Praktikus, megbízható robogók a mindennapokra – Liberty, Medley, a háromkerekű MP3 és az elektromos Piaggio 1.</p>',
    image: { src: null, alt: 'Piaggio kollekció', ratio: '16/9' },
    kind: 'brand',
    brand: 'Piaggio',
    inBrandMenu: true,
  },

  // --- Category collections ---
  {
    id: 'col-ujdonsagok',
    handle: 'ujdonsagok',
    title: 'Újdonságok – 2026',
    excerpt: 'A legfrissebb modellek és színek.',
    descriptionHtml: '<p>Az idei szezon új és frissített modelljei egy helyen.</p>',
    image: { src: null, alt: '2026-os újdonságok', ratio: '16/9' },
    kind: 'category',
  },
  {
    id: 'col-kiarusitas',
    handle: 'kiarusitas',
    title: 'Kiárusítás',
    excerpt: 'Kiemelt árú modellek, amíg a készlet tart.',
    descriptionHtml: '<p>Akciós motorok és robogók kedvezményes áron.</p>',
    image: { src: null, alt: 'Kiárusítás', ratio: '16/9' },
    kind: 'category',
  },
  {
    id: 'col-b125',
    handle: 'b125',
    title: 'B125 – A1 kategória',
    excerpt: 'B jogosítvánnyal is vezethető 125-ösök.',
    descriptionHtml:
      '<p>125 cm³-es modellek, amelyek megfelelő feltételekkel B kategóriás jogosítvánnyal is vezethetők.</p>',
    image: { src: null, alt: 'B125 kategória', ratio: '16/9' },
    kind: 'category',
  },
  {
    id: 'col-kiegeszitok',
    handle: 'kiegeszitok',
    title: 'Kiegészítők',
    excerpt: 'Sisakok, kesztyűk, alkatrészek.',
    descriptionHtml:
      '<p>Bukósisakok, kesztyűk, Mistral kipufogók és márkaspecifikus kiegészítők.</p>',
    image: { src: null, alt: 'Kiegészítők', ratio: '16/9' },
    kind: 'category',
  },
  {
    id: 'col-hasznalt',
    handle: 'hasznalt-motorok',
    title: 'Használt motorok',
    excerpt: 'Ellenőrzött, megbízható használt motorok.',
    descriptionHtml:
      '<p>Beszámított és átvizsgált használt motorok, teljes dokumentációval.</p>',
    image: { src: null, alt: 'Használt motorok', ratio: '16/9' },
    kind: 'category',
  },
]
