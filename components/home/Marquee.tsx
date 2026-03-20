import { MarqueeText } from '@/components/ui/MarqueeText'
import { MARQUEE_DISCIPLINES } from '@/lib/constants'

export function Marquee() {
  return <MarqueeText items={[...MARQUEE_DISCIPLINES]} />
}
