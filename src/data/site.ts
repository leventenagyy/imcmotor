import type { Brand, OpeningHours } from './types'

/**
 * Company-wide facts. Single source of truth for contact details, hours, etc.
 * Edit here; the header, footer, contact page and SEO all read from this.
 * (Maps to Shopify shop settings / metafields later.)
 */
export const site = {
  name: 'IMC Motor',
  legalName: 'Importőr Motorcenter Kft.',
  tagline: 'Motorozz stílusosan – nálunk kezdődik a kaland!',
  intro:
    'Több mint 30 éve Magyarország egyik vezető olasz motorszakértője. Vespa, Aprilia, Moto Guzzi és Piaggio – értékesítés, szerviz, bérlés és kiegészítők egy helyen, Dunakeszin.',
  yearsInBusiness: 30,
  brands: ['Vespa', 'Aprilia', 'Moto Guzzi', 'Piaggio'] as Brand[],

  phone: { display: '+36 70 397 2543', href: 'tel:+36703972543' },
  email: {
    sales: 'szalon@imcmotor.hu',
    service: 'szerviz@imcmotor.hu',
  },

  address: {
    street: 'Kikerics köz 4.',
    postalCity: '2120 Dunakeszi',
    region: 'Pest vármegye',
    country: 'Magyarország',
    full: '2120 Dunakeszi, Kikerics köz 4.',
  },

  // Keyless Google Maps embed for the salon address (Contact page iframe).
  mapsEmbedUrl:
    'https://www.google.com/maps?q=2120%20Dunakeszi%2C%20Kikerics%20k%C3%B6z%204&output=embed',
  mapsLinkUrl: 'https://www.google.com/maps/search/?api=1&query=2120+Dunakeszi+Kikerics+köz+4',

  hours: [
    { day: 'Hétfő', hours: '09:00 – 18:00' },
    { day: 'Kedd', hours: '09:00 – 18:00' },
    { day: 'Szerda', hours: '09:00 – 18:00' },
    { day: 'Csütörtök', hours: '09:00 – 18:00' },
    { day: 'Péntek', hours: '09:00 – 18:00' },
    { day: 'Szombat', hours: '09:00 – 13:00' },
    { day: 'Vasárnap', hours: 'Zárva', closed: true },
  ] as OpeningHours[],

  // TODO: replace with the real brand profile URLs (the legacy site linked to
  // generic facebook.com / instagram.com — see overview §7).
  social: {
    facebook: '#',
    instagram: '#',
  },
} as const
