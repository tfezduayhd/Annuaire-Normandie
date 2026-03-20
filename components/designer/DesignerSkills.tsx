import { Tag } from '@/components/ui/Tag'
import { DISCIPLINES } from '@/lib/constants'
import type { Designer } from '@/types'

type DesignerSkillsProps = {
  designer: Pick<Designer, 'disciplines' | 'specialties'>
}

export function DesignerSkills({ designer }: DesignerSkillsProps) {
  const hasDisciplines = designer.disciplines.length > 0
  const hasSpecialties = designer.specialties.length > 0

  if (!hasDisciplines && !hasSpecialties) return null

  return (
    <section className="border-t border-flint/10 px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-6 font-display text-xl text-ink">
          Compétences
        </h2>

        <div className="flex flex-wrap gap-2">
          {designer.disciplines.map((d) => (
            <Tag key={d} active>
              {DISCIPLINES[d]}
            </Tag>
          ))}
          {designer.specialties.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </div>
    </section>
  )
}
