/**
 * Data shapes — deliberately aligned to Shopify so the later migration is
 * mechanical. See docs/PRD.md §13 and docs/shopify-mapping.md.
 *
 * Rule of thumb: components consume these types; to swap mock → real (or
 * Shopify) data you replace the data files, not the components.
 */

export type CurrencyCode = 'HUF'

export type AspectRatio = '4/5' | '16/9' | '3/4' | '3/2' | '1/1'

/** Image. `src: null` => render the disciplined <Placeholder> (see design-system §8). */
export interface ProductImage {
  src: string | null
  alt: string
  ratio?: AspectRatio
  /** Optional responsive candidates ("…-640.webp 640w, …-1024.webp 1024w"). */
  srcset?: string
  /** Optional sizes hint; component prop overrides this. */
  sizes?: string
}

export interface ProductOption {
  name: string // e.g. "Szín", "Méret"
  values: string[]
}

export interface SelectedOption {
  name: string
  value: string
}

/** → Shopify ProductVariant */
export interface Variant {
  id: string
  title: string
  sku: string
  price: number // in HUF, integer (no decimals for Ft)
  compareAtPrice?: number // original price if on sale
  availableForSale: boolean
  selectedOptions: SelectedOption[]
  imageSrc?: string | null
}

export type Brand = 'Vespa' | 'Aprilia' | 'Moto Guzzi' | 'Piaggio' | 'IMC Motor'

export interface SpecItem {
  label: string
  value: string
}

/** → Shopify Product */
export interface Product {
  id: string
  handle: string
  title: string
  vendor: Brand // → product.vendor
  productType: string // e.g. "Robogó", "Sport", "Túra", "Kiegészítő"
  tags: string[]
  excerpt: string // one-line hook (brand voice: feeling first)
  descriptionHtml: string
  featured: boolean
  status: 'active' | 'draft'
  images: ProductImage[]
  options: ProductOption[]
  variants: Variant[]
  specs: SpecItem[]
  collections: string[] // collection handles this product belongs to
  currencyCode: CurrencyCode
}

export type CollectionKind = 'brand' | 'category' | 'curated'

/** → Shopify Collection (manual). Membership is derived from product.collections. */
export interface Collection {
  id: string
  handle: string
  title: string
  excerpt: string
  descriptionHtml: string
  image: ProductImage
  kind: CollectionKind
  brand?: Brand
  /** Show this collection in the brands mega-menu? */
  inBrandMenu?: boolean
}

export interface NavLink {
  label: string
  to: string
}

export interface OpeningHours {
  day: string
  hours: string
  closed?: boolean
}

export interface NewsPost {
  slug: string
  title: string
  excerpt: string
  date: string // "2026. május 12."
  category: string
  image: ProductImage
  bodyHtml: string
}

export interface ServicePriceRow {
  label: string
  price: string // kept as display string incl. "+ ÁFA" per source price list
  note?: string
}

export interface ServicePromo {
  active: boolean
  title: string
  body: string
  validUntil: string // "2026. március 13."
}

/** A bookable service type for the scheduled-booking flow (front-end mock). */
export interface BookableService {
  id: string
  label: string
  description: string
  /** rough duration in minutes, drives the mock slot picker */
  durationMin: number
}
