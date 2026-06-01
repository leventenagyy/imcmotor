import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { bookableServices, products, site } from '@/data'
import { formatBookingDate, makeBookingReference } from '@/lib/booking'
import {
  Button,
  DatePicker,
  FormField,
  Input,
  Select,
  SlotPicker,
  Stepper,
  Textarea,
} from '@/components/ui'
import { cn } from '@/lib/cn'

type Mode = 'service' | 'rental'

const DISPLACEMENTS = ['50 cm³ alatt', '51–499 cm³', '500 cm³ felett']

// Bikes available to rent / test (everything that isn't an accessory or used unit).
const rentalBikes = products
  .filter((p) => p.productType !== 'Kiegészítő' && p.productType !== 'Használt')
  .map((p) => `${p.vendor} ${p.title.replace(`${p.vendor} `, '')}`)

export function BookingFlow({ mode }: { mode: Mode }) {
  const isService = mode === 'service'

  const stepDefs = isService
    ? [
        { key: 'service', label: 'Szolgáltatás' },
        { key: 'motor', label: 'Motor' },
        { key: 'date', label: 'Időpont' },
        { key: 'details', label: 'Adatok' },
        { key: 'done', label: 'Kész' },
      ]
    : [
        { key: 'motor', label: 'Motor' },
        { key: 'date', label: 'Időpont' },
        { key: 'details', label: 'Adatok' },
        { key: 'done', label: 'Kész' },
      ]
  const labels = stepDefs.map((s) => s.label)

  const [step, setStep] = useState(0)
  const key = stepDefs[step].key

  // Fields
  const [serviceId, setServiceId] = useState(bookableServices[0].id)
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [displacement, setDisplacement] = useState('')
  const [vin, setVin] = useState('')
  const [date, setDate] = useState<Date | null>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [reference, setReference] = useState('')

  const selectedService = bookableServices.find((s) => s.id === serviceId)

  function canAdvance(): boolean {
    switch (key) {
      case 'service':
        return Boolean(serviceId)
      case 'motor':
        return isService
          ? Boolean(brand && model.trim() && displacement)
          : Boolean(model)
      case 'date':
        return Boolean(date && slot)
      case 'details':
        return Boolean(name.trim() && phone.trim() && /.+@.+\..+/.test(email))
      default:
        return true
    }
  }

  function next() {
    if (!canAdvance()) return
    if (key === 'details') {
      // "submit" — mock: store the request locally and show confirmation.
      const ref = makeBookingReference(Date.now())
      setReference(ref)
      try {
        const raw = localStorage.getItem('imc.bookings.v1')
        const list = raw ? (JSON.parse(raw) as unknown[]) : []
        list.push({ ref, mode, serviceId, brand, model, displacement, vin, slot, name, phone, email, note })
        localStorage.setItem('imc.bookings.v1', JSON.stringify(list))
      } catch {
        /* non-fatal */
      }
    }
    setStep((s) => Math.min(s + 1, stepDefs.length - 1))
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0))
  }

  // --- Confirmation ---
  if (key === 'done') {
    return (
      <div className="rounded-md border border-hairline bg-surface p-8 text-center lg:p-12">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/12 text-success">
          <Check className="h-7 w-7" aria-hidden="true" />
        </div>
        <h2 className="t-h2 mt-5">Foglalási kérésedet rögzítettük</h2>
        <p className="t-lead mx-auto mt-3 max-w-md">
          Munkatársunk hamarosan visszaigazolja az időpontot telefonon vagy e-mailben.
          Ez egy demó – még nincs valódi foglalási rendszer a háttérben.
        </p>
        <dl className="mx-auto mt-7 max-w-sm space-y-2 text-left text-sm">
          <Row label="Azonosító" value={reference} />
          {isService && selectedService ? <Row label="Szolgáltatás" value={selectedService.label} /> : null}
          <Row label={isService ? 'Motor' : 'Motor'} value={isService ? `${brand} ${model}` : model} />
          {date ? <Row label="Időpont" value={`${formatBookingDate(date)} · ${slot}`} /> : null}
        </dl>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={site.phone.href} variant="ghost">
            {site.phone.display}
          </Button>
          <Button to="/">Vissza a főoldalra</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_minmax(280px,340px)] lg:gap-14">
      <div>
        <Stepper steps={labels} current={step} onStepClick={(i) => i < step && setStep(i)} />

        <div className="mt-8">
          {key === 'service' ? (
            <fieldset className="space-y-3">
              <legend className="t-h3 mb-2">Milyen szolgáltatást szeretnél?</legend>
              {bookableServices.map((s) => (
                <label
                  key={s.id}
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors',
                    serviceId === s.id ? 'border-ink bg-sunken' : 'border-hairline hover:border-ink',
                  )}
                >
                  <input
                    type="radio"
                    name="service"
                    value={s.id}
                    checked={serviceId === s.id}
                    onChange={() => setServiceId(s.id)}
                    className="mt-1 accent-[var(--color-accent)]"
                  />
                  <span>
                    <span className="block font-medium text-ink">{s.label}</span>
                    <span className="block text-sm text-stone">{s.description}</span>
                  </span>
                </label>
              ))}
            </fieldset>
          ) : null}

          {key === 'motor' ? (
            <div className="space-y-5">
              <h2 className="t-h3">{isService ? 'Add meg a motor adatait' : 'Melyik motort vezetnéd?'}</h2>
              {isService ? (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Márka" htmlFor="b-brand" required>
                      <Select id="b-brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
                        <option value="">Válassz…</option>
                        {site.brands.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                        <option value="Egyéb">Egyéb</option>
                      </Select>
                    </FormField>
                    <FormField label="Modell" htmlFor="b-model" required>
                      <Input
                        id="b-model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="pl. GTS 300"
                      />
                    </FormField>
                  </div>
                  <FormField label="Hengerűrtartalom" htmlFor="b-cc" required>
                    <Select id="b-cc" value={displacement} onChange={(e) => setDisplacement(e.target.value)}>
                      <option value="">Válassz…</option>
                      {DISPLACEMENTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </Select>
                  </FormField>
                  <FormField label="Alvázszám / rendszám" htmlFor="b-vin" hint="Nem kötelező – segít a felkészülésben.">
                    <Input id="b-vin" value={vin} onChange={(e) => setVin(e.target.value)} />
                  </FormField>
                </>
              ) : (
                <FormField label="Motor" htmlFor="r-model" required>
                  <Select id="r-model" value={model} onChange={(e) => setModel(e.target.value)}>
                    <option value="">Válassz modellt…</option>
                    {rentalBikes.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </Select>
                </FormField>
              )}
            </div>
          ) : null}

          {key === 'date' ? (
            <div className="space-y-6">
              <div>
                <h2 className="t-h3 mb-3">Válassz napot</h2>
                <DatePicker
                  value={date}
                  onChange={(d) => {
                    setDate(d)
                    setSlot(null)
                  }}
                />
              </div>
              <div>
                <h2 className="t-h3 mb-3">Válassz időpontot</h2>
                <SlotPicker date={date} value={slot} onChange={setSlot} />
              </div>
            </div>
          ) : null}

          {key === 'details' ? (
            <div className="space-y-4">
              <h2 className="t-h3">Elérhetőséged</h2>
              <FormField label="Név" htmlFor="b-name" required>
                <Input id="b-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </FormField>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Telefon" htmlFor="b-phone" required>
                  <Input id="b-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
                </FormField>
                <FormField label="E-mail" htmlFor="b-email" required>
                  <Input id="b-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                </FormField>
              </div>
              <FormField label="Megjegyzés" htmlFor="b-note">
                <Textarea id="b-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Bármi, amit jó, ha tudunk." />
              </FormField>
            </div>
          ) : null}

          {/* Nav */}
          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 0 ? (
              <Button variant="ghost" onClick={back}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Vissza
              </Button>
            ) : (
              <span />
            )}
            <Button onClick={next} disabled={!canAdvance()}>
              {key === 'details' ? 'Foglalás elküldése' : 'Tovább'}
              {key !== 'details' ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
            </Button>
          </div>
        </div>
      </div>

      {/* Summary rail */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-md border border-hairline bg-surface p-6">
          <h2 className="t-h3 mb-4">Összegzés</h2>
          <dl className="space-y-2.5 text-sm">
            {isService ? (
              <Row label="Szolgáltatás" value={selectedService?.label ?? '—'} />
            ) : null}
            <Row label="Motor" value={isService ? [brand, model].filter(Boolean).join(' ') || '—' : model || '—'} />
            <Row label="Időpont" value={date && slot ? `${formatBookingDate(date)} · ${slot}` : '—'} />
          </dl>
          <p className="mt-5 text-xs text-stone">
            A foglalás kérés jellegű – munkatársunk visszaigazolja. Nincs online fizetés.
          </p>
        </div>
      </aside>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-stone">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  )
}
