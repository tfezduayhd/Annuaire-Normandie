import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Image as ImageIcon, ArrowLeft } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Tag } from '@/components/ui/Tag'
import { MOCK_DESIGNERS } from '@/lib/mock-data'
import { DISCIPLINES, TRANSITION_FOCUSES } from '@/lib/constants'
import type { Discipline, TransitionFocus } from '@/types'

function findProjectBySlug(slug: string) {
  for (const designer of MOCK_DESIGNERS) {
    const project = designer.projects.find((p) => p.slug === slug)
    if (project) {
      return { project, designer }
    }
  }
  return null
}

export function generateStaticParams() {
  return MOCK_DESIGNERS.flatMap((designer) =>
    designer.projects.map((project) => ({ slug: project.slug }))
  )
}

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  const result = findProjectBySlug(params.slug)
  if (!result) {
    return { title: 'Projet introuvable — Design Lab Normandie' }
  }
  return {
    title: `${result.project.title} — Design Lab Normandie`,
    description: result.project.description ?? undefined,
  }
}

export default function ProjetDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const result = findProjectBySlug(params.slug)
  if (!result) {
    notFound()
  }

  const { project, designer } = result
  const disciplines = designer.disciplines.map(
    (d: Discipline) => DISCIPLINES[d] ?? d
  )
  const transitionFocuses = designer.transitionFocuses.map(
    (t: TransitionFocus) => TRANSITION_FOCUSES[t] ?? t
  )

  return (
    <div className="bg-chalk">
      {/* Hero image placeholder */}
      <div className="w-full aspect-[21/9] bg-slate/10 flex items-center justify-center">
        <ImageIcon className="h-16 w-16 text-flint" />
      </div>

      <div className="mx-auto max-w-4xl px-6 py-section md:px-12">
        {/* Back link */}
        <Link
          href="/projets"
          className="mb-8 inline-flex items-center gap-2 text-sm text-flint hover:text-slate transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux projets
        </Link>

        {/* Title */}
        <h1 className="font-display text-display-md font-bold text-ink mt-4 mb-10">
          {project.title}
        </h1>

        {/* Info grid */}
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 border-t border-flint/20 pt-8">
          <div>
            <dt className="font-mono text-xs uppercase tracking-widest text-flint mb-1">
              Designer
            </dt>
            <dd>
              <Link
                href={`/annuaire/${designer.slug}`}
                className="text-sm text-ink hover:text-earth transition-colors"
              >
                {designer.firstName} {designer.lastName}
              </Link>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-widest text-flint mb-1">
              Année
            </dt>
            <dd className="font-mono text-sm text-ink">
              {project.year ?? '—'}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-widest text-flint mb-1">
              Client
            </dt>
            <dd className="text-sm text-ink">—</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-widest text-flint mb-1">
              Disciplines
            </dt>
            <dd className="flex flex-wrap gap-1.5 mt-1">
              {disciplines.map((d: string) => (
                <Tag key={d} className="text-xs">
                  {d}
                </Tag>
              ))}
            </dd>
          </div>
        </dl>

        {/* Transition tags */}
        {transitionFocuses.length > 0 && (
          <div className="mb-12">
            <h2 className="font-mono text-xs uppercase tracking-widest text-flint mb-3">
              Thématiques de transition
            </h2>
            <div className="flex flex-wrap gap-2">
              {transitionFocuses.map((t: string) => (
                <Tag key={t} active className="text-xs">
                  {t}
                </Tag>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {project.description && (
          <div className="mb-16">
            <p className="text-base leading-relaxed text-ink/80 font-sans">
              {project.description}
            </p>
          </div>
        )}

        {/* Designer card */}
        <div className="border-t border-flint/20 pt-10">
          <SectionLabel number="00" label="DESIGNER" className="mb-4" />
          <Link
            href={`/annuaire/${designer.slug}`}
            className="block border border-flint/20 p-6 hover:border-moss/40 transition-colors"
          >
            <p className="font-display text-lg text-ink">
              {designer.firstName} {designer.lastName}
            </p>
            <p className="mt-1 text-sm text-flint">
              {disciplines.join(' · ')}
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
