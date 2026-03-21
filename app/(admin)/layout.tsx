import Link from 'next/link'
import { LayoutDashboard, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/designers', label: 'Designers', icon: Users },
] as const

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-chalk">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-flint/10 bg-white p-6 lg:block">
        <Link href="/" className="font-display text-lg font-semibold text-ink">
          Design Lab
        </Link>
        <p className="mt-1 font-mono text-xs text-flint">Administration</p>

        <nav className="mt-8 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 font-sans text-sm text-flint transition-colors',
                'hover:bg-chalk hover:text-ink'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 bg-chalk p-3">
          <p className="font-mono text-xs text-flint">
            Accès réservé aux administrateurs
          </p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1">
        <header className="border-b border-flint/10 bg-white px-6 py-4">
          <h1 className="font-display text-lg text-ink">Administration</h1>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
