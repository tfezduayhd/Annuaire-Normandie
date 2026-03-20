import { cn } from '@/lib/utils'

type TagProps = {
  children: React.ReactNode
  active?: boolean
  className?: string
}

export function Tag({ children, active = false, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-sm border px-2.5 py-1 font-mono text-xs transition-colors',
        active
          ? 'border-slate bg-slate text-white'
          : 'border-flint/30 bg-chalk text-flint',
        className
      )}
    >
      {children}
    </span>
  )
}
