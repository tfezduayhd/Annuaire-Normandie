import { Tag } from '@/components/ui/Tag'
import { TRANSITION_FOCUSES } from '@/lib/constants'
import type { Designer } from '@/types'

type DesignerBioProps = {
  designer: Pick<Designer, 'bio' | 'transitionFocuses'>
}

export function DesignerBio({ designer }: DesignerBioProps) {
  if (!designer.bio && designer.transitionFocuses.length === 0) return null

  return (
    <section className="px-6 py-section md:px-12 lg:px-20">
      <div className="mx-auto max-w-3xl">
        {designer.bio && (
          <p className="font-sans text-lg leading-relaxed text-ink/80">
            {designer.bio}
          </p>
        )}

        {designer.transitionFocuses.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-flint">
              Engagements en transition
            </p>
            <div className="flex flex-wrap gap-2">
              {designer.transitionFocuses.map((t) => (
                <Tag key={t}>{TRANSITION_FOCUSES[t]}</Tag>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
