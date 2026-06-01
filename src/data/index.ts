/**
 * Data access layer. Components import from here, never reach into raw arrays.
 * These pure selectors are the seam where mock data → real/Shopify data later
 * (swap the imports/implementations, keep the function signatures).
 */
import { products } from './products'
import { collections } from './collections'
import type { Collection, Product, Variant } from './types'

export { products } from './products'
export { collections } from './collections'
export { site } from './site'
export { newsPosts } from './news'
export { homeContent } from './home'
export {
  servicePromo,
  servicePriceList,
  priceListValidFrom,
  serviceIntro,
  bookableServices,
} from './services'
export {
  brandMenus,
  categoryLinks,
  primaryNav,
  footerColumns,
} from './navigation'
export * from './types'

// --- Product selectors ---

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle)
}

export function getProductsByCollection(collectionHandle: string): Product[] {
  return products.filter((p) => p.collections.includes(collectionHandle))
}

export function getFeaturedProducts(handles?: string[]): Product[] {
  if (handles && handles.length) {
    return handles
      .map((h) => getProductByHandle(h))
      .filter((p): p is Product => Boolean(p))
  }
  return products.filter((p) => p.featured)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.handle !== product.handle && p.vendor === product.vendor)
    .slice(0, limit)
}

// --- Collection selectors ---

export function getCollectionByHandle(handle: string): Collection | undefined {
  return collections.find((c) => c.handle === handle)
}

export function getBrandCollections(): Collection[] {
  return collections.filter((c) => c.kind === 'brand')
}

// --- Price helpers (pure; formatting lives in lib/format) ---

export interface PriceRange {
  min: number
  max: number
}

export function getPriceRange(product: Product): PriceRange {
  const prices = product.variants.map((v) => v.price)
  return { min: Math.min(...prices), max: Math.max(...prices) }
}

export function getCompareAtRange(product: Product): PriceRange | null {
  const compares = product.variants
    .map((v) => v.compareAtPrice)
    .filter((p): p is number => typeof p === 'number')
  if (!compares.length) return null
  return { min: Math.min(...compares), max: Math.max(...compares) }
}

export function isOnSale(product: Product): boolean {
  return product.variants.some(
    (v) => typeof v.compareAtPrice === 'number' && v.compareAtPrice > v.price,
  )
}

export function isSoldOut(product: Product): boolean {
  return product.variants.every((v) => !v.availableForSale)
}

/** Resolve the active variant from selected option values. */
export function findVariant(
  product: Product,
  selected: Record<string, string>,
): Variant | undefined {
  return product.variants.find((v) =>
    v.selectedOptions.every((o) => selected[o.name] === o.value),
  )
}
