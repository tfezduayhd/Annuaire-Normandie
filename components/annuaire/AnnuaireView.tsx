'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { DesignerGrid } from '@/components/annuaire/DesignerGrid'
import { MapView } from '@/components/annuaire/MapView'
import type { DesignerCardData } from '@/types'

type View = 'list' | 'map'

type PaginationProps = {
  currentPage: number
  totalPages: number
  searchParams: Record<string, string | undefined>
}

function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
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

type AnnuaireViewProps = {
  allDesigners: DesignerCardData[]
  pageDesigners: DesignerCardData[]
  total: number
  currentPage: number
  totalPages: number
  searchParams: Record<string, string | undefined>
}

export function AnnuaireView({
  allDesigners,
  pageDesigners,
  total,
  currentPage,
  totalPages,
  searchParams,
}: AnnuaireViewProps) {
  const [view, setView] = useState<View>('list')

  return (
    <div>
      {/* View toggle */}
      <div className="mb-6 flex items-center gap-0 border border-slate self-start w-fit">
        <button
          type="button"
          onClick={() => setView('list')}
          className={cn(
            'px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors',
            view === 'list'
              ? 'bg-slate text-white'
              : 'bg-white text-slate hover:bg-slate/5'
          )}
          aria-pressed={view === 'list'}
        >
          Liste
        </button>
        <button
          type="button"
          onClick={() => setView('map')}
          className={cn(
            'border-l border-slate px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors',
            view === 'map'
              ? 'bg-slate text-white'
              : 'bg-white text-slate hover:bg-slate/5'
          )}
          aria-pressed={view === 'map'}
        >
          Carte
        </button>
      </div>

      {view === 'list' ? (
        <>
          <DesignerGrid designers={pageDesigners} total={total} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={searchParams}
          />
        </>
      ) : (
        <MapView designers={allDesigners} />
      )}
    </div>
  )
}
