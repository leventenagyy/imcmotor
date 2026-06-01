import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import type { CartItem } from '@/lib/cart'
import { formatHUF } from '@/lib/format'
import { Media } from '@/components/ui/Media'
import { QuantityStepper } from '@/components/ui'

export function CartLineItem({
  item,
  onQuantity,
  onRemove,
}: {
  item: CartItem
  onQuantity: (qty: number) => void
  onRemove: () => void
}) {
  return (
    <div className="flex gap-4">
      <Link
        to={`/termek/${item.productHandle}`}
        className="w-20 shrink-0 overflow-hidden rounded-md bg-sunken"
      >
        <Media image={{ src: item.imageSrc, alt: item.imageAlt, ratio: '1/1' }} />
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              to={`/termek/${item.productHandle}`}
              className="font-display text-base leading-tight text-ink transition-colors hover:text-accent"
            >
              {item.title}
            </Link>
            <p className="text-xs text-stone">{item.variantTitle}</p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Tétel eltávolítása"
            className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center text-stone transition-colors hover:text-danger"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <QuantityStepper value={item.quantity} onChange={onQuantity} />
          <span className="text-sm font-medium tabular-nums">
            {formatHUF(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  )
}
