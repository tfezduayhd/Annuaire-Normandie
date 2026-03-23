import Link from 'next/link'

const navLinks = [
  { href: '/annuaire', label: 'Annuaire' },
  { href: '/rejoindre', label: 'Rejoindre' },
  { href: '/contact', label: 'Contact' },
]

const legalLinks = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/confidentialite', label: 'Politique de confidentialité' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate bg-ink text-chalk">
      {/* Main grid */}
      <div className="mx-auto max-w-7xl">
        <div className="grid divide-y divide-chalk/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {/* Brand block */}
          <div className="px-8 py-10">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-chalk/40">
              /DLN — {year}
            </p>
            <h2 className="font-display text-lg font-bold text-chalk">
              Design Lab Normandie
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-chalk/60">
              Le design normand,<br />collectif et engagé.
            </p>
          </div>

          {/* Navigation */}
          <div className="px-8 py-10">
            <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-chalk/40">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-chalk/70 transition-colors hover:text-chalk"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="px-8 py-10">
            <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-chalk/40">
              Contact
            </h3>
            <a
              href="mailto:contact@designlab-normandie.fr"
              className="text-sm text-chalk/70 transition-colors hover:text-chalk"
            >
              contact@designlab-normandie.fr
            </a>
            <p className="mt-2 text-sm text-chalk/40">
              Réseau APCI / France Design Lab
            </p>

            <h3 className="mb-3 mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-chalk/40">
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

        {/* Bottom bar */}
        <div className="border-t border-chalk/10 px-8 py-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-chalk/30">
            © {year} Design Lab Normandie — Structure, Clarté.
          </p>
        </div>
      </div>
    </footer>
  )
}
