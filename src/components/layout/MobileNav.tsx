import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Phone, X } from 'lucide-react'
import { brandMenus, categoryLinks, primaryNav, site } from '@/data'
import { useScrollLock } from '@/lib/useScrollLock'
import { Button } from '@/components/ui'
import { Logo } from './Logo'

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  useScrollLock(open)

  return (
    <AnimatePresence>
      {open ? (
        <div className="lg:hidden">
          <motion.div
            className="fixed inset-0 z-50 bg-ink/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-paper shadow-[var(--shadow-overlay)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
          >
            <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
              <Logo onClick={onClose} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Menü bezárása"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-sm text-ink transition-colors hover:text-accent"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <p className="t-eyebrow mb-3 text-stone">Modellek</p>
              <ul className="mb-7 space-y-1">
                {brandMenus.map((b) => (
                  <li key={b.to}>
                    <Link
                      to={b.to}
                      onClick={onClose}
                      className="block py-2 font-display text-xl text-ink transition-colors hover:text-accent"
                    >
                      {b.brand}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="t-eyebrow mb-3 text-stone">Vásárlás</p>
              <ul className="mb-7 space-y-1">
                {categoryLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className="block py-1.5 text-ink transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="t-eyebrow mb-3 text-stone">Szolgáltatás</p>
              <ul className="space-y-1">
                {primaryNav.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className="block py-1.5 text-ink transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/fiok"
                    onClick={onClose}
                    className="block py-1.5 text-ink transition-colors hover:text-accent"
                  >
                    Fiók
                  </Link>
                </li>
              </ul>
            </div>

            <div className="border-t border-hairline p-5">
              <Button href={site.phone.href} fullWidth>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone.display}
              </Button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
