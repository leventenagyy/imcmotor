import { useParams } from 'react-router-dom'
import { newsPosts } from '@/data'
import { Seo } from '@/lib/seo'
import { Breadcrumbs, Button, Container } from '@/components/ui'
import { Media } from '@/components/ui/Media'
import NotFoundPage from './NotFoundPage'

export default function NewsArticlePage() {
  const { slug } = useParams()
  const post = newsPosts.find((p) => p.slug === slug)
  if (!post) return <NotFoundPage />

  return (
    <>
      <Seo title={post.title} description={post.excerpt} />
      <Container className="py-10 lg:py-14">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: 'Főoldal', to: '/' },
            { label: 'Hírek', to: '/hirek' },
            { label: post.title },
          ]}
        />
        <article className="mx-auto max-w-3xl">
          <p className="t-eyebrow text-accent">
            {post.category} · {post.date}
          </p>
          <h1 className="t-h1 mt-3">{post.title}</h1>
          <p className="t-lead mt-4">{post.excerpt}</p>
          <div className="my-8 overflow-hidden rounded-md bg-sunken">
            <Media image={post.image} priority />
          </div>
          <div
            className="space-y-4 leading-relaxed text-ink-soft [&_p]:m-0"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />
          <div className="mt-10 border-t border-hairline pt-8">
            <Button to="/hirek" variant="ghost">
              ← Vissza a hírekhez
            </Button>
          </div>
        </article>
      </Container>
    </>
  )
}
