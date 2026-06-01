import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function EmptyState({
  title,
  body,
  icon,
  action,
  className,
}: {
  title: string
  body?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-5 px-6 py-20 text-center',
        className,
      )}
    >
      {icon ? <div className="text-stone/45">{icon}</div> : null}
      <div className="space-y-2">
        <h3 className="t-h3">{title}</h3>
        {body ? <p className="t-lead mx-auto max-w-md">{body}</p> : null}
      </div>
      {action}
    </div>
  )
}
