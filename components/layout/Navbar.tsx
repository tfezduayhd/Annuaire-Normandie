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
  { href: '/experimentations', label: 'Expérimentations' },
  { href: '/ateliers', label: 'Ateliers & Rencontres' },
  { href: '/notre-demarche', label: 'Notre démarche' },
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
      <header className="sticky top-0 z-40 w-full border-b border-slate bg-chalk/95 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-stretch divide-x divide-slate">
          {/* Logo block */}
          <Link
            href="/"
            aria-label="Design Lab Normandie — accueil"
            className="flex items-center px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-slate hover:text-chalk"
          >
            <span className="mr-3 font-mono text-[10px] font-normal tracking-widest text-flint" aria-hidden="true">
              /DLN
            </span>
            Design Lab Normandie
          </Link>

          {/* Desktop links — stretch to fill */}
          <ul className="hidden flex-1 items-stretch divide-x divide-slate/20 md:flex">
            {navLinks.map((link) => (
              <li key={link.href} className="flex">
                <Link
                  href={link.href}
                  className="flex items-center px-5 font-mono text-xs uppercase tracking-[0.12em] text-slate transition-colors hover:bg-slate/5 hover:text-earth"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions block */}
          <div className="ml-auto flex items-stretch divide-x divide-slate">
            <button
              onClick={toggleTheme}
              aria-label="Changer le thème"
              className="flex items-center px-4 text-slate transition-colors hover:bg-slate/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earth"
            >
              <Sun className="hidden h-4 w-4 dark:block" strokeWidth={1.5} />
              <Moon className="block h-4 w-4 dark:hidden" strokeWidth={1.5} />
            </button>

            <div className="hidden items-center px-4 md:flex">
              <Button variant="moss" size="sm" href="/rejoindre">
                Rejoindre
              </Button>
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              className={cn(
                'flex items-center px-4 text-slate transition-colors hover:bg-slate/10 md:hidden',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earth'
              )}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
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
