import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Centered page container — max 1320px with fluid gutters (design-system §4). */
export function Container({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: ElementType
}) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[82.5rem] px-5 sm:px-8 lg:px-12', className)}>
      {children}
    </Tag>
  )
}
