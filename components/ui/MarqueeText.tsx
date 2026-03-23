import { cn } from '@/lib/utils'

type MarqueeTextProps = {
  items: string[]
  className?: string
}

export function MarqueeText({ items, className }: MarqueeTextProps) {
  const content = items.join(' ✦ ')

  return (
    <div
      className={cn(
        'overflow-hidden border-b border-slate bg-slate py-3.5 text-chalk',
        className
      )}
      aria-label={content}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="font-mono text-xs uppercase tracking-[0.2em]">
          {content}&nbsp;✦&nbsp;
        </span>
        <span
          className="font-mono text-xs uppercase tracking-[0.2em]"
          aria-hidden="true"
        >
          {content}&nbsp;✦&nbsp;
        </span>
      </div>
    </div>
  )
}
