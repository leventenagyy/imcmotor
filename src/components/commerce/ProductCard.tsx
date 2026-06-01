import { Link } from 'react-router-dom'
import type { Product } from '@/data'
import { getCompareAtRange, getPriceRange, isOnSale, isSoldOut } from '@/data'
import { formatFromPrice } from '@/lib/format'
import { Media } from '@/components/ui/Media'
import { Price, Tag } from '@/components/ui'

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const range = getPriceRange(product)
  const compare = getCompareAtRange(product)
  const onSale = isOnSale(product)
  const soldOut = isSoldOut(product)
  const singlePrice = range.min === range.max

  return (
    <Link to={`/termek/${product.handle}`} className="group block">
      <div className="relative overflow-hidden rounded-md bg-sunken">
        <Media
          image={product.images[0]}
          priority={priority}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {onSale ? <Tag tone="accent">Akció</Tag> : null}
          {soldOut ? <Tag tone="default">Elfogyott</Tag> : null}
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <p className="t-eyebrow text-stone">{product.vendor}</p>
        <h3 className="font-display text-lg leading-tight text-ink transition-colors group-hover:text-accent">
          {product.title}
        </h3>
        <p className="line-clamp-1 text-sm text-stone">{product.excerpt}</p>
        <div className="pt-1">
          {singlePrice ? (
            <Price amount={range.min} compareAt={compare?.min} />
          ) : (
            <span className="text-base font-medium tabular-nums">{formatFromPrice(product)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
