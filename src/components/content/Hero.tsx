import { motion } from 'motion/react'
import { homeContent } from '@/data'
import { Button, Container, Eyebrow } from '@/components/ui'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Staggered load reveal. prefers-reduced-motion handled globally via
// <MotionConfig reducedMotion="user"> (main.tsx) — transforms drop, opacity stays.
function fade(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  }
}

export function Hero() {
  const h = homeContent.hero
  const hasPhoto = Boolean(h.image.src)

  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      {/* Background layers (dark for contrast). Drop a real photo into
          homeContent.hero.image.src and it becomes the full-bleed background. */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {hasPhoto ? (
          <img
            src={h.image.src ?? undefined}
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        ) : null}
        {/* Overlay for text legibility. With a photo: strong on the left (where
            copy sits) + a bottom scrim so it also reads on narrow screens. */}
        <div
          className="absolute inset-0"
          style={{
            background: hasPhoto
              ? 'linear-gradient(90deg, rgba(16,12,10,0.92) 0%, rgba(16,12,10,0.72) 45%, rgba(16,12,10,0.45) 100%), linear-gradient(0deg, rgba(16,12,10,0.55) 0%, rgba(16,12,10,0) 45%)'
              : 'radial-gradient(125% 125% at 12% 0%, #2a2320 0%, #17130f 52%, #100c0a 100%)',
          }}
        />
        {/* soft Rosso glow */}
        <div className="absolute -left-24 top-[-10%] h-[55vh] w-[55vh] rounded-full bg-accent/25 blur-[130px]" />
        {/* film grain */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay">
          <filter id="hero-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-grain)" />
        </svg>
      </div>

      <Container className="relative flex min-h-[78vh] flex-col justify-center py-20 lg:py-28">
        <div className="max-w-3xl">
          <motion.div {...fade(0.05)}>
            <Eyebrow className="text-accent">{h.eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1 {...fade(0.13)} className="t-display mt-5 text-balance">
            {h.title}
          </motion.h1>
          <motion.p {...fade(0.21)} className="t-lead mt-6 max-w-xl text-paper/75">
            {h.subtitle}
          </motion.p>
          <motion.div {...fade(0.29)} className="mt-9 flex flex-wrap gap-3">
            <Button to={h.primaryCta.to} size="lg">
              {h.primaryCta.label}
            </Button>
            <Button to={h.secondaryCta.to} size="lg" variant="ghostLight">
              {h.secondaryCta.label}
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
