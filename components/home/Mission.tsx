'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GridDistortion } from '@/components/home/GridDistortion'
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
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} className="relative border-b border-slate/10 px-6 py-section md:px-12 lg:px-20">
      {/* Trame de Reconstruction — interactive grid distortion */}
      <GridDistortion containerRef={sectionRef} />

      <div className="relative mx-auto max-w-6xl">
        <SectionLabel number="01" label="POURQUOI" className="mb-12" />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-10%' }}
          className="grid gap-px bg-slate/10 md:grid-cols-3"
        >
          {PILLARS.map((pillar) => (
            <motion.article key={pillar.number} variants={fadeInUp} className="bg-chalk p-8">
              <span className="font-display text-display-lg font-bold text-chalk select-none [-webkit-text-stroke:1px_theme(colors.slate)]">
                {pillar.number}
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">
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
