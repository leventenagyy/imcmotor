import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { Seo } from '@/lib/seo'
import { formatHUF } from '@/lib/format'
import { Button, Container, EmptyState, FormField, Input, Stepper } from '@/components/ui'
import { Media } from '@/components/ui/Media'
import { PageHeader } from '@/components/content'
import { cn } from '@/lib/cn'

const STEPS = ['Adatok', 'Szállítás', 'Fizetés', 'Áttekintés', 'Kész']

const SHIPPING = [
  { id: 'delivery', label: 'Házhozszállítás', note: 'Futárszolgálattal, 1–3 munkanap.' },
  { id: 'pickup', label: 'Személyes átvétel', note: 'A szalonban, Dunakeszi.' },
]
const PAYMENT = [
  { id: 'cod', label: 'Utánvét', note: 'Fizetés átvételkor.' },
  { id: 'card', label: 'Bankkártya a szalonban', note: 'Átvételkor, kártyával.' },
  { id: 'transfer', label: 'Banki átutalás', note: 'Előre utalással.' },
]

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  const [step, setStep] = useState(0)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [postal, setPostal] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [shipping, setShipping] = useState('delivery')
  const [payment, setPayment] = useState('cod')

  const [placed, setPlaced] = useState<{ ref: string; total: number } | null>(null)

  function canAdvance(): boolean {
    switch (STEPS[step]) {
      case 'Adatok':
        return Boolean(name.trim() && /.+@.+\..+/.test(email) && phone.trim())
      case 'Szállítás':
        return shipping === 'pickup' ? true : Boolean(postal.trim() && city.trim() && street.trim())
      case 'Fizetés':
        return Boolean(payment)
      default:
        return true
    }
  }

  function next() {
    if (!canAdvance()) return
    if (STEPS[step] === 'Áttekintés') {
      const ref = `IMC-${Date.now().toString(36).toUpperCase().slice(-6)}`
      setPlaced({ ref, total: subtotal })
      clear()
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }
  const back = () => setStep((s) => Math.max(s - 1, 0))

  // Empty cart (and not on the final confirmation) → nudge back to shopping.
  if (items.length === 0 && !placed) {
    return (
      <>
        <Seo title="Pénztár" />
        <PageHeader title="Pénztár" crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Pénztár' }]} />
        <Container className="pb-24">
          <EmptyState
            icon={<ShoppingBag className="h-10 w-10" strokeWidth={1.25} />}
            title="A kosarad üres"
            body="Tegyél a kosárba, mielőtt a pénztárhoz lépsz."
            action={<Button to="/ujdonsagok">Vásárlás folytatása</Button>}
          />
        </Container>
      </>
    )
  }

  // Confirmation
  if (STEPS[step] === 'Kész' && placed) {
    return (
      <>
        <Seo title="Megrendelés rögzítve" />
        <Container className="py-16 lg:py-24">
          <div className="mx-auto max-w-xl rounded-md border border-hairline bg-surface p-8 text-center lg:p-12">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/12 text-success">
              <Check className="h-7 w-7" aria-hidden="true" />
            </div>
            <h1 className="t-h2 mt-5">Köszönjük a megrendelést!</h1>
            <p className="t-lead mx-auto mt-3 max-w-md">
              Rendelésedet rögzítettük. Ez egy demó áruház – nincs valódi fizetés vagy szállítás.
            </p>
            <dl className="mx-auto mt-7 max-w-xs space-y-2 text-left text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-stone">Rendelésszám</dt>
                <dd className="font-medium tabular-nums">{placed.ref}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-stone">Végösszeg</dt>
                <dd className="font-medium tabular-nums">{formatHUF(placed.total)}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to="/">Vissza a főoldalra</Button>
              <Button to="/ujdonsagok" variant="ghost">
                Vásárlás folytatása
              </Button>
            </div>
          </div>
        </Container>
      </>
    )
  }

  return (
    <>
      <Seo title="Pénztár" />
      <PageHeader title="Pénztár" crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Pénztár' }]} />

      <Container className="pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(300px,360px)] lg:gap-14">
          <div>
            <Stepper steps={STEPS} current={step} onStepClick={(i) => i < step && setStep(i)} />

            <div className="mt-8">
              {STEPS[step] === 'Adatok' ? (
                <div className="space-y-4">
                  <h2 className="t-h3">Elérhetőség</h2>
                  <FormField label="Név" htmlFor="co-name" required>
                    <Input id="co-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                  </FormField>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="E-mail" htmlFor="co-email" required>
                      <Input id="co-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                    </FormField>
                    <FormField label="Telefon" htmlFor="co-phone" required>
                      <Input id="co-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
                    </FormField>
                  </div>
                </div>
              ) : null}

              {STEPS[step] === 'Szállítás' ? (
                <div className="space-y-5">
                  <h2 className="t-h3">Szállítási mód</h2>
                  <RadioCards options={SHIPPING} value={shipping} onChange={setShipping} name="shipping" />
                  {shipping === 'delivery' ? (
                    <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
                      <FormField label="Irányítószám" htmlFor="co-zip" required>
                        <Input id="co-zip" value={postal} onChange={(e) => setPostal(e.target.value)} autoComplete="postal-code" />
                      </FormField>
                      <FormField label="Város" htmlFor="co-city" required>
                        <Input id="co-city" value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" />
                      </FormField>
                      <FormField label="Cím" htmlFor="co-street" required className="sm:col-span-2">
                        <Input id="co-street" value={street} onChange={(e) => setStreet(e.target.value)} autoComplete="address-line1" />
                      </FormField>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {STEPS[step] === 'Fizetés' ? (
                <div className="space-y-5">
                  <h2 className="t-h3">Fizetési mód</h2>
                  <RadioCards options={PAYMENT} value={payment} onChange={setPayment} name="payment" />
                  <p className="text-xs text-stone">Demó – valódi fizetés nem történik.</p>
                </div>
              ) : null}

              {STEPS[step] === 'Áttekintés' ? (
                <div className="space-y-5">
                  <h2 className="t-h3">Áttekintés</h2>
                  <dl className="space-y-2 rounded-md border border-hairline bg-surface p-5 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone">Név</dt>
                      <dd className="font-medium">{name}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone">Kapcsolat</dt>
                      <dd className="text-right">{email}<br />{phone}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone">Szállítás</dt>
                      <dd className="text-right">
                        {SHIPPING.find((s) => s.id === shipping)?.label}
                        {shipping === 'delivery' ? <><br />{postal} {city}, {street}</> : null}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone">Fizetés</dt>
                      <dd className="font-medium">{PAYMENT.find((p) => p.id === payment)?.label}</dd>
                    </div>
                  </dl>
                </div>
              ) : null}

              <div className="mt-8 flex items-center justify-between gap-3">
                {step > 0 ? (
                  <Button variant="ghost" onClick={back}>
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Vissza
                  </Button>
                ) : (
                  <Button variant="ghost" to="/kosar">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Kosár
                  </Button>
                )}
                <Button onClick={next} disabled={!canAdvance()}>
                  {STEPS[step] === 'Áttekintés' ? 'Megrendelés' : 'Tovább'}
                  {STEPS[step] !== 'Áttekintés' ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
                </Button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-md border border-hairline bg-surface p-6">
              <h2 className="t-h3 mb-4">Kosár</h2>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.key} className="flex gap-3">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-sunken">
                      <Media image={{ src: item.imageSrc, alt: item.imageAlt, ratio: '1/1' }} />
                    </div>
                    <div className="flex flex-1 justify-between gap-2 text-sm">
                      <div>
                        <p className="font-medium leading-tight">{item.title}</p>
                        <p className="text-xs text-stone">
                          {item.variantTitle} · {item.quantity} db
                        </p>
                      </div>
                      <span className="whitespace-nowrap tabular-nums">
                        {formatHUF(item.price * item.quantity)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="my-4 border-t border-hairline" />
              <div className="flex items-baseline justify-between text-base font-medium">
                <span>Végösszeg</span>
                <span className="tabular-nums">{formatHUF(subtotal)}</span>
              </div>
              <p className="mt-1.5 text-xs text-stone">Az árak az ÁFÁ-t tartalmazzák.</p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  )
}

function RadioCards({
  options,
  value,
  onChange,
  name,
}: {
  options: Array<{ id: string; label: string; note: string }>
  value: string
  onChange: (v: string) => void
  name: string
}) {
  return (
    <div className="space-y-3">
      {options.map((o) => (
        <label
          key={o.id}
          className={cn(
            'flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors',
            value === o.id ? 'border-ink bg-sunken' : 'border-hairline hover:border-ink',
          )}
        >
          <input
            type="radio"
            name={name}
            value={o.id}
            checked={value === o.id}
            onChange={() => onChange(o.id)}
            className="mt-1 accent-[var(--color-accent)]"
          />
          <span>
            <span className="block font-medium text-ink">{o.label}</span>
            <span className="block text-sm text-stone">{o.note}</span>
          </span>
        </label>
      ))}
    </div>
  )
}
