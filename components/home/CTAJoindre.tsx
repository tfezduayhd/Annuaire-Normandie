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
    <section className="bg-moss px-6 py-section text-white md:px-12 lg:px-20">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-10%' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="font-display text-display-md italic"
          >
            Rejoignez le mouvement
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-6 leading-relaxed text-white/80"
          >
            Inscrivez-vous à la newsletter pour suivre l&apos;actualité du
            design en Normandie.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-10">
            {submitted ? (
              <p className="font-medium" role="status">
                Merci ! Vous serez tenu·e informé·e. 🎉
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
              >
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
                  className="flex-1 rounded-sm bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
                <Button type="submit" variant="primary" size="lg" className="bg-white text-moss hover:bg-white/90">
                  S&apos;inscrire
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
