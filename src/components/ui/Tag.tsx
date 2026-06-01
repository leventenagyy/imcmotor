import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'default' | 'accent' | 'success' | 'muted' | 'outline'

const tones: Record<Tone, string> = {
  default: 'bg-ink text-paper',
  accent: 'bg-accent text-accent-ink',
  success: 'bg-success/12 text-success',
  muted: 'bg-sunken text-stone',
  outline: 'border border-hairline text-stone',
}

export function Tag({
  children,
  tone = 'muted',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-sm px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-wider',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
