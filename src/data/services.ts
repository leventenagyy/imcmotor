import type { BookableService, ServicePriceRow, ServicePromo } from './types'

/**
 * Service content. Promo and price list are DATA (not hardcoded in JSX) so they
 * stay editable — fixing the legacy site's "promos baked into copy" problem
 * (overview §7). Prices kept verbatim from the source list, incl. "+ ÁFA".
 */

export const servicePromo: ServicePromo = {
  active: true,
  title: 'Tavaszi szerviz akció',
  body: '−10% az alkatrészekre, díjmentes átvétel és kiszállítás, ingyenes állapotfelmérés és gyors átfutás.',
  validUntil: '2026. március 13.',
}

/** Price list — valid from 2024.04.01 (per source). */
export const servicePriceList: ServicePriceRow[] = [
  { label: 'Szerviz óradíj – 50 cm³ alatt', price: '18 000 Ft + ÁFA', note: 'óradíj' },
  { label: 'Szerviz óradíj – 51–499 cm³', price: '20 000 Ft + ÁFA', note: 'óradíj' },
  { label: 'Szerviz óradíj – 500 cm³ felett', price: '25 000 Ft + ÁFA', note: 'óradíj' },
  { label: 'Diagnosztika', price: '12 000 Ft + ÁFA' },
  { label: 'Műszaki vizsga ügyintézés', price: '12 000 Ft + ÁFA' },
  { label: 'Eredetvizsga ügyintézés', price: '12 000 Ft + ÁFA' },
  { label: 'Okmányiroda ügyintézés', price: '18 000 Ft + ÁFA' },
]

export const priceListValidFrom = '2024. április 1.'

export const serviceIntro =
  'Teljes körű szerviz a Piaggio-csoport márkáira – Vespa, Aprilia, Moto Guzzi, Piaggio –, valamint további olasz és nemzetközi márkákra. Javítást kizárólag az ügyfél jóváhagyása után végzünk.'

/** Bookable service types for the scheduled-booking flow (front-end mock). */
export const bookableServices: BookableService[] = [
  { id: 'altalanos-szerviz', label: 'Általános szerviz / olajcsere', description: 'Időszakos karbantartás, folyadékok, átvizsgálás.', durationMin: 90 },
  { id: 'muszaki-vizsga', label: 'Műszaki vizsga ügyintézés', description: 'Felkészítés és teljes körű ügyintézés.', durationMin: 60 },
  { id: 'diagnosztika', label: 'Diagnosztika', description: 'Hibakeresés, elektronikai kivizsgálás.', durationMin: 60 },
  { id: 'gumiszereles', label: 'Gumiszerelés', description: 'Gumicsere, centírozás.', durationMin: 45 },
  { id: 'eredetvizsga', label: 'Eredetvizsga ügyintézés', description: 'Eredetiségvizsgálat ügyintézése.', durationMin: 45 },
]
