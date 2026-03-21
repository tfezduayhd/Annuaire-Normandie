import Image from 'next/image'
import type { Project } from '@/types'

type DesignerProjectsProps = {
  projects: Project[]
}

export function DesignerProjects({ projects }: DesignerProjectsProps) {
  if (projects.length === 0) return null

  return (
    <section className="border-t border-flint/10 px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 font-display text-xl text-ink">Projets</h2>

        <div className="grid gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="group">
              {/* Image */}
              <div className="relative mb-4 aspect-[16/10] overflow-hidden bg-flint/10">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <span className="font-mono text-sm text-flint/30">
                      Visuel à venir
                    </span>
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="flex items-baseline gap-3">
                <h3 className="font-display text-base leading-snug text-ink">
                  {project.title}
                </h3>
                {project.year && (
                  <span className="shrink-0 font-mono text-xs text-flint">
                    {project.year}
                  </span>
                )}
              </div>

              {project.description && (
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-flint">
                  {project.description}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
