import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Ateliers & Rencontres — Design Lab Normandie',
  description:
    'Retrouvez les ateliers collaboratifs et rencontres organisés par Design Lab Normandie : sessions de co-construction, permanences et échanges.',
}

type EventFormat = 'Visio' | 'Présentiel'

type EventItem = {
  title: string
  date: string
  format: EventFormat
  city?: string
  description: string
  cta?: { label: string; href: string }
  isPast?: boolean
}

const UPCOMING_EVENTS: EventItem[] = [
  {
    title: 'Atelier de co-construction #1',
    date: '15 avril 2026',
    format: 'Visio',
    description:
      'Premier atelier collaboratif pour définir ensemble les valeurs et la charte de la communauté Design Lab Normandie.',
    cta: { label: "S'inscrire", href: '#' },
  },
  {
    title: 'Permanence designers — Rouen',
    date: '22 avril 2026',
    format: 'Présentiel',
    city: 'Rouen',
    description:
      "Temps d'échange informel à la CCI de Rouen pour rencontrer l'équipe et partager tes retours.",
    cta: { label: "S'inscrire", href: '#' },
  },
  {
    title: 'Atelier de co-construction #2',
    date: '6 mai 2026',
    format: 'Visio',
    description:
      'Deuxième session dédiée à la définition des services et ressources que le Lab peut offrir aux designers normands.',
    cta: { label: "S'inscrire", href: '#' },
  },
]

const PAST_EVENTS: EventItem[] = [
  {
    title: 'Réunion de lancement',
    date: '18 mars 2026',
    format: 'Visio',
    description:
      'Première rencontre avec 12 designers volontaires pour présenter le projet et recueillir les premières impressions.',
    isPast: true,
  },
]

function FormatBadge({ format }: { format: EventFormat }) {
  return (
    <span
      className={
        format === 'Visio'
          ? 'border border-flint/30 bg-chalk px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-flint'
          : 'border border-earth/30 bg-earth/5 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-earth'
      }
    >
      {format}
    </span>
  )
}

function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="flex flex-col gap-4 border border-slate bg-white p-8 transition-colors hover:bg-chalk">
      <div className="flex flex-wrap items-start gap-3">
        <span className="border border-colza bg-colza/10 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-ink">
          {event.date}
        </span>
        <FormatBadge format={event.format} />
        {event.city && (
          <span className="border border-flint/20 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-flint">
            {event.city}
          </span>
        )}
      </div>

      <h3 className="font-display text-xl font-bold text-ink">{event.title}</h3>

      <p className="flex-1 text-sm leading-relaxed text-flint">
        {event.description}
      </p>

      {event.cta ? (
        <div className="pt-2">
          <Button href={event.cta.href} variant="secondary" size="sm">
            {event.cta.label}
          </Button>
        </div>
      ) : event.isPast ? (
        <div className="pt-2">
          <span className="border border-flint/20 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-flint/50">
            Complet
          </span>
        </div>
      ) : null}
    </article>
  )
}

export default function AteliersPage() {
  return (
    <div className="min-h-screen bg-chalk">
      {/* Page header */}
      <div className="border-b border-slate bg-chalk">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 lg:px-20">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
            / 01 — Ateliers &amp; Rencontres
          </p>
          <h1 className="font-display text-display-lg font-bold text-ink">
            Ateliers &amp; Rencontres
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-flint">
            Co-construisons ensemble la communauté Design Lab Normandie.
            Rejoignez nos ateliers et prenez part aux décisions qui façonnent le réseau.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-20 space-y-16">
        {/* À venir */}
        <section>
          <div className="mb-8 border-b border-slate pb-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
              À venir
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {UPCOMING_EVENTS.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
          </div>
        </section>

        {/* Passés */}
        <section>
          <div className="mb-8 border-b border-slate pb-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
              Passés
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PAST_EVENTS.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
