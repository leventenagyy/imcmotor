import { Seo } from '@/lib/seo'
import { Container } from '@/components/ui'
import { PageHeader } from '@/components/content'
import { BookingFlow } from '@/components/booking'

export default function ServiceBookingPage() {
  return (
    <>
      <Seo
        title="Időpontfoglalás"
        description="Foglalj szervizidőpontot online az IMC Motornál – néhány lépésben."
      />
      <PageHeader
        eyebrow="Szerviz"
        title="Időpontfoglalás"
        intro="Válaszd ki a szolgáltatást, a motort és az időpontot – a többit ránk bízhatod."
        crumbs={[
          { label: 'Főoldal', to: '/' },
          { label: 'Szerviz', to: '/szerviz' },
          { label: 'Időpontfoglalás' },
        ]}
      />
      <Container className="pb-24">
        <BookingFlow mode="service" />
      </Container>
    </>
  )
}
