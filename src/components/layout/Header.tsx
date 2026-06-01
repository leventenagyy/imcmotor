import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Heart, Menu, ShoppingBag, User } from 'lucide-react'
import { brandMenus, categoryLinks, primaryNav } from '@/data'
import { useCart } from '@/lib/cart'
import { cn } from '@/lib/cn'
import { Container } from '@/components/ui'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'

function navLinkClass({ isActive }: { isActive: boolean }) {
  return cn(
    'text-sm font-medium transition-colors hover:text-accent',
    isActive ? 'text-accent' : 'text-ink',
  )
}

export function Header() {
  const location = useLocation()
  const { count, openCart } = useCart()
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Close menus on navigation.
  useEffect(() => {
    setMegaOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  // Subtle border once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes the mega menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Click outside the header closes the mega menu (the header's backdrop-blur
  // would trap a fixed backdrop element, so we use a listener instead).
  useEffect(() => {
    if (!megaOpen) return
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMegaOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [megaOpen])

  return (
    <header
      ref={headerRef}
      className={cn(
        'sticky top-0 z-30 bg-paper/90 backdrop-blur transition-colors',
        (scrolled || megaOpen) && 'border-b border-hairline',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Fő navigáció">
          <button
            type="button"
            onClick={() => setMegaOpen((v) => !v)}
            aria-expanded={megaOpen}
            className={cn(
              'flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors hover:text-accent',
              megaOpen ? 'text-accent' : 'text-ink',
            )}
          >
            Modellek
            <ChevronDown
              className={cn('h-4 w-4 transition-transform', megaOpen && 'rotate-180')}
              aria-hidden="true"
            />
          </button>
          {primaryNav.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Utility icons */}
        <div className="flex items-center gap-0.5">
          <Link
            to="/fiok/kedvencek"
            aria-label="Kedvencek"
            className="hidden h-11 w-11 cursor-pointer place-items-center rounded-sm text-ink transition-colors hover:text-accent sm:grid"
          >
            <Heart className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            to="/fiok"
            aria-label="Fiók"
            className="hidden h-11 w-11 cursor-pointer place-items-center rounded-sm text-ink transition-colors hover:text-accent sm:grid"
          >
            <User className="h-5 w-5" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Kosár (${count} tétel)`}
            className="relative grid h-11 w-11 cursor-pointer place-items-center rounded-sm text-ink transition-colors hover:text-accent"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {count > 0 ? (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[0.625rem] font-semibold leading-none text-accent-ink">
                {count}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Menü megnyitása"
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-sm text-ink transition-colors hover:text-accent lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </Container>

      {/* Mega menu (desktop) */}
      <AnimatePresence>
        {megaOpen ? (
          <motion.div
            className="absolute inset-x-0 top-full z-40 hidden border-b border-hairline bg-paper shadow-[var(--shadow-overlay)] lg:block"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Container className="grid grid-cols-5 gap-8 py-10">
                {brandMenus.map((b) => (
                  <div key={b.to}>
                    <Link
                      to={b.to}
                      className="font-display text-lg text-ink transition-colors hover:text-accent"
                    >
                      {b.brand}
                    </Link>
                    <p className="mt-0.5 text-xs text-stone">{b.tagline}</p>
                    <ul className="mt-4 space-y-2">
                      {b.models.map((m) => (
                        <li key={m.to}>
                          <Link
                            to={m.to}
                            className="text-sm text-stone transition-colors hover:text-accent"
                          >
                            {m.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div>
                  <p className="t-eyebrow text-stone">Vásárlás</p>
                  <ul className="mt-4 space-y-2">
                    {categoryLinks.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className="text-sm text-ink transition-colors hover:text-accent"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Container>
            </motion.div>
        ) : null}
      </AnimatePresence>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
