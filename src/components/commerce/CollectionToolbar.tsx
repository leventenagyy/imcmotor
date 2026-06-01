import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { cn } from '@/lib/cn'

export type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name'

export const SORT_LABELS: Record<SortKey, string> = {
  default: 'Alapértelmezett',
  'price-asc': 'Ár szerint növekvő',
  'price-desc': 'Ár szerint csökkenő',
  name: 'Név szerint',
}

interface ToolbarProps {
  count: number
  sort: SortKey
  onSortChange: (sort: SortKey) => void
  productTypes: string[]
  selectedTypes: string[]
  onToggleType: (type: string) => void
  onSale: boolean
  onToggleOnSale: () => void
  inStock: boolean
  onToggleInStock: () => void
  onClear: () => void
  hasActiveFilters: boolean
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors',
        active ? 'border-ink bg-ink text-paper' : 'border-hairline text-ink hover:border-ink',
      )}
    >
      {children}
    </button>
  )
}

export function CollectionToolbar(props: ToolbarProps) {
  const [open, setOpen] = useState(false)
  const {
    count,
    sort,
    onSortChange,
    productTypes,
    selectedTypes,
    onToggleType,
    onSale,
    onToggleOnSale,
    inStock,
    onToggleInStock,
    onClear,
    hasActiveFilters,
  } = props

  return (
    <div className="border-y border-hairline">
      <div className="flex items-center justify-between gap-4 py-4">
        <p className="text-sm text-stone">
          {count} {count === 1 ? 'termék' : 'termék'}
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Szűrők
            {hasActiveFilters ? <span className="h-1.5 w-1.5 rounded-full bg-accent" /> : null}
          </button>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="sr-only">
              Rendezés
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortKey)}
              className="cursor-pointer rounded-md border border-hairline bg-surface py-2 pl-3 pr-8 text-sm text-ink transition-colors focus-visible:border-ink focus-visible:outline-none"
            >
              {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                <option key={k} value={k}>
                  {SORT_LABELS[k]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {open ? (
        <div className="space-y-5 pb-6">
          {productTypes.length > 0 ? (
            <div>
              <p className="t-eyebrow mb-2.5 text-stone">Típus</p>
              <div className="flex flex-wrap gap-2">
                {productTypes.map((t) => (
                  <Chip key={t} active={selectedTypes.includes(t)} onClick={() => onToggleType(t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </div>
          ) : null}
          <div>
            <p className="t-eyebrow mb-2.5 text-stone">Egyéb</p>
            <div className="flex flex-wrap items-center gap-2">
              <Chip active={onSale} onClick={onToggleOnSale}>
                Akciós
              </Chip>
              <Chip active={inStock} onClick={onToggleInStock}>
                Raktáron
              </Chip>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={onClear}
                  className="ml-1 inline-flex cursor-pointer items-center gap-1 text-sm text-stone transition-colors hover:text-accent"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  Szűrők törlése
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
