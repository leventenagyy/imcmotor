import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout'
import HomePage from './routes/HomePage'
import CollectionPage from './routes/CollectionPage'
import ProductPage from './routes/ProductPage'
import CartPage from './routes/CartPage'
import CheckoutPage from './routes/CheckoutPage'
import ServicePage from './routes/ServicePage'
import ServiceBookingPage from './routes/ServiceBookingPage'
import RentalPage from './routes/RentalPage'
import ContactPage from './routes/ContactPage'
import NewsPage from './routes/NewsPage'
import NewsArticlePage from './routes/NewsArticlePage'
import StubPage from './routes/StubPage'
import NotFoundPage from './routes/NotFoundPage'

// Collection routes share one data-driven page (PRD §7/§8).
const COLLECTION_HANDLES = [
  'vespa',
  'aprilia',
  'moto-guzzi',
  'piaggio',
  'ujdonsagok',
  'kiarusitas',
  'b125',
  'kiegeszitok',
  'hasznalt-motorok',
]

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />

        {COLLECTION_HANDLES.map((h) => (
          <Route key={h} path={h} element={<CollectionPage key={h} handle={h} />} />
        ))}

        <Route path="termek/:handle" element={<ProductPage />} />
        <Route path="kosar" element={<CartPage />} />
        <Route path="penztar" element={<CheckoutPage />} />
        <Route path="szerviz" element={<ServicePage />} />
        <Route path="szerviz/foglalas" element={<ServiceBookingPage />} />
        <Route path="berles" element={<RentalPage />} />
        <Route path="kapcsolat" element={<ContactPage />} />
        <Route path="hirek" element={<NewsPage />} />
        <Route path="hirek/:slug" element={<NewsArticlePage />} />

        {/* Deferred to later phases — on-brand placeholders keep nav complete (PRD §15) */}
        <Route
          path="finanszirozas"
          element={
            <StubPage
              eyebrow="Finanszírozás"
              title="Finanszírozás"
              intro="Rugalmas finanszírozási lehetőségek – részletek hamarosan."
              crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Finanszírozás' }]}
            />
          }
        />
        <Route
          path="garancia"
          element={
            <StubPage
              eyebrow="Garancia"
              title="Kiterjesztett garancia"
              intro="Hosszabbított garancia a nyugodt motorozásért – részletek hamarosan."
              crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Garancia' }]}
            />
          }
        />
        <Route
          path="motorhotel"
          element={
            <StubPage
              eyebrow="Motorhotel"
              title="Motorhotel – szezonális tárolás"
              intro="Biztonságos, fűtött téli tárolás motorodnak – részletek hamarosan."
              crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Motorhotel' }]}
            />
          }
        />

        {/* Account (UI-only, later phase) */}
        <Route
          path="fiok"
          element={
            <StubPage
              eyebrow="Fiók"
              title="Fiókom"
              intro="A fiók-felületek (belépés, rendelések, kedvencek) a következő ütemben készülnek el."
              crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Fiók' }]}
            />
          }
        />
        <Route
          path="fiok/belepes"
          element={<StubPage eyebrow="Fiók" title="Belépés" crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Fiók', to: '/fiok' }, { label: 'Belépés' }]} />}
        />
        <Route
          path="fiok/regisztracio"
          element={<StubPage eyebrow="Fiók" title="Regisztráció" crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Fiók', to: '/fiok' }, { label: 'Regisztráció' }]} />}
        />
        <Route
          path="fiok/rendelesek"
          element={<StubPage eyebrow="Fiók" title="Rendeléseim" crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Fiók', to: '/fiok' }, { label: 'Rendelések' }]} />}
        />
        <Route
          path="fiok/kedvencek"
          element={<StubPage eyebrow="Fiók" title="Kedvenceim" crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Fiók', to: '/fiok' }, { label: 'Kedvencek' }]} />}
        />

        {/* Legal / info (placeholder copy — needs legal review) */}
        <Route
          path="info/aszf"
          element={<StubPage eyebrow="Információ" title="Általános Szerződési Feltételek (ÁSZF)" note="A jogi szövegek feltöltése folyamatban – jogi ellenőrzés szükséges." crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'ÁSZF' }]} />}
        />
        <Route
          path="info/adatkezeles"
          element={<StubPage eyebrow="Információ" title="Adatkezelési tájékoztató" note="A jogi szövegek feltöltése folyamatban – jogi ellenőrzés szükséges." crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Adatkezelés' }]} />}
        />
        <Route
          path="info/fizetes"
          element={<StubPage eyebrow="Információ" title="Fizetési tájékoztató" crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Fizetés' }]} />}
        />
        <Route
          path="info/szallitas"
          element={<StubPage eyebrow="Információ" title="Szállítási tájékoztató" crumbs={[{ label: 'Főoldal', to: '/' }, { label: 'Szállítás' }]} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
