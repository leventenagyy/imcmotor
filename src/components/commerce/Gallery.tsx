import { useState } from 'react'
import type { ProductImage } from '@/data'
import { Media } from '@/components/ui/Media'
import { cn } from '@/lib/cn'

export function Gallery({ images, title }: { images: ProductImage[]; title: string }) {
  const [active, setActive] = useState(0)
  const main = images[active] ?? images[0]

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-md bg-sunken">
        <Media image={main} priority sizes="(min-width: 1024px) 50vw, 100vw" />
      </div>
      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${title} – ${i + 1}. kép megtekintése`}
              aria-current={i === active}
              className={cn(
                'cursor-pointer overflow-hidden rounded-md border bg-sunken transition-colors',
                i === active ? 'border-ink' : 'border-transparent hover:border-hairline',
              )}
            >
              <Media image={img} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
