import Image from 'next/image'
import Link from 'next/link'
import {
  Globe,
  Linkedin,
  Instagram,
  Palette,
  MapPin,
  Building2,
  Mail,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Tag } from '@/components/ui/Tag'
import { Button } from '@/components/ui/Button'
import { DISCIPLINES, TERRITORIES, STRUCTURES } from '@/lib/constants'
import type { Designer } from '@/types'

type DesignerHeroProps = {
  designer: Designer
}

type SocialLink = {
  href: string
  icon: LucideIcon
  label: string
}

export function DesignerHero({ designer }: DesignerHeroProps) {
  const socialLinks: SocialLink[] = [
    designer.website ? { href: designer.website, icon: Globe, label: 'Site web' } : null,
    designer.linkedin ? { href: designer.linkedin, icon: Linkedin, label: 'LinkedIn' } : null,
    designer.instagram ? { href: designer.instagram, icon: Instagram, label: 'Instagram' } : null,
    designer.behance ? { href: designer.behance, icon: Palette, label: 'Behance' } : null,
  ].filter((link): link is SocialLink => link !== null)

  return (
    <section className="px-6 pt-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-8 font-mono text-xs text-flint" aria-label="Fil d'Ariane">
          <Link href="/annuaire" className="transition-colors hover:text-ink">
            Annuaire
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">
            {designer.firstName} {designer.lastName}
          </span>
        </nav>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Photo */}
          <div className="w-full shrink-0 lg:w-2/5">
            <div className="relative aspect-[4/3] overflow-hidden bg-flint/10">
              {designer.photoUrl ? (
                <Image
                  src={designer.photoUrl}
                  alt={`${designer.firstName} ${designer.lastName}`}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <span className="font-display text-6xl text-flint/20">
                    {designer.firstName[0]}
                    {designer.lastName[0]}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="mb-4 font-display text-display-md font-bold text-ink">
              {designer.firstName} {designer.lastName}
            </h1>

            {/* Disciplines */}
            <div className="mb-6 flex flex-wrap gap-2">
              {designer.disciplines.map((d) => (
                <Tag key={d} active>
                  {DISCIPLINES[d]}
                </Tag>
              ))}
            </div>

            {/* Meta info */}
            <div className="mb-6 space-y-2 text-sm text-flint">
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                <span>
                  {designer.city}, {TERRITORIES[designer.territory]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="size-4" />
                <span>{STRUCTURES[designer.structure]}</span>
              </div>
            </div>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="mb-8 flex items-center gap-3">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center border border-flint/20 text-flint transition-colors hover:border-moss hover:text-earth"
                    aria-label={label}
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            )}

            {/* CTA */}
            {designer.isOpenToCollaboration && (
              <Button
                href={`mailto:${designer.email}?subject=Collaboration — Design Lab Normandie`}
                variant="moss"
                size="lg"
              >
                <Mail className="mr-2 size-4" />
                Collaborer
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
