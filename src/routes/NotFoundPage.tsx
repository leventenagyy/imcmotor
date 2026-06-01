import { Seo } from '@/lib/seo'
import { Button, Container } from '@/components/ui'

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Az oldal nem található (404)" />
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-display text-7xl text-accent">404</p>
        <h1 className="t-h2 mt-4">Ez az oldal nem található</h1>
        <p className="t-lead mt-3 max-w-md">
          Lehet, hogy elköltözött, vagy sosem létezett. Térj vissza a főoldalra, és onnan
          folytasd a böngészést.
        </p>
        <div className="mt-7 flex gap-3">
          <Button to="/">Főoldal</Button>
          <Button to="/ujdonsagok" variant="ghost">
            Modellek
          </Button>
        </div>
      </Container>
    </>
  )
}
