'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
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
    <section ref={sectionRef} className="relative border-b border-slate bg-chalk">
      {/* Trame de Reconstruction — interactive grid distortion */}
      <GridDistortion containerRef={sectionRef} />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="border-b border-slate py-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
            / 01 — Pourquoi
          </p>
        </div>

        {/* Pillars */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-10%' }}
          className="grid border-l border-slate md:grid-cols-3"
        >
          {PILLARS.map((pillar) => (
            <motion.article
              key={pillar.number}
              variants={fadeInUp}
              className="border-b border-r border-slate bg-chalk p-10 md:border-b-0"
            >
              {/* Ghost number */}
              <span
                className="block select-none font-display text-7xl font-bold leading-none text-chalk [-webkit-text-stroke:1px_theme(colors.slate)]"
                aria-hidden="true"
              >
                {pillar.number}
              </span>

              {/* Ruled line */}
              <div className="my-5 h-px w-8 bg-earth" />

              <h3 className="font-display text-2xl font-bold text-ink">
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
