import type { NewsPost } from './types'

/**
 * News / blog posts (mock). → Shopify Blog later.
 * Keep newest first. `image.src: null` renders the placeholder system.
 */
export const newsPosts: NewsPost[] = [
  {
    slug: '2026-os-ujdonsagok-erkeznek',
    title: 'Megérkeztek a 2026-os újdonságok',
    excerpt:
      'Friss színek és modellfrissítések a Vespa, Aprilia és Moto Guzzi kínálatában. Nézd meg élőben a szalonban.',
    date: '2026. május 12.',
    category: 'Újdonság',
    image: { src: null, alt: '2026-os modellek a szalonban', ratio: '3/2' },
    bodyHtml:
      '<p>Az idei szezonra több ikonikus modell is frissült. Keresd a 2026-os kollekciót a szalonban, vagy foglalj próbamotort online.</p>',
  },
  {
    slug: 'tavaszi-szerviz-akcio',
    title: 'Tavaszi szerviz akció: készülj fel a szezonra',
    excerpt:
      'Díjmentes állapotfelmérés, −10% az alkatrészekre és gyors átfutás. Foglalj időpontot néhány kattintással.',
    date: '2026. március 2.',
    category: 'Szerviz',
    image: { src: null, alt: 'Szerviz műhely', ratio: '3/2' },
    bodyHtml:
      '<p>A tavaszi akció keretében kedvezményesen készítjük fel motorodat a szezonra. Az akció 2026. március 13-ig érvényes.</p>',
  },
  {
    slug: 'vespa-80-evfordulo',
    title: 'A Vespa 80 éve – egy stílus, ami sosem öregszik',
    excerpt:
      'Nyolc évtized városi szabadság. Megnéztük, miért időtálló a világ legismertebb robogója.',
    date: '2026. február 18.',
    category: 'Történet',
    image: { src: null, alt: 'Klasszikus Vespa', ratio: '3/2' },
    bodyHtml:
      '<p>1946 óta a Vespa a városi mobilitás szimbóluma. Az évforduló alkalmából különleges kiadások is érkeznek.</p>',
  },
]
