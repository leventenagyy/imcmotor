import type { Product, Variant } from './types'

/**
 * Mock product catalog. Representative placeholder data — swap for real /
 * Shopify data later without touching components (shapes in types.ts).
 *
 * Editing tips (see docs/content-editing.md):
 *  - `handle` is the URL slug: /termek/<handle>. Keep it unique + lowercase.
 *  - prices are integers in HUF. `compareAtPrice` = original (shows as sale).
 *  - `collections` lists the collection handles a product appears in.
 *  - `images[].src: null` renders the placeholder; drop a real URL to swap.
 */

// Helper: build single-option variants (keeps the catalog readable + DRY).
function variants(
  handleBase: string,
  optionName: string,
  values: string[],
  price: number,
  opts: { compareAtPrice?: number; soldOut?: string[] } = {},
): Variant[] {
  return values.map((value, i) => ({
    id: `${handleBase}-v${i + 1}`,
    title: value,
    sku: `${handleBase.toUpperCase().replace(/-/g, '')}-${i + 1}`,
    price,
    compareAtPrice: opts.compareAtPrice,
    availableForSale: !(opts.soldOut ?? []).includes(value),
    selectedOptions: [{ name: optionName, value }],
  }))
}

// Real product photos live in public/images/products/<handle>/ as optimized
// WebP (run `npm run images`). Base-path aware for GitHub Pages.
// IMG_V busts browser/CDN cache when an image is replaced under the same name —
// bump it whenever you re-run the optimizer on existing photos.
const IMG_V = 2
const img = (handle: string, n: number): string =>
  `${import.meta.env.BASE_URL}images/products/${handle}/${handle}-${String(n).padStart(2, '0')}.webp?v=${IMG_V}`

export const products: Product[] = [
  // ============================ VESPA ============================
  {
    id: 'p-vespa-primavera-125',
    handle: 'vespa-primavera-125',
    title: 'Vespa Primavera 125',
    vendor: 'Vespa',
    productType: 'Robogó',
    tags: ['vespa', '125', 'robogó', 'város'],
    excerpt: 'A városi klasszikus – elegáns, könnyed, időtlen.',
    descriptionHtml:
      '<p>A Primavera a Vespa esszenciája modern formában: kifinomult vonalak, kényelmes vezethetőség és a jól ismert acél karosszéria. Tökéletes választás a stílusos városi közlekedéshez.</p>',
    featured: true,
    status: 'active',
    images: [
      { src: img('vespa-primavera-125', 1), alt: 'Vespa Primavera 125 – oldalnézet', ratio: '4/5' },
    ],
    options: [{ name: 'Szín', values: ['Bianco Innocenza', 'Verde Relax', 'Blu Incanto'] }],
    variants: variants('vespa-primavera-125', 'Szín', ['Bianco Innocenza', 'Verde Relax', 'Blu Incanto'], 1_890_000),
    specs: [
      { label: 'Hengerűrtartalom', value: '124 cm³' },
      { label: 'Teljesítmény', value: '11 LE' },
      { label: 'Jogosítvány', value: 'A1 / B (feltételekkel)' },
      { label: 'Önsúly', value: '129 kg' },
    ],
    collections: ['vespa', 'ujdonsagok', 'b125'],
    currencyCode: 'HUF',
  },
  {
    id: 'p-vespa-sprint-125',
    handle: 'vespa-sprint-125',
    title: 'Vespa Sprint 125',
    vendor: 'Vespa',
    productType: 'Robogó',
    tags: ['vespa', '125', 'robogó', 'sport'],
    excerpt: 'Sportosabb karakter, szögletes fényszóró, dinamikus stílus.',
    descriptionHtml:
      '<p>A Sprint a Primavera sportosabb testvére: jellegzetes szögletes fényszóró, feszesebb futómű és energikus megjelenés a fiatalos városi vezetéshez.</p>',
    featured: false,
    status: 'active',
    images: [
      { src: img('vespa-sprint-125', 1), alt: 'Vespa Sprint S 125 – oldalnézet', ratio: '4/5' },
    ],
    options: [{ name: 'Szín', values: ['Nero Convinto', 'Rosso Passione', 'Bianco'] }],
    variants: variants('vespa-sprint-125', 'Szín', ['Nero Convinto', 'Rosso Passione', 'Bianco'], 1_990_000),
    specs: [
      { label: 'Hengerűrtartalom', value: '124 cm³' },
      { label: 'Teljesítmény', value: '11 LE' },
      { label: 'Jogosítvány', value: 'A1 / B (feltételekkel)' },
      { label: 'Önsúly', value: '130 kg' },
    ],
    collections: ['vespa', 'b125'],
    currencyCode: 'HUF',
  },
  {
    id: 'p-vespa-gts-300-super',
    handle: 'vespa-gts-300-super',
    title: 'Vespa GTS 300 Super',
    vendor: 'Vespa',
    productType: 'Robogó',
    tags: ['vespa', '300', 'robogó', 'gts'],
    excerpt: 'A csúcs-Vespa: erő, kényelem és a legnagyobb utazótér.',
    descriptionHtml:
      '<p>A GTS 300 a Vespa-család zászlóshajója. 300 cm³-es motorjával magabiztos gyorsulás, kiváló utazókényelem és prémium felszereltség jellemzi – városon belül és kívül is.</p>',
    featured: false,
    status: 'active',
    images: [
      { src: img('vespa-gts-300-super', 1), alt: 'Vespa GTS 300 Super – sárga', ratio: '4/5' },
      { src: img('vespa-gts-300-super', 2), alt: 'Vespa GTS 300 Super – zöld', ratio: '4/5' },
    ],
    options: [{ name: 'Szín', values: ['Grigio Materia', 'Nero Vulcano', 'Rosso'] }],
    variants: variants('vespa-gts-300-super', 'Szín', ['Grigio Materia', 'Nero Vulcano', 'Rosso'], 3_290_000),
    specs: [
      { label: 'Hengerűrtartalom', value: '278 cm³' },
      { label: 'Teljesítmény', value: '23,8 LE' },
      { label: 'Jogosítvány', value: 'A2 / A' },
      { label: 'Önsúly', value: '159 kg' },
    ],
    collections: ['vespa'],
    currencyCode: 'HUF',
  },
  {
    id: 'p-vespa-946-10-anniversario',
    handle: 'vespa-946-10-anniversario',
    title: 'Vespa 946 10° Anniversario',
    vendor: 'Vespa',
    productType: 'Robogó',
    tags: ['vespa', '946', 'prémium', 'limitált'],
    excerpt: 'Kézműves remekmű – a Vespa legexkluzívabb darabja.',
    descriptionHtml:
      '<p>A 946 a Vespa formatervezésének csúcsa: kézi összeszerelés, prémium anyagok és gyűjtői megjelenés. Limitált évfordulós kiadás azoknak, akik a maximumot keresik.</p>',
    featured: true,
    status: 'active',
    images: [
      { src: img('vespa-946-10-anniversario', 1), alt: 'Vespa 946 10° Anniversario – oldalnézet', ratio: '4/5' },
    ],
    options: [{ name: 'Szín', values: ['Verde 946', 'Bronzo'] }],
    variants: variants('vespa-946-10-anniversario', 'Szín', ['Verde 946', 'Bronzo'], 6_990_000, { soldOut: ['Bronzo'] }),
    specs: [
      { label: 'Hengerűrtartalom', value: '278 cm³' },
      { label: 'Teljesítmény', value: '23,8 LE' },
      { label: 'Kivitel', value: 'Limitált, kézi összeszerelés' },
      { label: 'Jogosítvány', value: 'A2 / A' },
    ],
    collections: ['vespa', 'ujdonsagok'],
    currencyCode: 'HUF',
  },

  // ============================ APRILIA ============================
  {
    id: 'p-aprilia-rs-660',
    handle: 'aprilia-rs-660',
    title: 'Aprilia RS 660',
    vendor: 'Aprilia',
    productType: 'Sport',
    tags: ['aprilia', 'sport', '660'],
    excerpt: 'Verseny-DNS könnyű, kétszelepes csomagban.',
    descriptionHtml:
      '<p>Az RS 660 a modern olasz sportmotor: 100 LE feletti kéthengeres motor, fejlett elektronika és pályán is otthonosan mozgó alváz – mégis hétköznapi használatra kész.</p>',
    featured: true,
    status: 'active',
    images: [
      { src: null, alt: 'Aprilia RS 660 – oldalnézet', ratio: '4/5' },
      { src: null, alt: 'Aprilia RS 660 – idomburkolat', ratio: '4/5' },
      { src: null, alt: 'Aprilia RS 660 – műszerfal', ratio: '4/5' },
    ],
    options: [{ name: 'Szín', values: ['Apex Black', 'Lava Red', 'Iridium Grey'] }],
    variants: variants('aprilia-rs-660', 'Szín', ['Apex Black', 'Lava Red', 'Iridium Grey'], 4_590_000),
    specs: [
      { label: 'Hengerűrtartalom', value: '659 cm³' },
      { label: 'Teljesítmény', value: '100 LE' },
      { label: 'Jogosítvány', value: 'A' },
      { label: 'Önsúly', value: '183 kg' },
    ],
    collections: ['aprilia', 'ujdonsagok'],
    currencyCode: 'HUF',
  },
  {
    id: 'p-aprilia-tuono-660',
    handle: 'aprilia-tuono-660',
    title: 'Aprilia Tuono 660',
    vendor: 'Aprilia',
    productType: 'Naked',
    tags: ['aprilia', 'naked', '660'],
    excerpt: 'A sport öröme, naked egyenes kormánnyal.',
    descriptionHtml:
      '<p>A Tuono 660 az RS sportgénjeit hozza kényelmesebb, egyenes kormányos felépítésben. Energikus, könnyed és sokoldalú – tökéletes mindennapi sportmotor.</p>',
    featured: false,
    status: 'active',
    images: [
      { src: null, alt: 'Aprilia Tuono 660 – oldalnézet', ratio: '4/5' },
      { src: null, alt: 'Aprilia Tuono 660 – részlet', ratio: '4/5' },
    ],
    options: [{ name: 'Szín', values: ['Concept Black', 'Acid Gold'] }],
    variants: variants('aprilia-tuono-660', 'Szín', ['Concept Black', 'Acid Gold'], 4_690_000),
    specs: [
      { label: 'Hengerűrtartalom', value: '659 cm³' },
      { label: 'Teljesítmény', value: '95 LE' },
      { label: 'Jogosítvány', value: 'A' },
      { label: 'Önsúly', value: '183 kg' },
    ],
    collections: ['aprilia'],
    currencyCode: 'HUF',
  },
  {
    id: 'p-aprilia-sr-gt-200',
    handle: 'aprilia-sr-gt-200',
    title: 'Aprilia SR GT 200',
    vendor: 'Aprilia',
    productType: 'Robogó',
    tags: ['aprilia', 'robogó', '200', 'urban-adventure'],
    excerpt: 'Városi kalandrobogó sportos karakterrel.',
    descriptionHtml:
      '<p>Az SR GT 200 a város minden útviszonyára kész: magas üléspozíció, robusztus futómű és sportos megjelenés. Akciós áron, amíg a készlet tart.</p>',
    featured: false,
    status: 'active',
    images: [
      { src: null, alt: 'Aprilia SR GT 200 – oldalnézet', ratio: '4/5' },
      { src: null, alt: 'Aprilia SR GT 200 – részlet', ratio: '4/5' },
    ],
    options: [{ name: 'Szín', values: ['Gloom Black', 'Iguana Green'] }],
    variants: variants('aprilia-sr-gt-200', 'Szín', ['Gloom Black', 'Iguana Green'], 1_690_000, {
      compareAtPrice: 1_890_000,
    }),
    specs: [
      { label: 'Hengerűrtartalom', value: '174 cm³' },
      { label: 'Teljesítmény', value: '17,4 LE' },
      { label: 'Jogosítvány', value: 'A1 / A2 / A' },
      { label: 'Önsúly', value: '154 kg' },
    ],
    collections: ['aprilia', 'kiarusitas'],
    currencyCode: 'HUF',
  },
  {
    id: 'p-aprilia-rx-125',
    handle: 'aprilia-rx-125',
    title: 'Aprilia RX 125',
    vendor: 'Aprilia',
    productType: 'Enduro',
    tags: ['aprilia', '125', 'enduro'],
    excerpt: 'Supermoto-stílus, A1-es kategóriában.',
    descriptionHtml:
      '<p>Az RX 125 fiatalos enduro a városba és a könnyű terepre. Tökéletes belépő a motorozás világába A1-es jogosítvánnyal.</p>',
    featured: false,
    status: 'active',
    images: [
      { src: null, alt: 'Aprilia RX 125 – oldalnézet', ratio: '4/5' },
      { src: null, alt: 'Aprilia RX 125 – részlet', ratio: '4/5' },
    ],
    options: [{ name: 'Szín', values: ['Cangaru Brown', 'Pure Black'] }],
    variants: variants('aprilia-rx-125', 'Szín', ['Cangaru Brown', 'Pure Black'], 1_490_000),
    specs: [
      { label: 'Hengerűrtartalom', value: '124 cm³' },
      { label: 'Teljesítmény', value: '15 LE' },
      { label: 'Jogosítvány', value: 'A1 / B (feltételekkel)' },
      { label: 'Önsúly', value: '134 kg' },
    ],
    collections: ['aprilia', 'b125'],
    currencyCode: 'HUF',
  },

  // ============================ MOTO GUZZI ============================
  {
    id: 'p-moto-guzzi-v7-stone',
    handle: 'moto-guzzi-v7-stone',
    title: 'Moto Guzzi V7 Stone',
    vendor: 'Moto Guzzi',
    productType: 'Roadster',
    tags: ['moto-guzzi', 'roadster', 'klasszikus'],
    excerpt: 'Időtlen roadster, jellegzetes V-motorral.',
    descriptionHtml:
      '<p>A V7 Stone a Moto Guzzi örökségének mai megfogalmazása: keresztben fekvő V-kéthengeres, letisztult dizájn és magával ragadó vezetésélmény.</p>',
    featured: false,
    status: 'active',
    images: [
      { src: null, alt: 'Moto Guzzi V7 Stone – oldalnézet', ratio: '4/5' },
      { src: null, alt: 'Moto Guzzi V7 Stone – motor', ratio: '4/5' },
    ],
    options: [{ name: 'Szín', values: ['Nero Ruvido', 'Grigio Casto', 'Rosso Fiammante'] }],
    variants: variants('moto-guzzi-v7-stone', 'Szín', ['Nero Ruvido', 'Grigio Casto', 'Rosso Fiammante'], 3_990_000),
    specs: [
      { label: 'Hengerűrtartalom', value: '853 cm³' },
      { label: 'Teljesítmény', value: '65 LE' },
      { label: 'Jogosítvány', value: 'A' },
      { label: 'Önsúly', value: '218 kg' },
    ],
    collections: ['moto-guzzi'],
    currencyCode: 'HUF',
  },
  {
    id: 'p-moto-guzzi-v85-tt',
    handle: 'moto-guzzi-v85-tt',
    title: 'Moto Guzzi V85 TT',
    vendor: 'Moto Guzzi',
    productType: 'Túra',
    tags: ['moto-guzzi', 'túra', 'adventure'],
    excerpt: 'Klasszikus túraendúró a hosszú utakra.',
    descriptionHtml:
      '<p>A V85 TT a kaland és a klasszikus stílus találkozása: kényelmes túrázás, jellegzetes Guzzi karakter és sokoldalú használhatóság aszfalton és makadámon.</p>',
    featured: false,
    status: 'active',
    images: [
      { src: null, alt: 'Moto Guzzi V85 TT – oldalnézet', ratio: '4/5' },
      { src: null, alt: 'Moto Guzzi V85 TT – részlet', ratio: '4/5' },
    ],
    options: [{ name: 'Szín', values: ['Giallo Savana', 'Grigio Avanguardia', 'Nero'] }],
    variants: variants('moto-guzzi-v85-tt', 'Szín', ['Giallo Savana', 'Grigio Avanguardia', 'Nero'], 4_790_000),
    specs: [
      { label: 'Hengerűrtartalom', value: '853 cm³' },
      { label: 'Teljesítmény', value: '80 LE' },
      { label: 'Jogosítvány', value: 'A' },
      { label: 'Önsúly', value: '229 kg' },
    ],
    collections: ['moto-guzzi'],
    currencyCode: 'HUF',
  },
  {
    id: 'p-moto-guzzi-v100-mandello',
    handle: 'moto-guzzi-v100-mandello',
    title: 'Moto Guzzi V100 Mandello',
    vendor: 'Moto Guzzi',
    productType: 'Sport-túra',
    tags: ['moto-guzzi', 'sport-túra', 'újdonság'],
    excerpt: 'A jövő Guzzija – aktív aerodinamikával.',
    descriptionHtml:
      '<p>A V100 Mandello a márka új korszaka: folyadékhűtéses motor, aktív aerodinamika és modern elektronika, miközben megőrzi a Moto Guzzi karakterét.</p>',
    featured: true,
    status: 'active',
    images: [
      { src: null, alt: 'Moto Guzzi V100 Mandello – oldalnézet', ratio: '4/5' },
      { src: null, alt: 'Moto Guzzi V100 Mandello – aerodinamika', ratio: '4/5' },
      { src: null, alt: 'Moto Guzzi V100 Mandello – műszerfal', ratio: '4/5' },
    ],
    options: [{ name: 'Szín', values: ['Verde 2121', 'Rosso Magma', 'Grigio'] }],
    variants: variants('moto-guzzi-v100-mandello', 'Szín', ['Verde 2121', 'Rosso Magma', 'Grigio'], 6_290_000),
    specs: [
      { label: 'Hengerűrtartalom', value: '1042 cm³' },
      { label: 'Teljesítmény', value: '115 LE' },
      { label: 'Jogosítvány', value: 'A' },
      { label: 'Önsúly', value: '233 kg' },
    ],
    collections: ['moto-guzzi', 'ujdonsagok'],
    currencyCode: 'HUF',
  },

  // ============================ PIAGGIO ============================
  {
    id: 'p-piaggio-liberty-125',
    handle: 'piaggio-liberty-125',
    title: 'Piaggio Liberty 125',
    vendor: 'Piaggio',
    productType: 'Robogó',
    tags: ['piaggio', '125', 'robogó', 'nagykerék'],
    excerpt: 'Könnyű, praktikus nagykerekű városi robogó.',
    descriptionHtml:
      '<p>A Liberty 125 nagy átmérőjű kerekeivel magabiztos és kényelmes a város útjain. Alacsony fogyasztás, könnyű kezelhetőség – ideális mindennapi társ.</p>',
    featured: false,
    status: 'active',
    images: [
      { src: null, alt: 'Piaggio Liberty 125 – oldalnézet', ratio: '4/5' },
      { src: null, alt: 'Piaggio Liberty 125 – részlet', ratio: '4/5' },
    ],
    options: [{ name: 'Szín', values: ['Bianco Luna', 'Blu Oceano', 'Nero'] }],
    variants: variants('piaggio-liberty-125', 'Szín', ['Bianco Luna', 'Blu Oceano', 'Nero'], 1_190_000, {
      compareAtPrice: 1_290_000,
    }),
    specs: [
      { label: 'Hengerűrtartalom', value: '124 cm³' },
      { label: 'Teljesítmény', value: '11 LE' },
      { label: 'Jogosítvány', value: 'A1 / B (feltételekkel)' },
      { label: 'Önsúly', value: '116 kg' },
    ],
    collections: ['piaggio', 'b125', 'kiarusitas'],
    currencyCode: 'HUF',
  },
  {
    id: 'p-piaggio-medley-125',
    handle: 'piaggio-medley-125',
    title: 'Piaggio Medley 125',
    vendor: 'Piaggio',
    productType: 'Robogó',
    tags: ['piaggio', '125', 'robogó'],
    excerpt: 'Tágas, kényelmes és takarékos városi robogó.',
    descriptionHtml:
      '<p>A Medley 125 a praktikum csúcsa: nagy csomagtér a sisaknak, kényelmes ülés és kiváló fogyasztás. Mindennapi közlekedésre optimalizálva.</p>',
    featured: false,
    status: 'active',
    images: [
      { src: null, alt: 'Piaggio Medley 125 – oldalnézet', ratio: '4/5' },
      { src: null, alt: 'Piaggio Medley 125 – csomagtér', ratio: '4/5' },
    ],
    options: [{ name: 'Szín', values: ['Grigio Materia', 'Bianco', 'Blu'] }],
    variants: variants('piaggio-medley-125', 'Szín', ['Grigio Materia', 'Bianco', 'Blu'], 1_590_000),
    specs: [
      { label: 'Hengerűrtartalom', value: '124 cm³' },
      { label: 'Teljesítmény', value: '14 LE' },
      { label: 'Jogosítvány', value: 'A1 / B (feltételekkel)' },
      { label: 'Önsúly', value: '139 kg' },
    ],
    collections: ['piaggio', 'b125'],
    currencyCode: 'HUF',
  },
  {
    id: 'p-piaggio-mp3-400',
    handle: 'piaggio-mp3-400',
    title: 'Piaggio MP3 400',
    vendor: 'Piaggio',
    productType: 'Háromkerekű',
    tags: ['piaggio', 'mp3', 'háromkerekű', '400'],
    excerpt: 'Háromkerekű stabilitás, prémium komfort.',
    descriptionHtml:
      '<p>Az MP3 400 két első kerekével páratlan stabilitást kínál minden időben. Megfelelő feltételekkel B kategóriás jogosítvánnyal is vezethető.</p>',
    featured: false,
    status: 'active',
    images: [
      { src: null, alt: 'Piaggio MP3 400 – oldalnézet', ratio: '4/5' },
      { src: null, alt: 'Piaggio MP3 400 – első kerekek', ratio: '4/5' },
    ],
    options: [{ name: 'Szín', values: ['Grigio Titanio', 'Nero Opaco'] }],
    variants: variants('piaggio-mp3-400', 'Szín', ['Grigio Titanio', 'Nero Opaco'], 4_290_000),
    specs: [
      { label: 'Hengerűrtartalom', value: '399 cm³' },
      { label: 'Teljesítmény', value: '35,4 LE' },
      { label: 'Jogosítvány', value: 'A2 / A / B (feltételekkel)' },
      { label: 'Önsúly', value: '253 kg' },
    ],
    collections: ['piaggio'],
    currencyCode: 'HUF',
  },
  {
    id: 'p-piaggio-1-electric',
    handle: 'piaggio-1-electric',
    title: 'Piaggio 1 (elektromos)',
    vendor: 'Piaggio',
    productType: 'Elektromos robogó',
    tags: ['piaggio', 'elektromos', 'robogó', 'újdonság'],
    excerpt: 'Csendes, tiszta városi elektromos robogó.',
    descriptionHtml:
      '<p>A Piaggio 1 a városi elektromobilitás egyszerű, stílusos belépője. Kivehető akkumulátor, zéró kibocsátás és minimalista dizájn.</p>',
    featured: false,
    status: 'active',
    images: [
      { src: null, alt: 'Piaggio 1 elektromos robogó – oldalnézet', ratio: '4/5' },
      { src: null, alt: 'Piaggio 1 – akkumulátor', ratio: '4/5' },
    ],
    options: [{ name: 'Szín', values: ['Grigio', 'Verde', 'Azzurro'] }],
    variants: variants('piaggio-1-electric', 'Szín', ['Grigio', 'Verde', 'Azzurro'], 1_090_000),
    specs: [
      { label: 'Hajtás', value: 'Elektromos, kivehető akku' },
      { label: 'Végsebesség', value: '45 km/h (45-ös)' },
      { label: 'Jogosítvány', value: 'AM / B' },
      { label: 'Kategória', value: 'Robogó (elektromos)' },
    ],
    collections: ['piaggio', 'ujdonsagok'],
    currencyCode: 'HUF',
  },

  // ============================ KIEGÉSZÍTŐK ============================
  {
    id: 'p-sisak-premium',
    handle: 'integralt-bukosisak-premium',
    title: 'Integrált bukósisak – Prémium',
    vendor: 'IMC Motor',
    productType: 'Kiegészítő',
    tags: ['sisak', 'bukósisak', 'védőfelszerelés'],
    excerpt: 'Könnyű, jól szellőző integrált sisak napszemüveggel.',
    descriptionHtml:
      '<p>Prémium integrált bukósisak beépített napellenzővel, kiváló szellőzéssel és kényelmes béléssel. A biztonság és a stílus együtt.</p>',
    featured: false,
    status: 'active',
    images: [{ src: null, alt: 'Integrált bukósisak – prémium', ratio: '1/1' }],
    options: [{ name: 'Méret', values: ['S', 'M', 'L', 'XL'] }],
    variants: variants('integralt-bukosisak-premium', 'Méret', ['S', 'M', 'L', 'XL'], 89_900, { soldOut: ['S'] }),
    specs: [
      { label: 'Típus', value: 'Integrált (full-face)' },
      { label: 'Napellenző', value: 'Beépített' },
      { label: 'Minősítés', value: 'ECE 22.06' },
    ],
    collections: ['kiegeszitok'],
    currencyCode: 'HUF',
  },
  {
    id: 'p-kesztyu-touring',
    handle: 'motoros-kesztyu-touring',
    title: 'Motoros kesztyű – Touring',
    vendor: 'IMC Motor',
    productType: 'Kiegészítő',
    tags: ['kesztyű', 'védőfelszerelés', 'touring'],
    excerpt: 'Bőr-textil kesztyű protektorokkal, négy évszakra.',
    descriptionHtml:
      '<p>Kényelmes, légáteresztő touring kesztyű csukló- és ujjvédőkkel, érintőképernyő-kompatibilis ujjbeggyel.</p>',
    featured: false,
    status: 'active',
    images: [{ src: null, alt: 'Motoros kesztyű – touring', ratio: '1/1' }],
    options: [{ name: 'Méret', values: ['S', 'M', 'L', 'XL'] }],
    variants: variants('motoros-kesztyu-touring', 'Méret', ['S', 'M', 'L', 'XL'], 34_900),
    specs: [
      { label: 'Anyag', value: 'Bőr / textil' },
      { label: 'Protektor', value: 'Csukló + ujjperc' },
      { label: 'Extra', value: 'Touchscreen ujjbegy' },
    ],
    collections: ['kiegeszitok'],
    currencyCode: 'HUF',
  },
  {
    id: 'p-mistral-kipufogo-v7',
    handle: 'mistral-kipufogo-v7',
    title: 'Mistral kipufogó – Moto Guzzi V7',
    vendor: 'Moto Guzzi',
    productType: 'Kiegészítő',
    tags: ['mistral', 'kipufogó', 'moto-guzzi', 'v7'],
    excerpt: 'Olasz kézműves kipufogó mélyebb, telt hangképpel.',
    descriptionHtml:
      '<p>Mistral slip-on kipufogó Moto Guzzi V7 modellekhez: könnyebb tömeg, jellegzetes Guzzi hang és prémium kidolgozás. Beszereléssel kérhető.</p>',
    featured: false,
    status: 'active',
    images: [{ src: null, alt: 'Mistral kipufogó Moto Guzzi V7-hez', ratio: '1/1' }],
    options: [{ name: 'Kivitel', values: ['Inox', 'Fekete'] }],
    variants: variants('mistral-kipufogo-v7', 'Kivitel', ['Inox', 'Fekete'], 219_000),
    specs: [
      { label: 'Típus', value: 'Slip-on' },
      { label: 'Kompatibilitás', value: 'Moto Guzzi V7' },
      { label: 'Anyag', value: 'Rozsdamentes acél' },
    ],
    collections: ['kiegeszitok'],
    currencyCode: 'HUF',
  },

  // ============================ HASZNÁLT ============================
  {
    id: 'p-hasznalt-vespa-gts-300',
    handle: 'hasznalt-vespa-gts-300',
    title: 'Vespa GTS 300 (használt, 2022)',
    vendor: 'Vespa',
    productType: 'Használt',
    tags: ['használt', 'vespa', 'gts', '300'],
    excerpt: 'Megkímélt állapotú GTS 300, szervizkönyvvel.',
    descriptionHtml:
      '<p>2022-es Vespa GTS 300, alacsony futásteljesítménnyel, teljes szerviztörténettel. Átvizsgálva, garanciával beszámítható.</p>',
    featured: false,
    status: 'active',
    images: [
      { src: null, alt: 'Használt Vespa GTS 300', ratio: '4/5' },
      { src: null, alt: 'Használt Vespa GTS 300 – részlet', ratio: '4/5' },
    ],
    options: [{ name: 'Állapot', values: ['Megkímélt'] }],
    variants: variants('hasznalt-vespa-gts-300', 'Állapot', ['Megkímélt'], 2_290_000, { compareAtPrice: 2_690_000 }),
    specs: [
      { label: 'Évjárat', value: '2022' },
      { label: 'Futott', value: '6 400 km' },
      { label: 'Hengerűrtartalom', value: '278 cm³' },
      { label: 'Dokumentáció', value: 'Teljes szervizkönyv' },
    ],
    collections: ['hasznalt-motorok'],
    currencyCode: 'HUF',
  },
  {
    id: 'p-hasznalt-moto-guzzi-v7',
    handle: 'hasznalt-moto-guzzi-v7',
    title: 'Moto Guzzi V7 (használt, 2021)',
    vendor: 'Moto Guzzi',
    productType: 'Használt',
    tags: ['használt', 'moto-guzzi', 'v7'],
    excerpt: 'Klasszikus V7 roadster, kifogástalan állapotban.',
    descriptionHtml:
      '<p>2021-es Moto Guzzi V7, egy tulajdonostól, mindvégig márkaszervizben karbantartva. Azonnal vihető.</p>',
    featured: false,
    status: 'active',
    images: [
      { src: null, alt: 'Használt Moto Guzzi V7', ratio: '4/5' },
      { src: null, alt: 'Használt Moto Guzzi V7 – motor', ratio: '4/5' },
    ],
    options: [{ name: 'Állapot', values: ['Kifogástalan'] }],
    variants: variants('hasznalt-moto-guzzi-v7', 'Állapot', ['Kifogástalan'], 2_990_000),
    specs: [
      { label: 'Évjárat', value: '2021' },
      { label: 'Futott', value: '9 100 km' },
      { label: 'Hengerűrtartalom', value: '853 cm³' },
      { label: 'Dokumentáció', value: 'Márkaszerviz' },
    ],
    collections: ['hasznalt-motorok'],
    currencyCode: 'HUF',
  },
]
