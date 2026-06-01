import type { Brand, NavLink } from './types'

/**
 * Navigation model. The header shows a "Modellek" mega-menu (the 4 brands +
 * shopping categories) plus a few top-level links. Footer columns below.
 * Edit labels/links here — header & footer render from this.
 */

export interface BrandMenu {
  brand: Brand
  to: string
  tagline: string
  models: NavLink[] // link to product detail pages (/termek/:handle)
}

export const brandMenus: BrandMenu[] = [
  {
    brand: 'Vespa',
    to: '/vespa',
    tagline: 'A városi ikon, stílusban',
    models: [
      { label: 'Primavera 125', to: '/termek/vespa-primavera-125' },
      { label: 'Sprint 125', to: '/termek/vespa-sprint-125' },
      { label: 'GTS 300 Super', to: '/termek/vespa-gts-300-super' },
      { label: '946 10° Anniversario', to: '/termek/vespa-946-10-anniversario' },
    ],
  },
  {
    brand: 'Aprilia',
    to: '/aprilia',
    tagline: 'Verseny-DNS az utcán',
    models: [
      { label: 'RS 660', to: '/termek/aprilia-rs-660' },
      { label: 'Tuono 660', to: '/termek/aprilia-tuono-660' },
      { label: 'SR GT 200', to: '/termek/aprilia-sr-gt-200' },
      { label: 'RX 125', to: '/termek/aprilia-rx-125' },
    ],
  },
  {
    brand: 'Moto Guzzi',
    to: '/moto-guzzi',
    tagline: 'Mandellói örökség 1921 óta',
    models: [
      { label: 'V7 Stone', to: '/termek/moto-guzzi-v7-stone' },
      { label: 'V85 TT', to: '/termek/moto-guzzi-v85-tt' },
      { label: 'V100 Mandello', to: '/termek/moto-guzzi-v100-mandello' },
    ],
  },
  {
    brand: 'Piaggio',
    to: '/piaggio',
    tagline: 'Okos városi mobilitás',
    models: [
      { label: 'Liberty 125', to: '/termek/piaggio-liberty-125' },
      { label: 'Medley 125', to: '/termek/piaggio-medley-125' },
      { label: 'MP3 400', to: '/termek/piaggio-mp3-400' },
      { label: 'Piaggio 1 (elektromos)', to: '/termek/piaggio-1-electric' },
    ],
  },
]

/** Shopping categories shown in the mega-menu and used across the site. */
export const categoryLinks: NavLink[] = [
  { label: 'Újdonságok – 2026', to: '/ujdonsagok' },
  { label: 'Kiárusítás', to: '/kiarusitas' },
  { label: 'B125 (A1 jogosítvány)', to: '/b125' },
  { label: 'Kiegészítők', to: '/kiegeszitok' },
  { label: 'Használt motorok', to: '/hasznalt-motorok' },
]

/** Top-level header links (besides the "Modellek" mega-menu trigger). */
export const primaryNav: NavLink[] = [
  { label: 'Szerviz', to: '/szerviz' },
  { label: 'Bérlés', to: '/berles' },
  { label: 'Hírek', to: '/hirek' },
  { label: 'Kapcsolat', to: '/kapcsolat' },
]

export interface FooterColumn {
  title: string
  links: NavLink[]
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Modellek',
    links: [
      { label: 'Vespa', to: '/vespa' },
      { label: 'Aprilia', to: '/aprilia' },
      { label: 'Moto Guzzi', to: '/moto-guzzi' },
      { label: 'Piaggio', to: '/piaggio' },
    ],
  },
  {
    title: 'Vásárlás',
    links: [
      { label: 'Újdonságok', to: '/ujdonsagok' },
      { label: 'Kiárusítás', to: '/kiarusitas' },
      { label: 'Kiegészítők', to: '/kiegeszitok' },
      { label: 'Használt motorok', to: '/hasznalt-motorok' },
      { label: 'Bérlés / Teszt', to: '/berles' },
    ],
  },
  {
    title: 'Szolgáltatás',
    links: [
      { label: 'Szerviz', to: '/szerviz' },
      { label: 'Időpontfoglalás', to: '/szerviz/foglalas' },
      { label: 'Finanszírozás', to: '/finanszirozas' },
      { label: 'Kiterjesztett garancia', to: '/garancia' },
      { label: 'Motorhotel', to: '/motorhotel' },
    ],
  },
  {
    title: 'Információ',
    links: [
      { label: 'Kapcsolat', to: '/kapcsolat' },
      { label: 'ÁSZF', to: '/info/aszf' },
      { label: 'Adatkezelés', to: '/info/adatkezeles' },
      { label: 'Fizetés', to: '/info/fizetes' },
      { label: 'Szállítás', to: '/info/szallitas' },
    ],
  },
]
