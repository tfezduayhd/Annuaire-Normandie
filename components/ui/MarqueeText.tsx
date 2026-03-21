import { cn } from '@/lib/utils'

type MarqueeTextProps = {
  items: string[]
  className?: string
}

export function MarqueeText({ items, className }: MarqueeTextProps) {
  const content = items.join(' — ')

  return (
    <div
      className={cn(
        'overflow-hidden border-y border-slate/10 bg-slate py-4 text-chalk',
        className
      )}
      aria-label={content}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="font-mono text-sm uppercase tracking-widest">
          {content} —&nbsp;
        </span>
        <span
          className="font-mono text-sm uppercase tracking-widest"
          aria-hidden="true"
        >
          {content} —&nbsp;
        </span>
      </div>
    </div>
  )
}
