import { CalendarClock, Mail, Phone } from 'lucide-react'
import { priceListValidFrom, serviceIntro, servicePromo, site } from '@/data'
import { Seo } from '@/lib/seo'
import { Button, Container, Tag } from '@/components/ui'
import { PageHeader, PriceList } from '@/components/content'

export default function ServicePage() {
  return (
    <>
      <Seo title="Szerviz" description={serviceIntro} />
      <PageHeader
        eyebrow="Szerviz"
        title="Szakszerviz minden olasz márkára"
        intro={serviceIntro}
        crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Szerviz' }]}
      />

      <Container className="space-y-14 pb-24">
        {servicePromo.active ? (
          <div className="rounded-md bg-ink p-8 text-paper lg:p-10">
            <Tag tone="accent">Akció</Tag>
            <h2 className="t-h2 mt-4 text-paper">{servicePromo.title}</h2>
            <p className="mt-3 max-w-xl text-paper/80">{servicePromo.body}</p>
            <p className="mt-4 text-sm text-paper/60">Érvényes: {servicePromo.validUntil}</p>
            <div className="mt-6">
              <Button to="/szerviz/foglalas" size="lg">
                <CalendarClock className="h-4 w-4" aria-hidden="true" />
                Időpontot foglalok
              </Button>
            </div>
          </div>
        ) : null}

        <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <h2 className="t-h3 mb-2">Árlista</h2>
            <p className="mb-5 text-sm text-stone">
              Érvényes {priceListValidFrom}-tól. Az árak nettó értékek (+ ÁFA).
            </p>
            <PriceList />
            <p className="mt-4 text-sm text-stone">
              Javítást kizárólag az ügyfél előzetes jóváhagyása után végzünk.
            </p>
          </div>

          <aside className="rounded-md border border-hairline bg-surface p-6 lg:sticky lg:top-24">
            <h3 className="t-h3">Foglalj időpontot</h3>
            <p className="mt-2 text-sm text-stone">
              Válaszd ki a szolgáltatást és az időpontot online, vagy keress minket közvetlenül.
            </p>
            <div className="mt-5 space-y-3">
              <Button to="/szerviz/foglalas" fullWidth size="lg">
                <CalendarClock className="h-4 w-4" aria-hidden="true" />
                Időpontot foglalok
              </Button>
              <Button href={site.phone.href} variant="ghost" fullWidth>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone.display}
              </Button>
              <Button href={`mailto:${site.email.service}`} variant="ghost" fullWidth>
                <Mail className="h-4 w-4" aria-hidden="true" />
                {site.email.service}
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </>
  )
}
