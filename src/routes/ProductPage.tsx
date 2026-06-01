import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CalendarClock, MessageSquare, ShieldCheck, Wrench } from 'lucide-react'
import {
  findVariant,
  getProductByHandle,
  getRelatedProducts,
  isSoldOut,
  type Product,
} from '@/data'
import { useCart } from '@/lib/cart'
import { Seo } from '@/lib/seo'
import {
  Breadcrumbs,
  Button,
  Container,
  Eyebrow,
  Price,
  QuantityStepper,
  Section,
  Tag,
} from '@/components/ui'
import { Gallery, ProductCard, ProductGrid, VariantSelector } from '@/components/commerce'
import NotFoundPage from './NotFoundPage'

export default function ProductPage() {
  const { handle } = useParams()
  const product = handle ? getProductByHandle(handle) : undefined
  if (!product) return <NotFoundPage />
  return <ProductView key={product.handle} product={product} />
}

function ProductView({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    product.options.forEach((o) => {
      init[o.name] = o.values[0]
    })
    return init
  })
  const [qty, setQty] = useState(1)

  const variant = findVariant(product, selected) ?? product.variants[0]
  const available = variant?.availableForSale ?? false
  const related = getRelatedProducts(product)
  const isAccessory = product.productType === 'Kiegészítő'
  const isUsed = product.productType === 'Használt'
  const isBike = !isAccessory

  function handleAdd() {
    if (!variant || !available) return
    addItem(
      {
        productHandle: product.handle,
        variantId: variant.id,
        title: product.title,
        variantTitle: variant.title,
        price: variant.price,
        imageSrc: product.images[0]?.src ?? null,
        imageAlt: product.images[0]?.alt ?? product.title,
      },
      qty,
    )
  }

  return (
    <>
      <Seo title={product.title} description={product.excerpt} />

      <Container className="py-8 lg:py-12">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: 'Főoldal', to: '/' },
            { label: product.vendor, to: `/${product.collections[0] ?? ''}` },
            { label: product.title },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Gallery images={product.images} title={product.title} />

          {/* Buy box */}
          <div className="lg:sticky lg:top-24">
            <Eyebrow className="text-stone">{product.vendor}</Eyebrow>
            <h1 className="t-h1 mt-2">{product.title}</h1>
            <div className="mt-4 flex items-center gap-3">
              {variant ? (
                <Price amount={variant.price} compareAt={variant.compareAtPrice} size="lg" />
              ) : null}
              {available ? (
                <Tag tone="success">Raktáron</Tag>
              ) : (
                <Tag tone="default">{isSoldOut(product) ? 'Elfogyott' : 'Jelenleg nem elérhető'}</Tag>
              )}
            </div>

            <p className="t-lead mt-5">{product.excerpt}</p>

            <div className="mt-7">
              <VariantSelector product={product} selected={selected} onSelect={(name, value) => setSelected((s) => ({ ...s, [name]: value }))} />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <QuantityStepper value={qty} onChange={setQty} />
              <Button onClick={handleAdd} disabled={!available} size="lg" className="flex-1">
                {available ? 'Kosárba' : 'Jelenleg nem elérhető'}
              </Button>
            </div>

            {/* Secondary CTAs by product type */}
            <div className="mt-3 flex flex-wrap gap-3">
              {isBike ? (
                <Button to="/berles" variant="ghost" className="flex-1">
                  <CalendarClock className="h-4 w-4" aria-hidden="true" />
                  {isUsed ? 'Megtekintés egyeztetése' : 'Próbamotort foglalok'}
                </Button>
              ) : null}
              <Button to="/kapcsolat" variant="ghost" className="flex-1">
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                Ajánlatot kérek
              </Button>
            </div>

            {/* Trust mini-band */}
            <ul className="mt-8 grid grid-cols-2 gap-3 border-t border-hairline pt-6 text-sm text-stone">
              <li className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-accent" aria-hidden="true" />
                Saját szakszerviz
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
                Garancia &amp; finanszírozás
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Description + specs */}
      <Section tone="sunken">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="t-h3 mb-4">Leírás</h2>
              <div
                className="space-y-4 leading-relaxed text-stone [&_p]:m-0"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </div>
            <div>
              <h2 className="t-h3 mb-4">Műszaki adatok</h2>
              <dl className="overflow-hidden rounded-md border border-hairline bg-surface text-sm">
                {product.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex justify-between gap-4 border-b border-hairline px-5 py-3.5 last:border-0"
                  >
                    <dt className="text-stone">{spec.label}</dt>
                    <dd className="text-right font-medium text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related */}
      {related.length > 0 ? (
        <Section>
          <Container>
            <h2 className="t-h2 mb-10">Hasonló modellek</h2>
            <ProductGrid>
              {related.map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
            </ProductGrid>
          </Container>
        </Section>
      ) : null}
    </>
  )
}
