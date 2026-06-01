import { useState } from 'react'
import { X } from 'lucide-react'
import { site } from '@/data'

/** Dismissible top bar (content is data-driven; promo lives in services.ts/site). */
export function AnnouncementBar() {
  const [open, setOpen] = useState(true)
  if (!open) return null
  return (
    <div className="relative bg-ink text-paper">
      <p className="mx-auto max-w-[82.5rem] px-10 py-2 text-center text-xs tracking-wide sm:px-12">
        <span className="hidden sm:inline">Tavaszi szerviz akció · </span>
        Foglalj időpontot online ·{' '}
        <a href={site.phone.href} className="underline decoration-1 underline-offset-2 hover:text-accent">
          {site.phone.display}
        </a>
      </p>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Sáv bezárása"
        className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 cursor-pointer place-items-center rounded-sm text-paper/70 transition-colors hover:text-paper"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}
