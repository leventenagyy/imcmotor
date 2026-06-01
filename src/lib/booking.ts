/**
 * Mock scheduled-booking helpers. NO real availability — slots are generated
 * from the shop's opening hours so the UI feels real. See docs/PRD.md §9.2.
 */

// Opening hours by weekday (0 = Sunday … 6 = Saturday).
const HOURS: Record<number, { open: number; close: number } | null> = {
  0: null, // Vasárnap – zárva
  1: { open: 9, close: 18 },
  2: { open: 9, close: 18 },
  3: { open: 9, close: 18 },
  4: { open: 9, close: 18 },
  5: { open: 9, close: 18 },
  6: { open: 9, close: 13 }, // Szombat
}

const SLOT_MINUTES = 30

export function isClosedDay(date: Date): boolean {
  return HOURS[date.getDay()] === null
}

export function isPastDay(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d < today
}

export function isSelectableDay(date: Date): boolean {
  return !isClosedDay(date) && !isPastDay(date)
}

/** Returns slot strings like "09:00", "09:30" … for a given day. */
export function generateSlots(date: Date): string[] {
  const window = HOURS[date.getDay()]
  if (!window) return []
  const slots: string[] = []
  for (let m = window.open * 60; m + SLOT_MINUTES <= window.close * 60; m += SLOT_MINUTES) {
    const h = Math.floor(m / 60)
    const min = m % 60
    slots.push(`${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`)
  }
  return slots
}

const MONTHS_HU = [
  'január', 'február', 'március', 'április', 'május', 'június',
  'július', 'augusztus', 'szeptember', 'október', 'november', 'december',
]
const DAYS_HU = ['vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat']

/** "2026. június 3., szerda" */
export function formatBookingDate(date: Date): string {
  return `${date.getFullYear()}. ${MONTHS_HU[date.getMonth()]} ${date.getDate()}., ${DAYS_HU[date.getDay()]}`
}

/** Generate a mock booking reference, e.g. "IMC-7F3A2". */
export function makeBookingReference(seed: number): string {
  const base = Math.abs(seed).toString(36).toUpperCase().padStart(5, '0').slice(-5)
  return `IMC-${base}`
}
