import { Bike } from 'lucide-react'
import type { AspectRatio, ProductImage } from '@/data'
import { cn } from '@/lib/cn'

/**
 * Image system. While assets are placeholders (image.src === null) we render a
 * disciplined <Placeholder> instead of a fake photo (design-system §8).
 * Swap by setting a real `src` in the data — components don't change.
 */

function ratioStyle(ratio?: AspectRatio) {
  return ratio ? { aspectRatio: ratio.replace('/', ' / ') } : undefined
}

export function Placeholder({
  ratio = '4/5',
  label,
  className,
}: {
  ratio?: AspectRatio
  label?: string
  className?: string
}) {
  return (
    <div
      className={cn('relative flex items-center justify-center overflow-hidden bg-sunken', className)}
      style={ratioStyle(ratio)}
    >
      <div className="pointer-events-none absolute inset-3 border border-hairline" aria-hidden="true" />
      <div className="relative flex max-w-[80%] flex-col items-center gap-3 text-center">
        <Bike className="h-7 w-7 text-stone/45" strokeWidth={1.25} aria-hidden="true" />
        {label ? <span className="t-eyebrow text-stone/70">{label}</span> : null}
      </div>
    </div>
  )
}

export function Media({
  image,
  className,
  sizes,
  priority,
}: {
  image: ProductImage
  className?: string
  sizes?: string
  priority?: boolean
}) {
  if (!image.src) {
    return <Placeholder ratio={image.ratio} label={image.alt} className={className} />
  }
  return (
    <img
      src={image.src}
      alt={image.alt}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={cn('block h-full w-full object-cover', className)}
      style={ratioStyle(image.ratio)}
    />
  )
}
