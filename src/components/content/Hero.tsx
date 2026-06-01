import { motion } from 'motion/react'
import { homeContent } from '@/data'
import { Button, Container, Eyebrow } from '@/components/ui'
import { Media } from '@/components/ui/Media'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Staggered load reveal. prefers-reduced-motion is handled globally via
// <MotionConfig reducedMotion="user"> (see main.tsx) — transforms drop, opacity stays.
function fade(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  }
}

export function Hero() {
  const h = homeContent.hero
  return (
    <section className="relative overflow-hidden">
      <Container className="grid items-center gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className="order-2 lg:order-1">
          <motion.div {...fade(0.05)}>
            <Eyebrow className="text-accent">{h.eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1 {...fade(0.13)} className="t-display mt-4">
            {h.title}
          </motion.h1>
          <motion.p {...fade(0.21)} className="t-lead mt-5 max-w-md">
            {h.subtitle}
          </motion.p>
          <motion.div {...fade(0.29)} className="mt-8 flex flex-wrap gap-3">
            <Button to={h.primaryCta.to} size="lg">
              {h.primaryCta.label}
            </Button>
            <Button to={h.secondaryCta.to} variant="ghost" size="lg">
              {h.secondaryCta.label}
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease }}
          className="order-1 overflow-hidden rounded-md lg:order-2"
        >
          <Media image={h.image} priority />
        </motion.div>
      </Container>
    </section>
  )
}
