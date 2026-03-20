'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DISCIPLINES,
  TERRITORIES,
  STRUCTURES,
  TRANSITION_FOCUSES,
} from '@/lib/constants'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getArrayParam(params: URLSearchParams, key: string): string[] {
  const val = params.get(key)
  return val ? val.split(',') : []
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DropdownOption = { value: string; label: string }

type DropdownProps = {
  label: string
  options: DropdownOption[]
  selected: string[]
  onToggle: (value: string) => void
  multi?: boolean
}

// ---------------------------------------------------------------------------
// Desktop dropdown
// ---------------------------------------------------------------------------

function Dropdown({
  label,
  options,
  selected,
  onToggle,
  multi = true,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center gap-1.5 rounded-sm border px-3 py-2 font-mono text-xs transition-colors',
          selected.length > 0
            ? 'border-moss bg-moss/10 text-moss'
            : 'border-flint/20 text-flint hover:border-flint/40'
        )}
      >
        {label}
        {selected.length > 0 && (
          <span className="ml-1 inline-flex size-5 items-center justify-center rounded-full bg-moss text-[10px] text-white">
            {selected.length}
          </span>
        )}
        <ChevronDown
          className={cn(
            'size-3.5 transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-30 mt-1.5 max-h-64 min-w-[220px] overflow-y-auto rounded-sm border border-flint/20 bg-white p-2 shadow-lg"
          >
            {options.map((opt) => {
              const isActive = selected.includes(opt.value)
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onToggle(opt.value)
                    if (!multi) setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-left font-sans text-sm transition-colors',
                    isActive
                      ? 'bg-moss/10 text-moss'
                      : 'text-ink hover:bg-chalk'
                  )}
                >
                  {multi && (
                    <span
                      className={cn(
                        'flex size-4 shrink-0 items-center justify-center rounded-sm border',
                        isActive
                          ? 'border-moss bg-moss text-white'
                          : 'border-flint/30'
                      )}
                    >
                      {isActive && (
                        <svg
                          viewBox="0 0 12 12"
                          className="size-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path d="M2 6l3 3 5-5" />
                        </svg>
                      )}
                    </span>
                  )}
                  {opt.label}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Mobile drawer
// ---------------------------------------------------------------------------

type MobileDrawerProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

function MobileDrawer({ open, onClose, children }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-xl bg-white px-6 pb-10 pt-4"
          >
            {/* Handle */}
            <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-flint/30" />
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg text-ink">Filtres</h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-sm p-1.5 text-flint transition-colors hover:text-ink"
              >
                <X className="size-5" />
                <span className="sr-only">Fermer</span>
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ---------------------------------------------------------------------------
// Section for mobile drawer
// ---------------------------------------------------------------------------

type DrawerSectionProps = {
  title: string
  options: DropdownOption[]
  selected: string[]
  onToggle: (value: string) => void
}

function DrawerSection({
  title,
  options,
  selected,
  onToggle,
}: DrawerSectionProps) {
  return (
    <div className="mb-6">
      <p className="mb-2 font-mono text-xs uppercase tracking-wider text-flint">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isActive = selected.includes(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onToggle(opt.value)}
              className={cn(
                'rounded-sm border px-3 py-1.5 font-sans text-sm transition-colors',
                isActive
                  ? 'border-moss bg-moss/10 text-moss'
                  : 'border-flint/20 text-flint hover:border-flint/40'
              )}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main FilterBar
// ---------------------------------------------------------------------------

function buildOptions(
  record: Record<string, string>
): DropdownOption[] {
  return Object.entries(record).map(([value, label]) => ({ value, label }))
}

export function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const disciplines = getArrayParam(searchParams, 'discipline')
  const territories = getArrayParam(searchParams, 'territory')
  const structures = getArrayParam(searchParams, 'structure')
  const transitions = getArrayParam(searchParams, 'transition')
  const collaboration = searchParams.get('collaboration') === 'true'

  const activeCount =
    disciplines.length +
    territories.length +
    structures.length +
    transitions.length +
    (collaboration ? 1 : 0)

  // Generic toggle that updates URL params
  const toggle = useCallback(
    (key: string, value: string, multi = true) => {
      const params = new URLSearchParams(searchParams.toString())
      const current = getArrayParam(params, key)

      let next: string[]
      if (multi) {
        next = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value]
      } else {
        next = current.includes(value) ? [] : [value]
      }

      if (next.length > 0) {
        params.set(key, next.join(','))
      } else {
        params.delete(key)
      }
      params.delete('page')
      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  const toggleCollaboration = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (collaboration) {
      params.delete('collaboration')
    } else {
      params.set('collaboration', 'true')
    }
    params.delete('page')
    router.push(`?${params.toString()}`, { scroll: false })
  }, [router, searchParams, collaboration])

  const resetAll = useCallback(() => {
    router.push('?', { scroll: false })
  }, [router])

  // Build option arrays
  const disciplineOpts = buildOptions(DISCIPLINES)
  const territoryOpts = buildOptions(TERRITORIES)
  const structureOpts = buildOptions(STRUCTURES)
  const transitionOpts = buildOptions(TRANSITION_FOCUSES)

  // Shared filter content (for mobile drawer reuse)
  const filterContent = (
    <>
      <DrawerSection
        title="Discipline"
        options={disciplineOpts}
        selected={disciplines}
        onToggle={(v) => toggle('discipline', v)}
      />
      <DrawerSection
        title="Territoire"
        options={territoryOpts}
        selected={territories}
        onToggle={(v) => toggle('territory', v)}
      />
      <DrawerSection
        title="Structure"
        options={structureOpts}
        selected={structures}
        onToggle={(v) => toggle('structure', v, false)}
      />
      <DrawerSection
        title="Transition"
        options={transitionOpts}
        selected={transitions}
        onToggle={(v) => toggle('transition', v)}
      />

      {/* Collaboration toggle */}
      <div className="mb-6">
        <button
          type="button"
          onClick={toggleCollaboration}
          className={cn(
            'rounded-sm border px-3 py-1.5 font-sans text-sm transition-colors',
            collaboration
              ? 'border-moss bg-moss/10 text-moss'
              : 'border-flint/20 text-flint hover:border-flint/40'
          )}
        >
          Ouvert à la collaboration
        </button>
      </div>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={resetAll}
          className="font-mono text-xs text-flint underline underline-offset-2 transition-colors hover:text-ink"
        >
          Réinitialiser les filtres
        </button>
      )}
    </>
  )

  return (
    <div className="mb-8">
      {/* Desktop filters */}
      <div className="hidden flex-wrap items-center gap-3 md:flex">
        <Dropdown
          label="Discipline"
          options={disciplineOpts}
          selected={disciplines}
          onToggle={(v) => toggle('discipline', v)}
        />
        <Dropdown
          label="Territoire"
          options={territoryOpts}
          selected={territories}
          onToggle={(v) => toggle('territory', v)}
        />
        <Dropdown
          label="Structure"
          options={structureOpts}
          selected={structures}
          onToggle={(v) => toggle('structure', v, false)}
          multi={false}
        />
        <Dropdown
          label="Transition"
          options={transitionOpts}
          selected={transitions}
          onToggle={(v) => toggle('transition', v)}
        />

        {/* Collaboration toggle */}
        <button
          type="button"
          onClick={toggleCollaboration}
          className={cn(
            'rounded-sm border px-3 py-2 font-mono text-xs transition-colors',
            collaboration
              ? 'border-moss bg-moss/10 text-moss'
              : 'border-flint/20 text-flint hover:border-flint/40'
          )}
        >
          Collaboration
        </button>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={resetAll}
            className="ml-1 font-mono text-xs text-flint underline underline-offset-2 transition-colors hover:text-ink"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {/* Mobile filter button */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded-sm border border-flint/20 px-4 py-2.5 font-mono text-xs text-flint transition-colors hover:border-flint/40"
        >
          <SlidersHorizontal className="size-4" />
          Filtres
          {activeCount > 0 && (
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-moss text-[10px] text-white">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {filterContent}
      </MobileDrawer>
    </div>
  )
}
