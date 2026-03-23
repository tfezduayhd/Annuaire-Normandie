import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { Marquee } from '@/components/home/Marquee'
import { Mission } from '@/components/home/Mission'
import { FeaturedDesigners } from '@/components/home/FeaturedDesigners'
import { FranceDesignLab } from '@/components/home/FranceDesignLab'
import { CTAJoindre } from '@/components/home/CTAJoindre'

export const metadata: Metadata = {
  title: 'Design Lab Normandie — Le design normand, collectif et engagé',
  description:
    'Design Lab Normandie fédère les designers du territoire pour répondre aux enjeux de transition. Annuaire professionnel, projets et ressources.',
  openGraph: {
    title: 'Design Lab Normandie — Le design normand, collectif et engagé',
    description:
      'Design Lab Normandie fédère les designers du territoire pour répondre aux enjeux de transition.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Mission />
      <FeaturedDesigners />
      <FranceDesignLab />
      <CTAJoindre />
    </>
  )
}
