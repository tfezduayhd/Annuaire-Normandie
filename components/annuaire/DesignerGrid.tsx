import { DesignerCard } from '@/components/annuaire/DesignerCard'
import type { DesignerCardData } from '@/types'

type DesignerGridProps = {
  designers: DesignerCardData[]
  total: number
}

export function DesignerGrid({ designers, total }: DesignerGridProps) {
  if (designers.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center border border-dashed border-flint/30 p-8">
        <p className="text-center font-sans text-flint">
          Aucun designer trouvé
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-6 font-mono text-sm text-flint">
        {total} designer{total > 1 ? 's' : ''} trouvé{total > 1 ? 's' : ''}
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {designers.map((designer) => (
          <DesignerCard key={designer.slug} designer={designer} />
        ))}
      </div>
    </div>
  )
}
