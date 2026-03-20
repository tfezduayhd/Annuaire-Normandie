'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
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
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-chalk p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            <div className="flex justify-end">
              <button
                onClick={onClose}
                aria-label="Fermer le menu"
                className={cn(
                  'rounded-sm p-2 text-slate transition-colors hover:bg-slate/10',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss'
                )}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-12 flex flex-col gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="font-display text-2xl font-medium text-ink transition-colors hover:text-moss"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <Button variant="moss" size="lg" href="/rejoindre" className="w-full">
                Rejoindre
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
