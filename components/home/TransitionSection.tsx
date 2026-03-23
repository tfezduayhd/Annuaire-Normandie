'use client'

import { motion } from 'framer-motion'
import {
  Leaf,
  Users,
  Monitor,
  Recycle,
  Heart,
  Stethoscope,
} from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { TRANSITION_FOCUSES } from '@/lib/constants'
import type { LucideIcon } from 'lucide-react'

type TransitionTheme = {
  key: string
  label: string
  icon: LucideIcon
}

const THEMES: TransitionTheme[] = [
  { key: 'ECOLOGIQUE', label: TRANSITION_FOCUSES.ECOLOGIQUE, icon: Leaf },
  { key: 'SOCIALE', label: TRANSITION_FOCUSES.SOCIALE, icon: Users },
  {
    key: 'NUMERIQUE_RESPONSABLE',
    label: TRANSITION_FOCUSES.NUMERIQUE_RESPONSABLE,
    icon: Monitor,
  },
  {
    key: 'ECONOMIE_CIRCULAIRE',
    label: TRANSITION_FOCUSES.ECONOMIE_CIRCULAIRE,
    icon: Recycle,
  },
  { key: 'INCLUSION', label: TRANSITION_FOCUSES.INCLUSION, icon: Heart },
  { key: 'SANTE', label: TRANSITION_FOCUSES.SANTE, icon: Stethoscope },
]

export function TransitionSection() {
  return (
    <section className="border-b border-slate bg-earth text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="border-b border-white/20 px-6 py-8 md:px-12 lg:px-20">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
            / 03 — Transitions
          </p>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-10%' }}
          >
            <motion.h2
              variants={fadeInUp}
              className="max-w-3xl font-display text-display-md font-bold"
            >
              Le design au service des transitions
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 max-w-2xl leading-relaxed text-white/70"
            >
              Le design est un outil puissant pour repenser nos modes de vie, nos
              services et nos territoires.
            </motion.p>
          </motion.div>
        </div>

        {/* Theme grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-10%' }}
          className="grid border-l border-white/20 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
        >
          {THEMES.map(({ key, label, icon: Icon }) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              className="group flex flex-col items-center gap-4 border-b border-r border-white/20 px-4 py-8 text-center transition-colors hover:bg-white/10 lg:border-b-0"
            >
              <Icon
                className="h-6 w-6 text-white/80 transition-colors group-hover:text-colza"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
