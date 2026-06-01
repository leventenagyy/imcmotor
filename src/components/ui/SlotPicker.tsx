import { generateSlots, isClosedDay } from '@/lib/booking'
import { cn } from '@/lib/cn'

/** Time-slot grid generated from shop opening hours (mock availability). */
export function SlotPicker({
  date,
  value,
  onChange,
}: {
  date: Date | null
  value: string | null
  onChange: (slot: string) => void
}) {
  if (!date) return <p className="text-sm text-stone">Válassz előbb egy napot a naptárban.</p>
  if (isClosedDay(date)) return <p className="text-sm text-stone">Ezen a napon zárva tartunk.</p>

  const slots = generateSlots(date)
  if (slots.length === 0) {
    return <p className="text-sm text-stone">Nincs elérhető időpont ezen a napon.</p>
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {slots.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          aria-pressed={value === s}
          className={cn(
            'min-h-11 cursor-pointer rounded-md border text-sm tabular-nums transition-colors',
            value === s ? 'border-ink bg-ink text-paper' : 'border-hairline text-ink hover:border-ink',
          )}
        >
          {s}
        </button>
      ))}
    </div>
  )
}
