import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Collection } from '@/data'
import { Media } from '@/components/ui/Media'

export function BrandCard({ collection }: { collection: Collection }) {
  return (
    <Link to={`/${collection.handle}`} className="group relative block overflow-hidden rounded-md">
      <Media
        image={collection.image}
        className="transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/20 to-transparent"
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
