'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import { EVENT_TYPES } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { fadeInUp, staggerContainer } from '@/lib/animations'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type EventType = keyof typeof EVENT_TYPES

interface MockEvent {
  id: string
  title: string
  slug: string
  description: string
  date: Date
  location: string
  type: EventType
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_EVENTS: MockEvent[] = [
  {
    id: '1',
    title: 'Atelier éco-conception web',
    slug: 'atelier-eco-conception',
    description:
      "Un atelier pratique pour découvrir les principes de l'éco-conception appliqués au design web et numérique.",
    date: new Date('2025-09-15T14:00:00'),
    location: 'Rouen, Le 106',
    type: 'ATELIER',
  },
  {
    id: '2',
    title: 'Conférence — Design et transition',
    slug: 'conference-design-transition',
    description:
      'Table ronde autour du rôle du design dans les transitions écologiques et sociales en Normandie.',
    date: new Date('2025-10-08T18:30:00'),
    location: 'Caen, Le Dôme',
    type: 'CONFERENCE',
  },
  {
    id: '3',
    title: 'Meetup designers normands #12',
    slug: 'meetup-designers-12',
    description:
      'Rencontre mensuelle des designers normands. Présentations, échanges et networking.',
    date: new Date('2025-11-20T19:00:00'),
    location: 'Le Havre, Tetris',
    type: 'MEETUP',
  },
  {
    id: '4',
    title: 'Formation — Design de service public',
    slug: 'formation-design-service',
    description:
      'Formation de 2 jours sur les méthodes de design de service appliquées aux politiques publiques.',
    date: new Date('2025-02-10T09:00:00'),
    location: 'Caen, ENSICAEN',
    type: 'FORMATION',
  },
  {
    id: '5',
    title: 'Exposition — Objets redesignés',
    slug: 'exposition-objets-redesignes',
    description:
      'Exposition collective présentant des objets du quotidien repensés par des designers normands.',
    date: new Date('2025-03-22T10:00:00'),
    location: 'Alençon, Musée des Beaux-Arts',
    type: 'EXPOSITION',
  },
  {
    id: '6',
    title: 'Meetup designers normands #11',
    slug: 'meetup-designers-11',
    description:
      "Rencontre mensuelle avec focus sur l'accessibilité numérique.",
    date: new Date('2025-01-16T19:00:00'),
    location: 'Évreux, La Filature',
    type: 'MEETUP',
  },
]

// ---------------------------------------------------------------------------
// AgendaContent — client component with filters & animations
// ---------------------------------------------------------------------------

function AgendaContent() {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')
  const [activeType, setActiveType] = useState<EventType | null>(null)

  const now = new Date()

  const filteredEvents = useMemo(() => {
    const sorted = [...MOCK_EVENTS].sort((a, b) => {
      if (tab === 'upcoming') return a.date.getTime() - b.date.getTime()
      return b.date.getTime() - a.date.getTime()
    })

    return sorted
      .filter((e) =>
        tab === 'upcoming' ? e.date >= now : e.date < now,
      )
      .filter((e) => (activeType ? e.type === activeType : true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, activeType])

  const eventTypes = Object.keys(EVENT_TYPES) as EventType[]

  return (
    <div>
      {/* Tabs */}
      <div className="mb-8 flex gap-3">
        <button
          onClick={() => setTab('upcoming')}
          className={cn(
            'rounded-sm px-5 py-2.5 font-mono text-sm transition-colors',
            tab === 'upcoming'
              ? 'bg-slate text-white'
              : 'border border-flint/30 bg-chalk text-flint hover:bg-flint/5',
          )}
        >
          À venir
        </button>
        <button
          onClick={() => setTab('past')}
          className={cn(
            'rounded-sm px-5 py-2.5 font-mono text-sm transition-colors',
            tab === 'past'
              ? 'bg-slate text-white'
              : 'border border-flint/30 bg-chalk text-flint hover:bg-flint/5',
          )}
        >
          Passés
        </button>
      </div>

      {/* Type filters */}
      <div className="mb-12 flex flex-wrap gap-2">
        <button onClick={() => setActiveType(null)}>
          <Tag active={activeType === null}>Tous</Tag>
        </button>
        {eventTypes.map((type) => (
          <button key={type} onClick={() => setActiveType(type)}>
            <Tag active={activeType === type}>{EVENT_TYPES[type]}</Tag>
          </button>
        ))}
      </div>

      {/* Event list */}
      <motion.ul
        key={`${tab}-${activeType}`}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        {filteredEvents.length === 0 && (
          <p className="py-12 text-center font-mono text-sm text-flint">
            Aucun événement à afficher.
          </p>
        )}

        {filteredEvents.map((event) => {
          const isPast = event.date < now
          return (
            <motion.li key={event.id} variants={fadeInUp}>
              <article
                className={cn(
                  'flex flex-col gap-6 rounded-sm border border-flint/10 bg-white p-6 transition-shadow hover:shadow-sm sm:flex-row sm:items-start',
                  isPast && 'opacity-60',
                )}
              >
                {/* Date block */}
                <div className="flex shrink-0 flex-col items-center sm:w-24">
                  <span className="font-display text-4xl leading-none text-ink">
                    {format(event.date, 'dd', { locale: fr })}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-flint">
                    {format(event.date, 'MMM yyyy', { locale: fr })}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl text-ink">
                      {event.title}
                    </h3>
                    <Tag>{EVENT_TYPES[event.type]}</Tag>
                  </div>

                  <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-flint">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} />
                      {event.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} />
                      {formatDate(event.date)}
                    </span>
                  </div>

                  <p className="mb-4 max-w-prose text-sm leading-relaxed text-slate/70">
                    {event.description}
                  </p>

                  {!isPast && (
                    <Button variant="moss" size="sm">
                      S&apos;inscrire
                    </Button>
                  )}
                </div>
              </article>
            </motion.li>
          )
        })}
      </motion.ul>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page — default export (also client due to "use client" directive)
// ---------------------------------------------------------------------------

export default function AgendaPage() {
  return (
    <div className="bg-chalk px-6 py-section md:px-12 lg:px-20">
      <header className="mb-16">
        <h1 className="font-display text-display-lg italic text-ink">
          Agenda
        </h1>
      </header>

      <SectionLabel number="01" label="ÉVÉNEMENTS" className="mb-8 block" />

      <AgendaContent />
    </div>
  )
}
