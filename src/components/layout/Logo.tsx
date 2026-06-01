import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

/**
 * Interim logotype: the wordmark set in Fraunces, the display font (design-system §8).
 * Looks intentional, not broken — drop a real logo asset here when available.
 */
export function Logo({
  className,
  onClick,
  tone = 'ink',
}: {
  className?: string
  onClick?: () => void
  tone?: 'ink' | 'paper'
}) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="IMC Motor – főoldal"
      className={cn(
        'font-display text-2xl font-medium leading-none tracking-tight',
        tone === 'ink' ? 'text-ink' : 'text-paper',
        className,
      )}
    >
      IMC <span className="text-accent">Motor</span>
    </Link>
  )
}
