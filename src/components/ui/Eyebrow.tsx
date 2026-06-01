import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Small uppercase label — the editorial "kicker" above headings. */
export function Eyebrow({
  children,
  className,
  as: Tag = 'p',
}: {
  children: ReactNode
  className?: string
  as?: ElementType
}) {
  return <Tag className={cn('t-eyebrow', className)}>{children}</Tag>
}
