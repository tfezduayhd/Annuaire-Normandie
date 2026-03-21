'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Image as ImageIcon } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Tag } from '@/components/ui/Tag'
import { MOCK_DESIGNERS } from '@/lib/mock-data'
import { DISCIPLINES, TRANSITION_FOCUSES } from '@/lib/constants'

import { fadeInUp, staggerContainer } from '@/lib/animations'
import type { Discipline, TransitionFocus } from '@/types'

type ProjectWithDesigner = {
  id: string
  title: string
  slug: string
  description: string | null
  imageUrl: string | null
  year: number | null
  designerName: string
  designerSlug: string
  disciplines: string[]
  transitionFocuses: string[]
}

const allProjects: ProjectWithDesigner[] = MOCK_DESIGNERS.flatMap((designer) =>
  designer.projects.map((project) => ({
    id: project.id,
    title: project.title,
    slug: project.slug,
    description: project.description,
    imageUrl: project.imageUrl,
    year: project.year,
    designerName: `${designer.firstName} ${designer.lastName}`,
    designerSlug: designer.slug,
    disciplines: designer.disciplines.map(
      (d: Discipline) => DISCIPLINES[d] ?? d
    ),
    transitionFocuses: designer.transitionFocuses.map(
      (t: TransitionFocus) => TRANSITION_FOCUSES[t] ?? t
    ),
  }))
)

function ProjectCard({ project }: { project: ProjectWithDesigner }) {
  return (
    <motion.article variants={fadeInUp} className="group">
      <Link href={`/projets/${project.slug}`} className="block">
        <div className="aspect-[4/3] bg-slate/10 flex items-center justify-center mb-4">
          <ImageIcon className="h-10 w-10 text-flint" />
        </div>
        <h2 className="font-display text-lg text-ink group-hover:text-earth transition-colors">
          {project.title}
        </h2>
      </Link>
      <Link
        href={`/annuaire/${project.designerSlug}`}
        className="mt-1 block text-sm text-flint hover:text-slate transition-colors"
      >
        {project.designerName}
      </Link>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.disciplines.map((d) => (
          <Tag key={d} className="text-xs">
            {d}
          </Tag>
        ))}
      </div>
      {project.transitionFocuses.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.transitionFocuses.map((t) => (
            <Tag key={t} active className="text-xs">
              {t}
            </Tag>
          ))}
        </div>
      )}
      {project.year && (
        <p className="mt-2 font-mono text-xs text-flint">{project.year}</p>
      )}
    </motion.article>
  )
}

export default function ProjetsPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filteredProjects = activeFilter
    ? allProjects.filter((p) => p.transitionFocuses.includes(activeFilter))
    : allProjects

  return (
    <div className="bg-chalk px-6 py-section md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionLabel number="01" label="PROJETS" className="mb-6" />
        <h1 className="font-display text-display-lg font-bold text-ink mb-12">
          Projets &amp; Expérimentations
        </h1>

        <div className="mb-10 flex flex-wrap gap-2">
          <button type="button" onClick={() => setActiveFilter(null)}>
            <Tag active={activeFilter === null}>Tous</Tag>
          </button>
          {Object.values(TRANSITION_FOCUSES).map((label) => (
            <button
              type="button"
              key={label}
              onClick={() =>
                setActiveFilter(activeFilter === label ? null : label)
              }
            >
              <Tag active={activeFilter === label}>{label}</Tag>
            </button>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <p className="mt-12 text-center text-flint font-sans">
            Aucun projet ne correspond à ce filtre.
          </p>
        )}
      </div>
    </div>
  )
}
