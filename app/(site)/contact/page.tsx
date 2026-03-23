import type { Metadata } from 'next'
import { Mail, MapPin, ExternalLink } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Design Lab Normandie',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-chalk">
      {/* Page header */}
      <div className="border-b border-slate bg-chalk">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 lg:px-20">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
            / 01 — Contact
          </p>
          <h1 className="font-display text-display-lg font-bold text-ink">
            Contact
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left column — Info + Map */}
          <div className="space-y-8">
            <div className="border border-slate divide-y divide-slate/20">
              <div className="flex items-start gap-4 p-5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-flint" strokeWidth={1.5} />
                <div>
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-flint">Email</p>
                  <a
                    href="mailto:contact@designlab-normandie.fr"
                    className="text-sm text-ink underline decoration-slate/30 underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    contact@designlab-normandie.fr
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-flint" strokeWidth={1.5} />
                <div>
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-flint">Adresse</p>
                  <p className="text-sm text-ink">Normandie, France</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5">
                <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-flint" strokeWidth={1.5} />
                <div>
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-flint">Réseaux</p>
                  <div className="flex gap-4">
                    <a href="#" aria-label="LinkedIn (à venir)" aria-disabled="true" className="text-sm text-flint transition-colors hover:text-ink">LinkedIn</a>
                    <a href="#" aria-label="Instagram (à venir)" aria-disabled="true" className="text-sm text-flint transition-colors hover:text-ink">Instagram</a>
                    <a href="#" aria-label="Twitter (à venir)" aria-disabled="true" className="text-sm text-flint transition-colors hover:text-ink">Twitter</a>
                  </div>
                </div>
              </div>
            </div>

            {/* SVG Map of Normandy */}
            <div className="border border-slate bg-white p-6">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-flint">
                Les 5 départements normands
              </p>
              <svg
                viewBox="0 0 500 300"
                className="w-full"
                aria-label="Carte de la Normandie avec ses 5 départements"
              >
                {/* Manche — west */}
                <path
                  d="M30 60 L100 40 L120 100 L110 180 L60 200 L20 150 Z"
                  className="fill-moss/10 stroke-moss/40"
                  strokeWidth="1.5"
                />
                <text x="65" y="125" className="fill-ink text-[10px]" textAnchor="middle">
                  Manche
                </text>

                {/* Calvados — center-north */}
                <path
                  d="M120 40 L240 30 L250 100 L230 140 L120 100 Z"
                  className="fill-earth/10 stroke-earth/40"
                  strokeWidth="1.5"
                />
                <text x="185" y="85" className="fill-ink text-[10px]" textAnchor="middle">
                  Calvados
                </text>

                {/* Orne — center-south */}
                <path
                  d="M110 180 L120 100 L230 140 L240 220 L130 240 Z"
                  className="fill-slate/10 stroke-slate/40"
                  strokeWidth="1.5"
                />
                <text x="170" y="185" className="fill-ink text-[10px]" textAnchor="middle">
                  Orne
                </text>

                {/* Eure — east-south */}
                <path
                  d="M250 100 L240 220 L380 240 L400 140 L370 90 Z"
                  className="fill-flint/10 stroke-flint/40"
                  strokeWidth="1.5"
                />
                <text x="320" y="175" className="fill-ink text-[10px]" textAnchor="middle">
                  Eure
                </text>

                {/* Seine-Maritime — east-north */}
                <path
                  d="M240 30 L370 20 L470 50 L470 90 L400 140 L370 90 L250 100 Z"
                  className="fill-ink/5 stroke-ink/30"
                  strokeWidth="1.5"
                />
                <text x="380" y="75" className="fill-ink text-[10px]" textAnchor="middle">
                  Seine-Maritime
                </text>
              </svg>
            </div>
          </div>

          {/* Right column — Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
