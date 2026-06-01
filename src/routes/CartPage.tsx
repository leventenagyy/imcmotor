import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { Seo } from '@/lib/seo'
import { Button, Container, EmptyState } from '@/components/ui'
import { PageHeader } from '@/components/content'
import { CartLineItem, OrderSummary } from '@/components/commerce'

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart()

  return (
    <>
      <Seo title="Kosár" />
      <PageHeader title="Kosár" crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Kosár' }]} />

      <Container className="pb-24">
        {items.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="h-10 w-10" strokeWidth={1.25} />}
            title="A kosarad üres"
            body="Nézz körül a modellek és kiegészítők között, és add hozzá kedvenceidet."
            action={<Button to="/ujdonsagok">Vásárlás folytatása</Button>}
          />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <ul className="divide-y divide-hairline">
              {items.map((item) => (
                <li key={item.key} className="py-6 first:pt-0">
                  <CartLineItem
                    item={item}
                    onQuantity={(q) => updateQuantity(item.key, q)}
                    onRemove={() => removeItem(item.key)}
                  />
                </li>
              ))}
            </ul>
            <div className="lg:sticky lg:top-24 lg:self-start">
              <OrderSummary
                subtotal={subtotal}
                action={
                  <Button to="/penztar" fullWidth size="lg">
                    Tovább a pénztárhoz
                  </Button>
                }
              />
              <p className="mt-4 text-xs text-stone">
                Ez egy demó áruház – a pénztár nem dolgoz fel valódi fizetést.
              </p>
            </div>
          </div>
        )}
      </Container>
    </>
  )
}
