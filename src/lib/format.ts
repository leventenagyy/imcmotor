import type { Product } from '@/data'
import { getPriceRange } from '@/data'

/**
 * Hungarian formatting helpers. Currency follows the brand-voice rule:
 * "1 290 000 Ft" (space-grouped, Ft suffix). See docs/brand-voice.md §3.
 */

const hufFormatter = new Intl.NumberFormat('hu-HU', {
  style: 'currency',
  currency: 'HUF',
  maximumFractionDigits: 0,
})

export function formatHUF(amount: number): string {
  // Normalize NBSP variants to a regular space for consistent rendering.
  return hufFormatter.format(amount).replace(/ | /g, ' ')
}

/** "1 890 000 Ft" or "1 190 000 – 6 990 000 Ft" for a range. */
export function formatProductPrice(product: Product): string {
  const { min, max } = getPriceRange(product)
  if (min === max) return formatHUF(min)
  return `${formatHUF(min)} – ${formatHUF(max)}`
}

/** "tól" pricing for cards where a range exists. */
export function formatFromPrice(product: Product): string {
  const { min, max } = getPriceRange(product)
  return min === max ? formatHUF(min) : `${formatHUF(min)}-tól`
}
