import { useState } from 'react'
import { Check } from 'lucide-react'
import { homeContent } from '@/data'
import { Button, Eyebrow, Input } from '@/components/ui'

/** Mock newsletter form — no backend; shows a success state on submit. */
export function Newsletter() {
  const [done, setDone] = useState(false)
  const n = homeContent.newsletter

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2">
      <div>
        <Eyebrow className="text-accent">Hírlevél</Eyebrow>
        <h2 className="t-h2 mt-3">{n.title}</h2>
        <p className="t-lead mt-3 max-w-md">{n.body}</p>
      </div>
      <div>
        {done ? (
          <p className="flex items-center gap-2 text-ink">
            <Check className="h-5 w-5 text-success" aria-hidden="true" />
            Köszönjük a feliratkozást! Hamarosan jelentkezünk.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setDone(true)
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="nl-email" className="sr-only">
              E-mail cím
            </label>
            <Input
              id="nl-email"
              type="email"
              required
              autoComplete="email"
              placeholder="E-mail címed"
              className="flex-1"
            />
            <Button type="submit">Feliratkozom</Button>
          </form>
        )}
        <p className="mt-3 text-xs text-stone">
          A feliratkozással elfogadod az adatkezelési tájékoztatót. Bármikor leiratkozhatsz.
        </p>
      </div>
    </div>
  )
}
