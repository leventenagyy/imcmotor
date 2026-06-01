import type { ReactNode } from 'react'
import { formatHUF } from '@/lib/format'

export function OrderSummary({ subtotal, action }: { subtotal: number; action?: ReactNode }) {
  return (
    <div className="rounded-md border border-hairline bg-surface p-6">
      <h2 className="t-h3 mb-5">Összegzés</h2>
      <dl className="space-y-2.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-stone">Részösszeg</dt>
          <dd className="tabular-nums">{formatHUF(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-stone">Szállítás</dt>
          <dd className="text-stone">a pénztárnál számoljuk</dd>
        </div>
      </dl>
      <div className="my-4 border-t border-hairline" />
      <div className="flex items-baseline justify-between text-base font-medium">
        <span>Végösszeg</span>
        <span className="tabular-nums">{formatHUF(subtotal)}</span>
      </div>
      <p className="mt-1.5 text-xs text-stone">Az árak az ÁFÁ-t tartalmazzák.</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
