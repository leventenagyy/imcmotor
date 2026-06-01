import type { Product } from '@/data'
import { cn } from '@/lib/cn'

export function VariantSelector({
  product,
  selected,
  onSelect,
}: {
  product: Product
  selected: Record<string, string>
  onSelect: (optionName: string, value: string) => void
}) {
  return (
    <div className="space-y-5">
      {product.options.map((opt) => (
        <div key={opt.name}>
          <p className="t-eyebrow mb-2.5 text-stone">
            {opt.name}: <span className="text-ink">{selected[opt.name]}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {opt.values.map((value) => {
              const active = selected[opt.name] === value
              const available = product.variants.some(
                (v) =>
                  v.selectedOptions.some((o) => o.name === opt.name && o.value === value) &&
                  v.availableForSale,
              )
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onSelect(opt.name, value)}
                  aria-pressed={active}
                  className={cn(
                    'min-h-11 cursor-pointer rounded-md border px-4 text-sm transition-colors',
                    active
                      ? 'border-ink bg-ink text-paper'
                      : 'border-hairline text-ink hover:border-ink',
                    !available && 'text-stone/60 line-through',
                  )}
                >
                  {value}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
