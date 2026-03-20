import { cn } from '@/lib/utils'

type SectionLabelProps = {
  number: string
  label: string
  className?: string
}

export function SectionLabel({ number, label, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'font-mono text-xs uppercase tracking-widest text-flint',
        className
      )}
    >
      / {number} — {label}
    </span>
  )
}
