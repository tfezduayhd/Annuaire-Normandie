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
    <section className="bg-earth px-6 py-section text-white md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-10%' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="max-w-3xl font-display text-display-md italic"
          >
            Le design au service des transitions
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-2xl leading-relaxed text-white/80"
          >
            Le design est un outil puissant pour repenser nos modes de vie, nos
            services et nos territoires.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6"
          >
            {THEMES.map(({ key, label, icon: Icon }) => (
              <div
                key={key}
                className="flex flex-col items-center gap-3 rounded-sm bg-white/10 p-6 text-center transition-colors hover:bg-white/20"
              >
                <Icon className="h-7 w-7" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-wider">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
