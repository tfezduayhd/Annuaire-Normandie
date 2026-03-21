'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function CTAJoindre() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <section className="border-b border-slate bg-chalk">
      <div className="mx-auto max-w-7xl">
        {/* Colza accent bar */}
        <div className="h-1 bg-colza" />

        <div className="px-6 py-16 md:px-12 lg:px-20">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-10%' }}
            className="grid gap-12 md:grid-cols-2 md:items-center"
          >
            {/* Left — headline */}
            <div>
              <motion.p variants={fadeInUp} className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
                / 04 — Rejoindre
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-display-md font-bold text-ink"
              >
                Rejoignez le mouvement
              </motion.h2>
              <motion.p variants={fadeInUp} className="mt-5 max-w-md leading-relaxed text-flint">
                Inscrivez-vous à la newsletter pour suivre l&apos;actualité du
                design en Normandie.
              </motion.p>
            </div>

            {/* Right — CTA */}
            <motion.div variants={fadeInUp}>
              {submitted ? (
                <div
                  className="border border-slate bg-slate px-6 py-5 text-chalk"
                  role="status"
                >
                  <p className="font-display text-lg font-bold">
                    Merci, vous êtes inscrit·e !
                  </p>
                  <p className="mt-1 text-sm text-chalk/70">
                    Vous serez tenu·e informé·e des actualités du réseau.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-0 sm:flex-row">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Adresse e-mail
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 border border-b-0 border-slate bg-white px-4 py-3 text-ink placeholder:text-flint focus:outline-none focus:ring-2 focus:ring-inset focus:ring-earth sm:border-b sm:border-r-0"
                  />
                  <Button type="submit" variant="moss" size="lg">
                    S&apos;inscrire
                  </Button>
                </form>
              )}

              <div className="mt-6 flex items-center gap-3 border-t border-slate/20 pt-6">
                <div className="h-px flex-1 bg-slate/20" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-flint">
                  ou
                </span>
                <div className="h-px flex-1 bg-slate/20" />
              </div>

              <div className="mt-6">
                <Button href="/rejoindre" variant="earth" size="lg" className="w-full justify-center">
                  Créer un profil designer →
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
