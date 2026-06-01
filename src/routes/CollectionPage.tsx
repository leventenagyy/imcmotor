import { useSearchParams } from 'react-router-dom'
import {
  getCollectionByHandle,
  getPriceRange,
  getProductsByCollection,
  isOnSale,
  isSoldOut,
} from '@/data'
import { Seo } from '@/lib/seo'
import { Button, Container, EmptyState, Section } from '@/components/ui'
import { PageHeader } from '@/components/content'
import { CollectionToolbar, ProductCard, ProductGrid } from '@/components/commerce'
import type { SortKey } from '@/components/commerce'

export default function CollectionPage({ handle }: { handle: string }) {
  const [params, setParams] = useSearchParams()
  const collection = getCollectionByHandle(handle)
  const all = getProductsByCollection(handle)

  const sort = (params.get('sort') as SortKey) || 'default'
  const selectedTypes = params.getAll('tipus')
  const onSale = params.get('akcio') === '1'
  const inStock = params.get('raktar') === '1'
  const hasActiveFilters = selectedTypes.length > 0 || onSale || inStock

  const productTypes = Array.from(new Set(all.map((p) => p.productType))).sort((a, b) =>
    a.localeCompare(b, 'hu'),
  )

  let list = all
  if (selectedTypes.length) list = list.filter((p) => selectedTypes.includes(p.productType))
  if (onSale) list = list.filter((p) => isOnSale(p))
  if (inStock) list = list.filter((p) => !isSoldOut(p))

  const products = [...list]
  if (sort === 'price-asc') products.sort((a, b) => getPriceRange(a).min - getPriceRange(b).min)
  if (sort === 'price-desc') products.sort((a, b) => getPriceRange(b).min - getPriceRange(a).min)
  if (sort === 'name') products.sort((a, b) => a.title.localeCompare(b.title, 'hu'))

  function update(mutate: (p: URLSearchParams) => void) {
    const next = new URLSearchParams(params)
    mutate(next)
    setParams(next, { replace: true })
  }

  if (!collection) {
    return (
      <Container className="py-24">
        <EmptyState title="A kategória nem található" />
      </Container>
    )
  }

  return (
    <>
      <Seo title={collection.title} description={collection.excerpt} />
      <PageHeader
        eyebrow={collection.kind === 'brand' ? 'Márka' : 'Kategória'}
        title={collection.title}
        intro={collection.excerpt}
        crumbs={[{ label: 'Főoldal', to: '/' }, { label: collection.title }]}
      />

      <Container className="pb-24">
        <CollectionToolbar
          count={products.length}
          sort={sort}
          onSortChange={(s) => update((p) => (s === 'default' ? p.delete('sort') : p.set('sort', s)))}
          productTypes={productTypes}
          selectedTypes={selectedTypes}
          onToggleType={(t) =>
            update((p) => {
              const cur = p.getAll('tipus')
              p.delete('tipus')
              const nextSet = cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]
              nextSet.forEach((v) => p.append('tipus', v))
            })
          }
          onSale={onSale}
          onToggleOnSale={() => update((p) => (onSale ? p.delete('akcio') : p.set('akcio', '1')))}
          inStock={inStock}
          onToggleInStock={() =>
            update((p) => (inStock ? p.delete('raktar') : p.set('raktar', '1')))
          }
          onClear={() => setParams({}, { replace: true })}
          hasActiveFilters={hasActiveFilters}
        />

        <Section className="!pt-10 !pb-0">
          {products.length === 0 ? (
            <EmptyState
              title="Nincs a szűrésnek megfelelő termék"
              body="Próbálj lazítani a szűrőkön, vagy nézd meg a teljes kínálatot."
              action={
                <Button variant="ghost" onClick={() => setParams({}, { replace: true })}>
                  Szűrők törlése
                </Button>
              }
            />
          ) : (
            <ProductGrid>
              {products.map((p, i) => (
                <ProductCard key={p.handle} product={p} priority={i < 4} />
              ))}
            </ProductGrid>
          )}
        </Section>
      </Container>
    </>
  )
}
