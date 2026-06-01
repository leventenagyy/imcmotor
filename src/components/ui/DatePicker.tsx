import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { isSelectableDay } from '@/lib/booking'
import { cn } from '@/lib/cn'

const WEEKDAYS = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V']
const MONTHS = [
  'január', 'február', 'március', 'április', 'május', 'június',
  'július', 'augusztus', 'szeptember', 'október', 'november', 'december',
]

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}
function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/** Month calendar; disables Sundays + past days (shop is closed Sundays). */
export function DatePicker({
  value,
  onChange,
}: {
  value: Date | null
  onChange: (date: Date) => void
}) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [view, setView] = useState(() => startOfMonth(value ?? today))

  const year = view.getFullYear()
  const month = view.getMonth()
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7 // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const canPrev = startOfMonth(view) > startOfMonth(today)

  const cells: Array<Date | null> = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))

  return (
    <div className="rounded-md border border-hairline bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => canPrev && setView(new Date(year, month - 1, 1))}
          disabled={!canPrev}
          aria-label="Előző hónap"
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-sm text-ink transition-colors hover:text-accent disabled:cursor-default disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="font-display text-lg">
          {year}. {MONTHS[month]}
        </p>
        <button
          type="button"
          onClick={() => setView(new Date(year, month + 1, 1))}
          aria-label="Következő hónap"
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-sm text-ink transition-colors hover:text-accent"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1 text-xs text-stone">
            {w}
          </div>
        ))}
        {cells.map((date, i) => {
          if (!date) return <div key={`e-${i}`} />
          const selectable = isSelectableDay(date)
          const selected = value ? sameDay(date, value) : false
          const isToday = sameDay(date, today)
          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={!selectable}
              onClick={() => onChange(date)}
              aria-pressed={selected}
              className={cn(
                'aspect-square rounded-sm text-sm transition-colors',
                selected
                  ? 'bg-accent text-accent-ink'
                  : selectable
                    ? 'cursor-pointer text-ink hover:bg-sunken'
                    : 'cursor-default text-stone/30',
                isToday && !selected && 'ring-1 ring-inset ring-hairline',
              )}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
