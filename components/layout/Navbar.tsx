'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sun, Moon, Menu } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { MobileMenu } from '@/components/layout/MobileMenu'

const navLinks = [
  { href: '/annuaire', label: 'Annuaire' },
  { href: '/projets', label: 'Projets' },
  { href: '/manifeste', label: 'Manifeste' },
  { href: '/agenda', label: 'Agenda' },
  { href: '/contact', label: 'Contact' },
] as const

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full border-b border-flint/10',
          'bg-chalk/80 backdrop-blur-md'
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight text-ink"
          >
            Design Lab Normandie
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Changer le thème"
              className={cn(
                'rounded-sm p-2 text-slate transition-colors hover:bg-slate/10',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss'
              )}
            >
              <Sun className="hidden h-5 w-5 dark:block" />
              <Moon className="block h-5 w-5 dark:hidden" />
            </button>

            <Button
              variant="moss"
              size="sm"
              href="/rejoindre"
              className="hidden md:inline-flex"
            >
              Rejoindre
            </Button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              className={cn(
                'rounded-sm p-2 text-slate transition-colors hover:bg-slate/10 md:hidden',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss'
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
      />
    </>
  )
}
