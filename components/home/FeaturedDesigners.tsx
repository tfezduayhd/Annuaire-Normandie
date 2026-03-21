import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { MOCK_DESIGNERS } from '@/lib/mock-data'
import { DISCIPLINES, TERRITORIES } from '@/lib/constants'

const featured = MOCK_DESIGNERS.filter((d) => d.status === 'APPROVED').slice(0, 3)

export function FeaturedDesigners() {
  return (
    <section className="border-b border-slate/10 bg-chalk px-6 py-section md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionLabel number="02" label="ANNUAIRE DES DESIGNERS" className="mb-4" />
        <h2 className="font-display text-display-md font-bold text-ink">
          Derniers inscrits
        </h2>

        <div className="mt-12 grid gap-px bg-slate/10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((designer) => (
            <Link
              key={designer.id}
              href={`/annuaire/${designer.slug}`}
              className="group flex flex-col bg-white p-6 transition-colors hover:bg-chalk"
            >
              {/* Initials */}
              <div className="mb-4 flex h-14 w-14 items-center justify-center border border-slate bg-chalk font-display text-lg font-bold text-ink">
                {designer.firstName[0]}
                {designer.lastName[0]}
              </div>

              <h3 className="font-display text-lg font-bold text-ink">
                {designer.firstName} {designer.lastName}
              </h3>

              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-flint">
                {designer.city} — {TERRITORIES[designer.territory as keyof typeof TERRITORIES]}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {designer.disciplines.slice(0, 2).map((d) => (
                  <span
                    key={d}
                    className="border border-slate/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-earth"
                  >
                    {DISCIPLINES[d as keyof typeof DISCIPLINES]}
                  </span>
                ))}
              </div>

              <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-flint">
                {designer.bio}
              </p>

              <span className="mt-auto pt-4 font-mono text-xs text-earth transition-colors group-hover:text-moss">
                Voir le profil →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/annuaire" variant="secondary" size="md">
            Voir tout l&apos;annuaire&nbsp;&rarr;
          </Button>
        </div>
      </div>
    </section>
  )
}
