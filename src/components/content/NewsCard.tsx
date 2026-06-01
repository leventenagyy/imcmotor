import { Link } from 'react-router-dom'
import type { NewsPost } from '@/data'
import { Media } from '@/components/ui/Media'

export function NewsCard({ post }: { post: NewsPost }) {
  return (
    <Link to={`/hirek/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-md bg-sunken">
        <Media
          image={post.image}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4">
        <p className="t-eyebrow text-stone">
          {post.category} · {post.date}
        </p>
        <h3 className="mt-2 font-display text-xl leading-tight text-ink transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-stone">{post.excerpt}</p>
      </div>
    </Link>
  )
}
