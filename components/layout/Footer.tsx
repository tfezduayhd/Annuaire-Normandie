import Link from 'next/link'

const navLinks = [
  { href: '/annuaire', label: 'Annuaire' },
  { href: '/projets', label: 'Projets' },
  { href: '/manifeste', label: 'Manifeste' },
  { href: '/agenda', label: 'Agenda' },
  { href: '/contact', label: 'Contact' },
  { href: '/rejoindre', label: 'Rejoindre' },
]

const legalLinks = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/confidentialite', label: 'Politique de confidentialité' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-chalk">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-flint">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-chalk/70 transition-colors hover:text-chalk"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-flint">
              Contact
            </h3>
            <a
              href="mailto:contact@designlab-normandie.fr"
              className="text-sm text-chalk/70 transition-colors hover:text-chalk"
            >
              contact@designlab-normandie.fr
            </a>
            <p className="mt-6 text-sm text-chalk/50">
              Réseau APCI / France Design Lab
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-flint">
              Légal
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-chalk/70 transition-colors hover:text-chalk"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-chalk/10 pt-8 text-center">
          <p className="text-xs text-chalk/40">
            © {year} Design Lab Normandie
          </p>
        </div>
      </div>
    </footer>
  )
}
