'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const PIONEER_LABS = [
  {
    name: "L'Eclozr",
    region: 'Bretagne',
    description: 'Premier lab Design Lab de France, ancré dans le tissu économique breton. Référence pour les labs en création.',
  },
  {
    name: 'Valesense',
    region: 'Pays de la Loire',
    description: 'Lab pionnier des Pays de la Loire, acteur clé dans la structuration du réseau France Design Lab.',
  },
] as const

export function FranceDesignLab() {
  return (
    <section className="border-b border-slate bg-chalk">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="border-b border-slate py-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
            / 03 — Réseau national
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-10%' }}
          className="grid gap-16 py-16 md:grid-cols-2"
        >
          {/* Left — Intro */}
          <div>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-display-md font-bold text-ink"
            >
              France Design Lab &amp; APCI
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-5 leading-relaxed text-flint">
              L&apos;APCI (Agence pour la Promotion de la Création Industrielle) porte
              le programme national <strong>France Design Lab</strong> : un réseau de labs
              régionaux qui fédèrent les designers, accompagnent les projets et mesurent
              l&apos;impact du design sur les territoires.
            </motion.p>
            <motion.p variants={fadeInUp} className="mt-4 leading-relaxed text-flint">
              Design Lab Normandie s&apos;inscrit dans ce réseau pour ancrer le design
              comme levier de transition économique, écologique et sociale en Normandie.
            </motion.p>

            {/* Objectif highlight */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 border border-colza bg-colza/10 p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-flint">
                Objectif national
              </p>
              <p className="mt-2 font-display text-4xl font-bold text-ink">18</p>
              <p className="mt-1 font-mono text-sm uppercase tracking-wide text-ink">
                Labs France Design d&apos;ici 2026
              </p>
              <p className="mt-3 text-sm leading-relaxed text-flint">
                Le programme vise à couvrir l&apos;ensemble des régions françaises,
                avec un réseau de labs actifs portés par des acteurs locaux engagés.
              </p>
            </motion.div>
          </div>

          {/* Right — Pioneer labs */}
          <div>
            <motion.p
              variants={fadeInUp}
              className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-flint"
            >
              Labs pionniers
            </motion.p>

            <div className="flex flex-col gap-0 border border-slate">
              {PIONEER_LABS.map((lab, i) => (
                <motion.div
                  key={lab.name}
                  variants={fadeInUp}
                  className={`p-8 bg-white transition-colors hover:bg-earth/5 ${i > 0 ? 'border-t border-slate' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink">
                        {lab.name}
                      </h3>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-earth">
                        {lab.region}
                      </p>
                    </div>
                    <span className="shrink-0 border border-moss/30 bg-moss/5 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-moss">
                      Pionnier
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-flint">
                    {lab.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p variants={fadeInUp} className="mt-6 text-sm leading-relaxed text-flint">
              Ces labs sont des références pour Design Lab Normandie :
              ils prouvent qu&apos;il est possible de structurer une communauté
              de designers à l&apos;échelle régionale et d&apos;en mesurer l&apos;impact.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
