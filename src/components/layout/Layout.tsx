import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnnouncementBar } from './AnnouncementBar'
import { Header } from './Header'
import { Footer } from './Footer'
import { CartDrawer } from '@/components/commerce/CartDrawer'

/** Resets scroll to top on route change. */
function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only rounded-md bg-ink px-4 py-2 text-paper focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80]"
      >
        Ugrás a tartalomhoz
      </a>
      <ScrollManager />
      <AnnouncementBar />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
