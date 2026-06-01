import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/cn'

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: {
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
  className?: string
}) {
  return (
    <div className={cn('inline-flex items-center rounded-md border border-hairline', className)}>
      <button
        type="button"
        aria-label="Mennyiség csökkentése"
        className="grid h-11 w-11 cursor-pointer place-items-center text-ink transition-colors hover:text-accent disabled:opacity-40"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="w-10 text-center text-sm tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Mennyiség növelése"
        className="grid h-11 w-11 cursor-pointer place-items-center text-ink transition-colors hover:text-accent disabled:opacity-40"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}
