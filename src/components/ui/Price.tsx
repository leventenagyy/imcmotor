import { formatHUF } from '@/lib/format'
import { cn } from '@/lib/cn'

const sizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
}

/** Price with optional compare-at strikethrough (sale). */
export function Price({
  amount,
  compareAt,
  size = 'md',
  className,
}: {
  amount: number
  compareAt?: number
  size?: keyof typeof sizes
  className?: string
}) {
  const onSale = typeof compareAt === 'number' && compareAt > amount
  return (
    <span className={cn('inline-flex items-baseline gap-2', className)}>
      <span className={cn('font-medium tabular-nums', sizes[size], onSale && 'text-accent')}>
        {formatHUF(amount)}
      </span>
      {onSale ? (
        <span className="text-sm text-stone line-through tabular-nums">{formatHUF(compareAt)}</span>
      ) : null}
    </span>
  )
}
