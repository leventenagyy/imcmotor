import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

/** Progress indicator for multi-step flows (checkout, booking). */
export function Stepper({
  steps,
  current,
  onStepClick,
}: {
  steps: string[]
  current: number
  onStepClick?: (index: number) => void
}) {
  return (
    <div>
      {/* Mobile: compact "n / total — label" */}
      <div className="sm:hidden">
        <p className="t-eyebrow text-stone">
          {current + 1} / {steps.length}. lépés
        </p>
        <p className="mt-1 font-display text-xl">{steps[current]}</p>
      </div>

      {/* Desktop: full step rail */}
      <ol className="hidden flex-wrap items-center gap-y-3 sm:flex">
        {steps.map((label, i) => {
          const done = i < current
          const active = i === current
          const clickable = Boolean(onStepClick) && i < current
          return (
            <li key={label} className="flex items-center">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onStepClick?.(i)}
                className={cn('flex items-center gap-2', clickable && 'cursor-pointer')}
              >
                <span
                  className={cn(
                    'grid h-7 w-7 place-items-center rounded-full border text-xs tabular-nums transition-colors',
                    active
                      ? 'border-accent bg-accent text-accent-ink'
                      : done
                        ? 'border-ink bg-ink text-paper'
                        : 'border-hairline text-stone',
                  )}
                >
                  {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                </span>
                <span className={cn('text-sm', active ? 'font-medium text-ink' : 'text-stone')}>
                  {label}
                </span>
              </button>
              {i < steps.length - 1 ? <span className="mx-3 h-px w-6 bg-hairline" /> : null}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
