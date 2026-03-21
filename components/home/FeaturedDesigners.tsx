import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { MOCK_DESIGNERS } from '@/lib/mock-data'
import { DISCIPLINES, TERRITORIES } from '@/lib/constants'

const featured = MOCK_DESIGNERS.filter((d) => d.status === 'APPROVED').slice(0, 3)

export function FeaturedDesigners() {
  return (
    <section className="border-b border-slate bg-chalk">
      {/* Section header — ruled */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="border-b border-slate py-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
                / 02 — Annuaire des designers
              </p>
              <h2 className="font-display text-display-md font-bold text-ink">
                Derniers inscrits
              </h2>
            </div>
            <Button href="/annuaire" variant="secondary" size="md">
              Voir tout l&apos;annuaire →
            </Button>
          </div>
        </div>
      </div>

      {/* Designer cards grid */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-slate border border-slate">
          {featured.map((designer) => (
            <Link
              key={designer.id}
              href={`/annuaire/${designer.slug}`}
              className="group relative bg-white"
            >
              {/* Block-offset accent — earth color layer behind on hover */}
              <div
                className="absolute inset-0 bg-earth opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                aria-hidden="true"
              />
              {/* Card content lifted on hover */}
              <div className="relative bg-white p-6 transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1">
                {/* Initials monogram */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center border border-slate bg-chalk font-display text-base font-bold text-ink">
                  {designer.firstName[0]}
                  {designer.lastName[0]}
                </div>

                <h3 className="font-display text-xl font-bold text-ink">
                  {designer.firstName} {designer.lastName}
                </h3>

                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-flint">
                  {designer.city} — {TERRITORIES[designer.territory as keyof typeof TERRITORIES]}
                </p>

                {/* Ruled separator */}
                <div className="my-4 h-px bg-slate/20" />

                {/* Disciplines */}
                <div className="flex flex-wrap gap-2">
                  {designer.disciplines.slice(0, 2).map((d) => (
                    <span
                      key={d}
                      className="border border-slate px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-earth"
                    >
                      {DISCIPLINES[d as keyof typeof DISCIPLINES]}
                    </span>
                  ))}
                </div>

                <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-flint">
                  {designer.bio}
                </p>

                <p className="mt-5 font-mono text-xs text-earth">
                  Voir le profil →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
