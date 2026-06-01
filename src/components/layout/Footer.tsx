import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { site, footerColumns } from '@/data'
import { Container } from '@/components/ui'
import { Logo } from './Logo'
import { FacebookIcon, InstagramIcon } from './SocialIcons'

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand + contact */}
          <div className="space-y-5">
            <Logo tone="paper" />
            <p className="max-w-sm text-sm leading-relaxed text-paper/70">{site.intro}</p>
            <ul className="space-y-2 text-sm text-paper/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{site.address.full}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={site.phone.href} className="hover:text-accent">
                  {site.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={`mailto:${site.email.sales}`} className="hover:text-accent">
                  {site.email.sales}
                </a>
              </li>
            </ul>
            <div className="flex gap-3 pt-1">
              <a
                href={site.social.facebook}
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-sm border border-paper/15 text-paper/80 transition-colors hover:border-accent hover:text-accent"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={site.social.instagram}
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-sm border border-paper/15 text-paper/80 transition-colors hover:border-accent hover:text-accent"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="t-eyebrow mb-4 text-paper/60">{col.title}</h3>
                <ul className="space-y-2.5 text-sm">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="text-paper/80 transition-colors hover:text-accent">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-paper/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {2026} {site.legalName} · Minden jog fenntartva.
          </p>
          <p>
            Nyitvatartás: H–P 9–18 · Szo 9–13 · V zárva
          </p>
        </Container>
      </div>
    </footer>
  )
}
