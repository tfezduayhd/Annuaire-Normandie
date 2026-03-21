'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { CausticsShader } from '@/components/home/CausticsShader'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const STATS = [
  { value: '47', label: 'Designers' },
  { value: '5', label: 'Départements' },
  { value: '12', label: 'Disciplines' },
] as const

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate bg-chalk">
      {/* WebGL caustics — subtle light refraction */}
      <CausticsShader />

      {/* Vertical construction grid lines */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {[16.66, 33.33, 50, 66.66, 83.33].map((pct) => (
          <div
            key={pct}
            style={{ left: `${pct}%` }}
            className="absolute top-0 h-full w-px bg-slate/[0.06]"
          />
        ))}
      </div>

      {/* Ghost "01" architectural number */}
      <div
        className="pointer-events-none absolute right-0 top-0 select-none overflow-hidden leading-none"
        aria-hidden="true"
      >
        <span className="block font-display text-[20vw] font-bold text-slate/[0.04]">
          01
        </span>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 pb-0 pt-36 md:px-12 lg:px-20">
        {/* Section index */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 font-mono text-[11px] uppercase tracking-[0.2em] text-flint"
        >
          / 00 — Design Lab Normandie
        </motion.p>

        {/* Main headline */}
        <motion.h1
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="font-display text-display-xl font-bold leading-[0.9] text-ink"
        >
          {['Le design', 'normand,', 'collectif', 'et engagé.'].map((line, i) => (
            <motion.span
              key={i}
              variants={fadeInUp}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </motion.h1>

        {/* Ruled separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 h-px origin-left bg-slate"
        />

        {/* Body + CTA row */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-10 py-10 md:grid-cols-2 md:gap-16"
        >
          <motion.p variants={fadeInUp} className="text-base leading-relaxed text-flint md:text-lg">
            Design Lab Normandie fédère les designers du territoire pour répondre
            aux enjeux de transition. Structure, clarté, vision prospective.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col justify-center gap-4 sm:flex-row sm:items-center md:justify-start">
            <Button href="/rejoindre" variant="moss" size="lg">
              Rejoindre la communauté
            </Button>
            <Button href="/annuaire" variant="secondary" size="lg">
              Explorer l&apos;annuaire →
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats bar — ruled bottom band */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="border-t border-slate"
        >
          <div className="grid grid-cols-3 divide-x divide-slate">
            {STATS.map(({ value, label }) => (
              <div key={label} className="py-6 pl-6 pr-4">
                <span className="block font-display text-3xl font-bold text-ink md:text-4xl">
                  {value}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-flint">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
