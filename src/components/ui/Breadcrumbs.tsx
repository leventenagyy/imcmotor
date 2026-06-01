import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav
      aria-label="Morzsamenü"
      className={cn('flex flex-wrap items-center gap-1.5 text-sm text-stone', className)}
    >
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
          {item.to ? (
            <Link to={item.to} className="transition-colors hover:text-accent">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink-soft">{item.label}</span>
          )}
          {i < items.length - 1 ? (
            <ChevronRight className="h-3.5 w-3.5 text-stone/50" aria-hidden="true" />
          ) : null}
        </span>
      ))}
    </nav>
  )
}
