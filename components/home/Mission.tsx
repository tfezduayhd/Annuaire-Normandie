'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const PILLARS = [
  {
    number: '01',
    title: 'Fédérer',
    description:
      'Rassembler les designers normands autour d\u2019une identité commune et créer une communauté active et solidaire.',
  },
  {
    number: '02',
    title: 'Promouvoir',
    description:
      'Rendre visible les talents du territoire et valoriser le design comme levier de développement économique.',
  },
  {
    number: '03',
    title: 'Transformer',
    description:
      'Accompagner les transitions écologiques, sociales et numériques par les méthodologies du design.',
  },
] as const

export function Mission() {
  return (
    <section className="px-6 py-section md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionLabel number="01" label="POURQUOI" className="mb-12" />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-10%' }}
          className="grid gap-12 md:grid-cols-3 md:gap-8"
        >
          {PILLARS.map((pillar) => (
            <motion.article key={pillar.number} variants={fadeInUp}>
              <span className="font-display text-display-lg text-chalk select-none [-webkit-text-stroke:1px_theme(colors.slate)]">
                {pillar.number}
              </span>
              <h3 className="mt-2 font-display text-2xl text-ink">
                {pillar.title}
              </h3>
              <p className="mt-3 leading-relaxed text-flint">
                {pillar.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
