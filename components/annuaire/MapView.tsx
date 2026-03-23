'use client'

import { useState } from 'react'
import type { DesignerCardData } from '@/types'
import { DISCIPLINES } from '@/lib/constants'

type Props = {
  designers: DesignerCardData[]
}

const CITY_COORDS: Record<string, { x: number; y: number }> = {
  'Rouen': { x: 380, y: 115 },
  'Le Havre': { x: 268, y: 88 },
  'Caen': { x: 218, y: 152 },
  'Évreux': { x: 372, y: 172 },
  'Evreux': { x: 372, y: 172 },
  'Alençon': { x: 292, y: 242 },
  'Alencon': { x: 292, y: 242 },
  'Cherbourg': { x: 128, y: 78 },
  'Saint-Lô': { x: 168, y: 158 },
  'Saint-Lo': { x: 168, y: 158 },
  'Dieppe': { x: 348, y: 72 },
  'Fécamp': { x: 300, y: 68 },
  'Fecamp': { x: 300, y: 68 },
  'Lisieux': { x: 288, y: 175 },
  'Bayeux': { x: 195, y: 148 },
  'Granville': { x: 148, y: 215 },
  'Avranches': { x: 162, y: 235 },
  'Flers': { x: 245, y: 218 },
}

const TERRITORY_COORDS: Record<string, { x: number; y: number }> = {
  SEINE_MARITIME: { x: 370, y: 110 },
  EURE: { x: 390, y: 195 },
  CALVADOS: { x: 225, y: 160 },
  MANCHE: { x: 150, y: 165 },
  ORNE: { x: 288, y: 255 },
}

// Simplified SVG paths for the 5 departments (approximate polygons in a 540x340 viewBox)
const DEPARTMENT_PATHS: Array<{
  key: string
  label: string
  labelX: number
  labelY: number
  d: string
  fill: string
}> = [
  {
    key: 'SEINE_MARITIME',
    label: 'Seine-Maritime',
    labelX: 390,
    labelY: 95,
    fill: '#F5F0EC',
    d: 'M 295 30 L 430 30 L 500 55 L 510 100 L 490 145 L 460 175 L 420 185 L 375 190 L 340 165 L 300 135 L 285 95 Z',
  },
  {
    key: 'EURE',
    label: 'Eure',
    labelX: 410,
    labelY: 225,
    fill: '#EEF4EE',
    d: 'M 340 165 L 375 190 L 420 185 L 460 175 L 490 205 L 480 270 L 440 295 L 390 290 L 350 265 L 330 230 L 335 195 Z',
  },
  {
    key: 'CALVADOS',
    label: 'Calvados',
    labelX: 238,
    labelY: 182,
    fill: '#EDF2F7',
    d: 'M 155 130 L 195 118 L 250 100 L 295 100 L 300 135 L 285 165 L 270 190 L 240 210 L 210 215 L 175 205 L 155 185 Z',
  },
  {
    key: 'MANCHE',
    label: 'Manche',
    labelX: 135,
    labelY: 185,
    fill: '#F0EEF5',
    d: 'M 80 40 L 150 30 L 185 50 L 195 90 L 195 118 L 155 130 L 155 185 L 145 220 L 120 260 L 95 275 L 75 245 L 70 200 L 60 160 L 65 100 Z',
  },
  {
    key: 'ORNE',
    label: 'Orne',
    labelX: 275,
    labelY: 268,
    fill: '#F5F2EC',
    d: 'M 175 205 L 210 215 L 240 210 L 270 190 L 285 165 L 300 135 L 340 165 L 335 195 L 330 230 L 350 265 L 320 300 L 270 310 L 230 300 L 195 278 L 165 255 L 145 220 L 155 185 Z',
  },
]

function getCoords(designer: DesignerCardData): { x: number; y: number } {
  const cityCoords = CITY_COORDS[designer.city]
  if (cityCoords) return cityCoords
  return TERRITORY_COORDS[designer.territory] ?? { x: 270, y: 180 }
}

export function MapView({ designers }: Props) {
  const [tooltip, setTooltip] = useState<{
    designer: DesignerCardData
    x: number
    y: number
  } | null>(null)

  // Group designers by position to handle overlaps
  const dots = designers.map((d) => ({ designer: d, coords: getCoords(d) }))

  return (
    <div className="relative border border-slate bg-white">
      <div className="border-b border-slate px-6 py-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-flint">
          {designers.length} designer{designers.length > 1 ? 's' : ''} — carte indicative
        </p>
      </div>

      <div className="relative overflow-hidden">
        <svg
          viewBox="0 0 580 345"
          className="h-auto w-full"
          aria-label="Carte indicative des designers de Normandie"
        >
          {/* Department fills */}
          {DEPARTMENT_PATHS.map((dept) => (
            <g key={dept.key}>
              <path
                d={dept.d}
                fill={dept.fill}
                stroke="#1A1A1A"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              <text
                x={dept.labelX}
                y={dept.labelY}
                textAnchor="middle"
                className="pointer-events-none"
                style={{
                  fontFamily: 'var(--font-space-mono, monospace)',
                  fontSize: '8px',
                  fill: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                {dept.label}
              </text>
            </g>
          ))}

          {/* Designer dots */}
          {dots.map(({ designer, coords }, i) => (
            <g key={designer.slug}>
              <circle
                cx={coords.x + (i % 3) * 4}
                cy={coords.y + Math.floor(i / 3) * 4}
                r="7"
                fill="#A04035"
                stroke="white"
                strokeWidth="1.5"
                className="cursor-pointer transition-all hover:r-9"
                onMouseEnter={(e) => {
                  const containerRect = (e.currentTarget.closest('.relative') as HTMLElement).getBoundingClientRect()
                  setTooltip({
                    designer,
                    x: e.clientX - containerRect.left,
                    y: e.clientY - containerRect.top,
                  })
                }}
                onMouseLeave={() => setTooltip(null)}
                aria-label={`${designer.firstName} ${designer.lastName}, ${designer.city}`}
              />
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-10 border border-slate bg-white p-3 shadow-lg"
            style={{
              left: Math.min(tooltip.x + 12, 999),
              top: tooltip.y - 8,
              maxWidth: '200px',
            }}
          >
            <p className="font-display text-sm font-bold text-ink">
              {tooltip.designer.firstName} {tooltip.designer.lastName}
            </p>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-flint">
              {tooltip.designer.city}
            </p>
            {tooltip.designer.disciplines[0] && (
              <p className="mt-1 text-xs text-earth">
                {DISCIPLINES[tooltip.designer.disciplines[0]]}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-slate px-6 py-3">
        <p className="font-mono text-[9px] uppercase tracking-widest text-flint/60">
          Positionnement indicatif — basé sur la ville déclarée
        </p>
      </div>
    </div>
  )
}
