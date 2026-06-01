import { AnimatePresence, motion } from 'motion/react'
import { ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { useScrollLock } from '@/lib/useScrollLock'
import { formatHUF } from '@/lib/format'
import { Button, EmptyState } from '@/components/ui'
import { CartLineItem } from './CartLineItem'

export function CartDrawer() {
  const { items, subtotal, count, isOpen, closeCart, updateQuantity, removeItem } = useCart()
  useScrollLock(isOpen)

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            aria-hidden="true"
          />
          <motion.div
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-paper shadow-[var(--shadow-overlay)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Kosár"
          >
            <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
              <h2 className="font-display text-xl">
                Kosár{count > 0 ? <span className="text-base text-stone"> ({count})</span> : null}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Kosár bezárása"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-sm text-ink transition-colors hover:text-accent"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {items.length === 0 ? (
                <EmptyState
                  icon={<ShoppingBag className="h-10 w-10" strokeWidth={1.25} />}
                  title="A kosarad üres"
                  body="Nézz körül a modellek és kiegészítők között."
                  action={
                    <Button to="/ujdonsagok" onClick={closeCart}>
                      Vásárlás folytatása
                    </Button>
                  }
                />
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.key}>
                      <CartLineItem
                        item={item}
                        onQuantity={(qty) => updateQuantity(item.key, qty)}
                        onRemove={() => removeItem(item.key)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 ? (
              <footer className="space-y-4 border-t border-hairline px-5 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-stone">Részösszeg</span>
                  <span className="text-base font-medium tabular-nums">{formatHUF(subtotal)}</span>
                </div>
                <p className="text-xs text-stone">
                  A szállítást és a véglegesítést a pénztárnál számoljuk. Ez egy demó – nincs valódi
                  fizetés.
                </p>
                <Button to="/penztar" fullWidth onClick={closeCart}>
                  Tovább a pénztárhoz
                </Button>
                <Button to="/kosar" variant="ghost" fullWidth onClick={closeCart}>
                  Kosár megtekintése
                </Button>
              </footer>
            ) : null}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
