import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import {
  getBrandCollections,
  getFeaturedProducts,
  homeContent,
  newsPosts,
} from '@/data'
import { Seo } from '@/lib/seo'
import { Button, Container, Eyebrow, Reveal, Section } from '@/components/ui'
import { Media } from '@/components/ui/Media'
import { BrandCard, ProductCard, ProductGrid } from '@/components/commerce'
import { Hero, NewsCard, Newsletter } from '@/components/content'

export default function HomePage() {
  const brands = getBrandCollections()
  const featured = getFeaturedProducts(homeContent.featuredHandles)
  const news = newsPosts.slice(0, 3)
  const { serviceBand, split, trust } = homeContent

  return (
    <>
      <Seo />

      <Hero />

      {/* Trust strip */}
      <Container>
        <ul className="grid grid-cols-3 divide-x divide-hairline border-y border-hairline">
          {trust.map((t) => (
            <li key={t.label} className="px-2 py-6 text-center">
              <p className="font-display text-2xl text-ink lg:text-3xl">{t.value}</p>
              <p className="mt-1 text-xs text-stone sm:text-sm">{t.label}</p>
            </li>
          ))}
        </ul>
      </Container>

      {/* Brands */}
      <Section>
        <Container>
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow className="text-accent">{homeContent.brandsTitle}</Eyebrow>
              <h2 className="t-h2 mt-3">{homeContent.brandsLead}</h2>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {brands.map((c) => (
              <Reveal key={c.handle}>
                <BrandCard collection={c} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured products */}
      <Section tone="sunken">
        <Container>
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow className="text-accent">{homeContent.featuredTitle}</Eyebrow>
              <h2 className="t-h2 mt-3">{homeContent.featuredLead}</h2>
            </div>
            <Link
              to="/ujdonsagok"
              className="group inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent"
            >
              Összes újdonság
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
          <ProductGrid>
            {featured.map((p, i) => (
              <Reveal key={p.handle} delay={i * 0.05}>
                <ProductCard product={p} priority={i < 2} />
              </Reveal>
            ))}
          </ProductGrid>
        </Container>
      </Section>

      {/* Service band */}
      <Section>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="order-2 lg:order-1">
              <Eyebrow className="text-accent">{serviceBand.eyebrow}</Eyebrow>
              <h2 className="t-h2 mt-3">{serviceBand.title}</h2>
              <p className="t-lead mt-4 max-w-md">{serviceBand.body}</p>
              <div className="mt-7">
                <Button to={serviceBand.cta.to} size="lg">
                  {serviceBand.cta.label}
                </Button>
              </div>
            </Reveal>
            <Reveal className="order-1 overflow-hidden rounded-md lg:order-2">
              <Media image={serviceBand.image} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Used + Rental split */}
      <Section tone="sunken">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {[split.used, split.rental].map((f) => (
              <Reveal key={f.title}>
                <Link
                  to={f.cta.to}
                  className="group relative block overflow-hidden rounded-md"
                >
                  <Media
                    image={f.image}
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/20 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                    <p className="t-eyebrow text-paper/80">{f.eyebrow}</p>
                    <h3 className="mt-2 font-display text-2xl text-paper lg:text-3xl">{f.title}</h3>
                    <p className="mt-1 max-w-xs text-sm text-paper/85">{f.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-paper">
                      {f.cta.label}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* News */}
      <Section>
        <Container>
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow className="text-accent">{homeContent.newsTitle}</Eyebrow>
              <h2 className="t-h2 mt-3">{homeContent.newsLead}</h2>
            </div>
            <Link
              to="/hirek"
              className="group inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent"
            >
              Összes hír
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
          <div className="grid gap-x-6 gap-y-10 md:grid-cols-3">
            {news.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <NewsCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Section tone="sunken">
        <Container>
          <Newsletter />
        </Container>
      </Section>
    </>
  )
}
