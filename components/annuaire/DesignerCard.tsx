'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Handshake, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tag } from '@/components/ui/Tag'
import { DISCIPLINES, TERRITORIES } from '@/lib/constants'
import { fadeInUp } from '@/lib/animations'
import type { DesignerCardData } from '@/types'

type DesignerCardProps = {
  designer: DesignerCardData
  className?: string
}

const MAX_VISIBLE_DISCIPLINES = 2

export function DesignerCard({ designer, className }: DesignerCardProps) {
  const {
    slug,
    firstName,
    lastName,
    photoUrl,
    city,
    territory,
    disciplines,
    isOpenToCollaboration,
  } = designer

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-40px' }}
      className={cn('group', className)}
    >
      <Link href={`/annuaire/${slug}`} className="block">
        {/* Card with hover offset effect */}
        <div className="relative">
          {/* Shadow / accent bg behind */}
          <div className="absolute inset-0 bg-earth transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />

          {/* Main card — white on Gris Falaise with thin border */}
          <div className="relative border border-slate/10 bg-white transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
            {/* Photo */}
            <div className="relative aspect-[4/3] overflow-hidden bg-flint/10">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <span className="font-display text-3xl font-bold text-flint/30">
                    {firstName[0]}
                    {lastName[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="font-display text-lg font-bold leading-tight text-ink">
                  {firstName} {lastName}
                </h3>
                {isOpenToCollaboration && (
                  <Handshake
                    className="mt-0.5 size-4 shrink-0 text-earth"
                    strokeWidth={1.5}
                    aria-label="Ouvert à la collaboration"
                  />
                )}
              </div>

              {/* Disciplines */}
              <div className="mb-3 flex flex-wrap gap-1.5">
                {disciplines.slice(0, MAX_VISIBLE_DISCIPLINES).map((d) => (
                  <Tag key={d} className="font-mono">
                    {DISCIPLINES[d]}
                  </Tag>
                ))}
                {disciplines.length > MAX_VISIBLE_DISCIPLINES && (
                  <Tag className="font-mono">+{disciplines.length - MAX_VISIBLE_DISCIPLINES}</Tag>
                )}
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 text-sm text-flint">
                <MapPin className="size-3.5" strokeWidth={1.5} />
                <span>
                  {city}, {TERRITORIES[territory]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
