import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Collection } from '@/data'
import { Media } from '@/components/ui/Media'

/**
 * On-brand gradient panels for brand cards that don't have a lifestyle photo
 * yet. Drop a 16:9 photo into the collection's `image.src` to override.
 */
const BRAND_BG: Record<string, string> = {
  Vespa: 'linear-gradient(150deg, #93aaa0 0%, #4a5a53 55%, #2b342e 100%)',
  Aprilia: 'linear-gradient(150deg, #b5202b 0%, #4a1c20 60%, #1f1416 100%)',
  'Moto Guzzi': 'linear-gradient(150deg, #74854c 0%, #3a4527 60%, #1f2417 100%)',
  Piaggio: 'linear-gradient(150deg, #53809b 0%, #2a4250 60%, #18242b 100%)',
}

export function BrandCard({ collection }: { collection: Collection }) {
  const hasPhoto = Boolean(collection.image.src)
  const bg = BRAND_BG[collection.brand ?? ''] ?? 'linear-gradient(150deg, #6b6259, #2c2825)'

  return (
    <Link to={`/${collection.handle}`} className="group relative block overflow-hidden rounded-md">
      {hasPhoto ? (
        <Media
          image={collection.image}
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div
          className="relative aspect-[16/9] w-full transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ background: bg }}
          aria-hidden="true"
        >
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="font-display text-6xl leading-none text-paper/10 lg:text-7xl">
              {collection.title}
            </span>
          </span>
        </div>
      )}

      <div
        className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/15 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 lg:p-6">
        <div>
          <h3 className="font-display text-2xl text-paper">{collection.title}</h3>
          <p className="text-sm text-paper/80">{collection.excerpt}</p>
        </div>
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-paper/40 text-paper transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink"
          aria-hidden="true"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
