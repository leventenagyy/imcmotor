import { Breadcrumbs, Container, Eyebrow } from '@/components/ui'
import type { Crumb } from '@/components/ui'

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow?: string
  title: string
  intro?: string
  crumbs?: Crumb[]
}) {
  return (
    <Container className="pb-8 pt-10 lg:pt-14">
      {crumbs ? <Breadcrumbs items={crumbs} className="mb-6" /> : null}
      {eyebrow ? <Eyebrow className="text-accent">{eyebrow}</Eyebrow> : null}
      <h1 className="t-h1 mt-3 max-w-3xl">{title}</h1>
      {intro ? <p className="t-lead mt-4 max-w-2xl">{intro}</p> : null}
    </Container>
  )
}
