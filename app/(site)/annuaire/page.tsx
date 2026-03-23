import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SearchInput } from '@/components/annuaire/SearchInput'
import { FilterBar } from '@/components/annuaire/FilterBar'
import { DesignerGrid } from '@/components/annuaire/DesignerGrid'
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
// Pagination component
// ---------------------------------------------------------------------------

function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number
  totalPages: number
  searchParams: Record<string, string | undefined>
}) {
  if (totalPages <= 1) return null

  function buildHref(page: number) {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v && k !== 'page') params.set(k, v)
    })
    if (page > 1) params.set('page', String(page))
    const qs = params.toString()
    return qs ? `?${qs}` : '?'
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-center gap-2"
    >
      {currentPage > 1 && (
        <Link
          href={buildHref(currentPage - 1)}
          className="border border-flint/20 px-3 py-2 font-mono text-xs text-flint transition-colors hover:border-flint/40"
        >
          ← Précédent
        </Link>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(p)}
          className={
            p === currentPage
              ? 'bg-slate px-3 py-2 font-mono text-xs text-white'
              : 'border border-flint/20 px-3 py-2 font-mono text-xs text-flint transition-colors hover:border-flint/40'
          }
          aria-current={p === currentPage ? 'page' : undefined}
        >
          {p}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={buildHref(currentPage + 1)}
          className="border border-flint/20 px-3 py-2 font-mono text-xs text-flint transition-colors hover:border-flint/40"
        >
          Suivant →
        </Link>
      )}
    </nav>
  )
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

        <DesignerGrid designers={pageDesigners} total={filtered.length} />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      </div>
    </div>
  )
}
