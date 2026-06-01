import { ArrowRight, Phone } from 'lucide-react'
import { Seo } from '@/lib/seo'
import { site } from '@/data'
import { Button, Container } from '@/components/ui'
import { PageHeader } from '@/components/content'
import type { Crumb } from '@/components/ui'

/**
 * Reusable placeholder page for sections built in a later phase (PRD §15).
 * Keeps navigation complete and on-brand instead of dead links.
 */
export default function StubPage({
  title,
  eyebrow,
  intro,
  crumbs,
  note,
}: {
  title: string
  eyebrow?: string
  intro?: string
  crumbs?: Crumb[]
  note?: string
}) {
  return (
    <>
      <Seo title={title} description={intro} />
      <PageHeader eyebrow={eyebrow} title={title} intro={intro} crumbs={crumbs} />
      <Container className="pb-24">
        <div className="rounded-md border border-hairline bg-surface p-8 lg:p-12">
          <p className="t-eyebrow text-accent">Hamarosan</p>
          <h2 className="t-h3 mt-2 max-w-xl">
            {note ?? 'Ez az oldal a következő fejlesztési ütemben készül el.'}
          </h2>
          <p className="mt-3 max-w-xl text-stone">
            Addig is keress minket telefonon vagy e-mailben – szívesen segítünk.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={site.phone.href}>
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phone.display}
            </Button>
            <Button to="/kapcsolat" variant="ghost">
              Kapcsolat
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </>
  )
}
