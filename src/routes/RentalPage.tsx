import { products } from '@/data'
import { Seo } from '@/lib/seo'
import { Container, Section } from '@/components/ui'
import { PageHeader } from '@/components/content'
import { ProductCard, ProductGrid } from '@/components/commerce'
import { BookingFlow } from '@/components/booking'

export default function RentalPage() {
  const bikes = products
    .filter((p) => p.productType !== 'Kiegészítő' && p.productType !== 'Használt')
    .slice(0, 4)

  return (
    <>
      <Seo
        title="Bérlés és teszt motorok"
        description="Próbáld ki kedvenc olasz motorod egy teszt körön, vagy bérelj egy hétvégére."
      />
      <PageHeader
        eyebrow="Bérlés & Teszt"
        title="Vezesd, mielőtt döntesz"
        intro="Próbáld ki kedvenc modelled egy teszt körön, vagy bérelj egy hétvégére. Foglalj időpontot néhány lépésben."
        crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Bérlés' }]}
      />

      <Container className="pb-4">
        <ProductGrid>
          {bikes.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </ProductGrid>
      </Container>

      <Section tone="sunken">
        <Container>
          <h2 className="t-h2 mb-2">Foglalj próbamotort</h2>
          <p className="t-lead mb-10 max-w-xl">
            Válaszd ki a motort és az időpontot. Munkatársunk visszaigazolja a foglalást.
          </p>
          <BookingFlow mode="rental" />
        </Container>
      </Section>
    </>
  )
}
