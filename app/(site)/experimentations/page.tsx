import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Expérimentations — Design Lab Normandie',
  description:
    'Comment construit-on une communauté de designers sur un territoire ? Découvrez les actions menées par Design Lab Normandie.',
}

type ActionStatus = 'En cours' | 'Terminé' | 'À venir'

type Action = {
  title: string
  status: ActionStatus
  description: string
  results?: string
}

const ACTIONS: Action[] = [
  {
    title: 'Campagne LinkedIn',
    status: 'En cours',
    description:
      'Série de publications ciblant les designers normands pour constituer une base de contact initiale.',
    results: '+120 abonnés en 3 semaines, 15 prises de contact directes',
  },
  {
    title: 'Ateliers collaboratifs',
    status: 'À venir',
    description:
      'Sessions de co-construction en visio et présentiel pour définir les besoins de la communauté.',
  },
  {
    title: 'Sondage designers',
    status: 'Terminé',
    description:
      'Questionnaire diffusé auprès de 40 designers normands sur leurs pratiques, besoins et attentes.',
    results: '38 réponses analysées, 3 profils types identifiés',
  },
  {
    title: 'Interviews terrain',
    status: 'En cours',
    description:
      "Série d\u2019entretiens individuels approfondis avec des designers du territoire (objectif\u00a0: 20 interviews).",
  },
  {
    title: "Analyse d'annuaires existants",
    status: 'Terminé',
    description:
      "Étude comparative de 8 annuaires de designers en France (dont Bretagne, Pays de la Loire) pour s\u2019en inspirer.",
  },
  {
    title: 'Rencontres partenaires CCI/Région',
    status: 'En cours',
    description:
      "Prise de contact et échanges avec les acteurs économiques pour ancrer le Lab dans l\u2019écosystème normand.",
  },
]

function StatusBadge({ status }: { status: ActionStatus }) {
  if (status === 'En cours') {
    return (
      <span className="border border-moss/40 bg-moss/10 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-moss">
        En cours
      </span>
    )
  }
  if (status === 'Terminé') {
    return (
      <span className="border border-slate/40 bg-slate/10 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-slate">
        Terminé
      </span>
    )
  }
  return (
    <span className="bg-colza px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-ink">
      À venir
    </span>
  )
}

export default function ExperimentationsPage() {
  return (
    <div className="min-h-screen bg-chalk">
      {/* Page header */}
      <div className="border-b border-slate bg-chalk">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 lg:px-20">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
            / 01 — Expérimentations
          </p>
          <h1 className="font-display text-display-lg font-bold text-ink">
            Comment construit-on une communauté de designers&nbsp;?
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-flint">
            Comment construit-on une communauté de designers sur un territoire ?
            Voici les actions que nous menons.
          </p>
        </div>
      </div>

      {/* Actions grid */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-20">
        <div className="grid gap-px border border-slate bg-slate sm:grid-cols-2 lg:grid-cols-3">
          {ACTIONS.map((action) => (
            <article
              key={action.title}
              className="flex flex-col gap-4 bg-chalk p-8 transition-colors hover:bg-white"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-lg font-bold text-ink">
                  {action.title}
                </h2>
                <StatusBadge status={action.status} />
              </div>

              <p className="flex-1 text-sm leading-relaxed text-flint">
                {action.description}
              </p>

              {action.results && (
                <div className="border-t border-slate/20 pt-4">
                  <p className="mb-1 font-mono text-[9px] uppercase tracking-widest text-earth">
                    Premiers résultats
                  </p>
                  <p className="text-sm leading-relaxed text-ink">
                    {action.results}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
