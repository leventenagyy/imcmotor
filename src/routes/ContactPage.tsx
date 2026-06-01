import { useState } from 'react'
import { Check, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { site } from '@/data'
import { Seo } from '@/lib/seo'
import { Button, Container, FormField, Input, Textarea } from '@/components/ui'
import { MapEmbed, PageHeader } from '@/components/content'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <Seo
        title="Kapcsolat"
        description={`${site.name} – ${site.address.full}. Telefon: ${site.phone.display}.`}
      />
      <PageHeader
        eyebrow="Kapcsolat"
        title="Keress minket"
        intro="Gyere be a szalonba, hívj minket, vagy írj – szívesen segítünk a választásban és a szervizelésben."
        crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Kapcsolat' }]}
      />

      <Container className="pb-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Info */}
          <div className="space-y-8">
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-medium text-ink">Cím</p>
                  <p className="text-stone">{site.address.full}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-medium text-ink">Telefon</p>
                  <a href={site.phone.href} className="text-stone hover:text-accent">
                    {site.phone.display}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-medium text-ink">E-mail</p>
                  <p className="text-stone">
                    <a href={`mailto:${site.email.sales}`} className="hover:text-accent">
                      {site.email.sales}
                    </a>{' '}
                    (értékesítés)
                    <br />
                    <a href={`mailto:${site.email.service}`} className="hover:text-accent">
                      {site.email.service}
                    </a>{' '}
                    (szerviz)
                  </p>
                </div>
              </li>
            </ul>

            <div>
              <p className="mb-3 flex items-center gap-2 font-medium text-ink">
                <Clock className="h-5 w-5 text-accent" aria-hidden="true" />
                Nyitvatartás
              </p>
              <ul className="overflow-hidden rounded-md border border-hairline bg-surface text-sm">
                {site.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex justify-between border-b border-hairline px-4 py-2.5 last:border-0"
                  >
                    <span className="text-stone">{h.day}</span>
                    <span className={h.closed ? 'text-stone' : 'font-medium text-ink'}>
                      {h.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form (mock) */}
          <div className="rounded-md border border-hairline bg-surface p-6 lg:p-8">
            <h2 className="t-h3 mb-5">Írj nekünk</h2>
            {sent ? (
              <p className="flex items-center gap-2 text-ink">
                <Check className="h-5 w-5 text-success" aria-hidden="true" />
                Köszönjük az üzeneted! Hamarosan jelentkezünk.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
                className="space-y-4"
              >
                <FormField label="Név" htmlFor="c-name" required>
                  <Input id="c-name" name="name" required autoComplete="name" />
                </FormField>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="E-mail" htmlFor="c-email" required>
                    <Input id="c-email" name="email" type="email" required autoComplete="email" />
                  </FormField>
                  <FormField label="Telefon" htmlFor="c-phone">
                    <Input id="c-phone" name="phone" type="tel" autoComplete="tel" />
                  </FormField>
                </div>
                <FormField label="Üzenet" htmlFor="c-message" required>
                  <Textarea id="c-message" name="message" required />
                </FormField>
                <Button type="submit" size="lg">
                  Üzenet küldése
                </Button>
                <p className="text-xs text-stone">
                  Ez egy demó űrlap – az üzenet nem kerül elküldésre.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>

      <div className="border-t border-hairline">
        <MapEmbed className="h-80 w-full border-0 lg:h-96" />
      </div>
    </>
  )
}
