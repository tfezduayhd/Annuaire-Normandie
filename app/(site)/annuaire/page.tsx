import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SearchInput } from '@/components/annuaire/SearchInput'
import { FilterBar } from '@/components/annuaire/FilterBar'
import { AnnuaireView } from '@/components/annuaire/AnnuaireView'
import { MOCK_DESIGNERS } from '@/lib/mock-data'
import { DISCIPLINES, STRUCTURES, ITEMS_PER_PAGE } from '@/lib/constants'
import type { DesignerCardData, Discipline, Territory, Structure } from '@/types'

export const metadata: Metadata = {
  title: 'Annuaire — Design Lab Normandie',
  description:
    'Découvrez les designers normands : graphisme, produit, UX/UI, design de service et plus. Trouvez le profil idéal pour votre projet.',
}

// ---------------------------------------------------------------------------
// Filtering helpers (will be replaced by DB queries later)
// ---------------------------------------------------------------------------

function filterDesigners(
  params: Record<string, string | undefined>
): DesignerCardData[] {
  let result = [...MOCK_DESIGNERS]

  // Text search
  const q = params.q?.toLowerCase()
  if (q) {
    result = result.filter(
      (d) =>
        d.firstName.toLowerCase().includes(q) ||
        d.lastName.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.disciplines.some((disc) =>
          DISCIPLINES[disc].toLowerCase().includes(q)
        )
    )
  }

  // Discipline
  const disciplines = params.discipline?.split(',') as Discipline[] | undefined
  if (disciplines?.length) {
    result = result.filter((d) =>
      disciplines.some((disc) => d.disciplines.includes(disc))
    )
  }

  // Territory
  const territories = params.territory?.split(',') as Territory[] | undefined
  if (territories?.length) {
    result = result.filter((d) => territories.includes(d.territory))
  }

  // Structure
  const structure = params.structure as Structure | undefined
  if (structure && structure in STRUCTURES) {
    result = result.filter((d) => d.structure === structure)
  }

  return result
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

type PageProps = {
  searchParams: Record<string, string | undefined>
}

export default function AnnuairePage({ searchParams }: PageProps) {
  const filtered = filterDesigners(searchParams)
  const currentPage = Math.max(1, Number(searchParams.page) || 1)
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const page = Math.min(currentPage, totalPages)

  const start = (page - 1) * ITEMS_PER_PAGE
  const pageDesigners = filtered.slice(start, start + ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen bg-chalk">
      {/* Page header — ruled */}
      <div className="border-b border-slate bg-chalk">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 lg:px-20">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
            / 01 — Annuaire
          </p>
          <h1 className="font-display text-display-lg font-bold text-ink">
            Designers de Normandie
          </h1>
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 lg:px-20">
        <Suspense fallback={null}>
          <SearchInput className="mb-4" />
          <FilterBar />
        </Suspense>

        <AnnuaireView
          allDesigners={filtered as DesignerCardData[]}
          pageDesigners={pageDesigners as DesignerCardData[]}
          total={filtered.length}
          currentPage={page}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      </div>
    </div>
  )
}
