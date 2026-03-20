'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function Hero() {
  return (
    <section className="bg-chalk px-6 pb-20 pt-32 md:px-12 md:pb-32 md:pt-44 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <AnimatedText
          text="Le design normand, collectif et engagé."
          as="h1"
          className="font-display text-display-xl italic text-ink"
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
            répondre aux enjeux de transition.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4"
          >
            <Button href="/rejoindre" variant="primary" size="lg">
              Rejoindre la communauté
            </Button>
            <Button href="/annuaire" variant="secondary" size="lg">
              Explorer l&apos;annuaire
            </Button>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="font-mono text-sm text-flint"
          >
            47 designers inscrits
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
