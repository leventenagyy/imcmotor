import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Vertical section rhythm (design-system §4). `tone` swaps the background. */
export function Section({
  children,
  className,
  tone = 'paper',
  id,
}: {
  children: ReactNode
  className?: string
  tone?: 'paper' | 'surface' | 'sunken' | 'ink'
  id?: string
}) {
  const tones = {
    paper: '',
    surface: 'bg-surface',
    sunken: 'bg-sunken',
    ink: 'bg-ink text-paper',
  }
  return (
    <section id={id} className={cn('py-16 sm:py-20 lg:py-28', tones[tone], className)}>
      {children}
    </section>
  )
}
