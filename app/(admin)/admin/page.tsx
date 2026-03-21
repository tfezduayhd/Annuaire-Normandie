import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tableau de bord — Administration',
}

const stats = [
  { label: 'Designers en attente', value: 12, accent: 'border-l-amber-500 bg-amber-50' },
  { label: 'Designers approuvés', value: 48, accent: 'border-l-emerald-500 bg-emerald-50' },
  { label: 'Designers refusés', value: 3, accent: 'border-l-red-500 bg-red-50' },
]

const disciplineStats = [
  { label: 'Design graphique', count: 14 },
  { label: 'Design numérique', count: 11 },
  { label: 'Design produit', count: 8 },
  { label: 'Design de service', count: 7 },
  { label: 'Illustration', count: 6 },
  { label: 'Motion design', count: 5 },
]

const territoryStats = [
  { label: 'Seine-Maritime', count: 18 },
  { label: 'Calvados', count: 15 },
  { label: 'Eure', count: 10 },
  { label: 'Manche', count: 8 },
  { label: 'Orne', count: 6 },
]

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <h2 className="font-display text-2xl text-ink">Tableau de bord</h2>

      {/* Status cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`border border-flint/10 border-l-4 p-6 ${stat.accent}`}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-flint">
              {stat.label}
            </p>
            <p className="mt-2 font-display text-3xl text-ink">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Disciplines */}
        <div className="border border-flint/10 bg-white p-6">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-flint">
            Par discipline
          </h3>
          <ul className="space-y-3">
            {disciplineStats.map((d) => (
              <li key={d.label} className="flex items-center justify-between">
                <span className="text-sm text-slate">{d.label}</span>
                <span className="font-mono text-sm text-ink">{d.count}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Territories */}
        <div className="border border-flint/10 bg-white p-6">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-flint">
            Par territoire
          </h3>
          <ul className="space-y-3">
            {territoryStats.map((t) => (
              <li key={t.label} className="flex items-center justify-between">
                <span className="text-sm text-slate">{t.label}</span>
                <span className="font-mono text-sm text-ink">{t.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
