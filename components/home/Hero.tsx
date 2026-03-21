'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { CausticsShader } from '@/components/home/CausticsShader'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate/10 bg-chalk px-6 pb-20 pt-32 md:px-12 md:pb-32 md:pt-44 lg:px-20">
      {/* Caustics shader — subtle light refraction effect */}
      <CausticsShader />

      {/* Architectural grid lines — visible construction grid */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="mx-auto flex h-full max-w-6xl justify-between px-6 md:px-12 lg:px-20">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-full w-px bg-slate/[0.08]"
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section label — institutional numbering */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 block font-mono text-xs uppercase tracking-widest text-flint"
        >
          / 00 — DESIGN LAB NORMANDIE
        </motion.span>

        <AnimatedText
          text="Le design normand, collectif et engagé."
          as="h1"
          className="font-display text-display-xl font-bold text-ink"
          staggerDelay={0.05}
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mt-8 max-w-2xl space-y-8"
        >
          <motion.p
            variants={fadeInUp}
            className="text-lg leading-relaxed text-flint"
          >
            Design Lab Normandie fédère les designers du territoire pour
            répondre aux enjeux de transition. Structure, clarté, vision.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4"
          >
            <Button href="/rejoindre" variant="moss" size="lg">
              Rejoindre la communauté
            </Button>
            <Button href="/annuaire" variant="secondary" size="lg">
              Explorer l&apos;annuaire
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-6 border-t border-slate/10 pt-6"
          >
            <div>
              <span className="font-display text-2xl font-bold text-ink">47</span>
              <span className="ml-1 font-mono text-xs uppercase tracking-wider text-flint">designers</span>
            </div>
            <div className="h-6 w-px bg-slate/10" />
            <div>
              <span className="font-display text-2xl font-bold text-ink">5</span>
              <span className="ml-1 font-mono text-xs uppercase tracking-wider text-flint">départements</span>
            </div>
            <div className="h-6 w-px bg-slate/10" />
            <div>
              <span className="font-display text-2xl font-bold text-ink">12</span>
              <span className="ml-1 font-mono text-xs uppercase tracking-wider text-flint">disciplines</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
