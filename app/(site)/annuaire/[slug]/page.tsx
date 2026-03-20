import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DesignerHero } from '@/components/designer/DesignerHero'
import { DesignerBio } from '@/components/designer/DesignerBio'
import { DesignerSkills } from '@/components/designer/DesignerSkills'
import { DesignerProjects } from '@/components/designer/DesignerProjects'
import { MOCK_DESIGNERS } from '@/lib/mock-data'
import { DISCIPLINES } from '@/lib/constants'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getDesigner(slug: string) {
  return MOCK_DESIGNERS.find((d) => d.slug === slug) ?? null
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

type PageParams = { params: { slug: string } }

export function generateMetadata({ params }: PageParams): Metadata {
  const designer = getDesigner(params.slug)
  if (!designer) {
    return { title: 'Designer introuvable — Design Lab Normandie' }
  }

  const disciplineLabels = designer.disciplines
    .map((d) => DISCIPLINES[d])
    .join(', ')

  return {
    title: `${designer.firstName} ${designer.lastName} — Design Lab Normandie`,
    description: `${designer.firstName} ${designer.lastName}, ${disciplineLabels} à ${designer.city}. Découvrez son profil sur l'annuaire Design Lab Normandie.`,
  }
}

// ---------------------------------------------------------------------------
// Static params (optional — for static generation of mock pages)
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return MOCK_DESIGNERS.map((d) => ({ slug: d.slug }))
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DesignerDetailPage({ params }: PageParams) {
  const designer = getDesigner(params.slug)
  if (!designer) notFound()

  const disciplineLabels = designer.disciplines
    .map((d) => DISCIPLINES[d])
    .join(', ')

  // JSON-LD Person structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: `${designer.firstName} ${designer.lastName}`,
    jobTitle: disciplineLabels,
    address: {
      '@type': 'PostalAddress',
      addressLocality: designer.city,
      addressRegion: 'Normandie',
      addressCountry: 'FR',
    },
    ...(designer.website && { url: designer.website }),
    ...(designer.email && { email: designer.email }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DesignerHero designer={designer} />
      <DesignerBio designer={designer} />
      <DesignerSkills designer={designer} />
      <DesignerProjects projects={designer.projects} />
    </>
  )
}
