'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
  links: ReadonlyArray<{ href: string; label: string }>
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-ink/80"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-slate bg-chalk"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            {/* Close button */}
            <div className="flex items-center justify-between border-b border-slate px-6 py-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-flint">
                Menu
              </span>
              <button
                onClick={onClose}
                aria-label="Fermer le menu"
                className="p-2 text-slate transition-colors hover:bg-slate hover:text-chalk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earth"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col divide-y divide-slate/10">
              {links.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-6 py-5 font-display text-xl font-bold text-ink transition-colors hover:bg-slate hover:text-chalk"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-flint">{String(i + 1).padStart(2, '0')}</span>
                </Link>
              ))}
            </nav>

            <div className="border-t border-slate p-6">
              <Button variant="moss" size="lg" href="/rejoindre" className="w-full justify-center">
                Rejoindre le réseau
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
