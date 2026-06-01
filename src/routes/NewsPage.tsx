import { newsPosts } from '@/data'
import { Seo } from '@/lib/seo'
import { Container } from '@/components/ui'
import { NewsCard, PageHeader } from '@/components/content'

export default function NewsPage() {
  return (
    <>
      <Seo title="Hírek" description="Újdonságok, akciók és történetek az IMC Motor szalonból." />
      <PageHeader
        eyebrow="Hírek"
        title="Hírek a szalonból"
        intro="Újdonságok, akciók és történetek az olasz motorok világából."
        crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Hírek' }]}
      />
      <Container className="pb-24">
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-3">
          {newsPosts.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </>
  )
}
