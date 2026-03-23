import type { Metadata } from 'next'
import { SectionLabel } from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Manifeste — Design Lab Normandie',
  description:
    'Le manifeste de Design Lab Normandie : notre vision du design comme levier de transition écologique, sociale et économique en Normandie.',
  openGraph: {
    title: 'Manifeste — Design Lab Normandie',
    description:
      'Le manifeste de Design Lab Normandie : notre vision du design comme levier de transition en Normandie.',
    type: 'website',
    locale: 'fr_FR',
  },
}

const TOC_ITEMS = [
  { id: 'qui-nous-sommes', label: 'Qui nous sommes' },
  { id: 'notre-manifeste', label: 'Notre manifeste' },
  { id: 'notre-fonctionnement', label: 'Notre fonctionnement' },
  { id: 'nos-partenaires', label: 'Nos partenaires' },
] as const

export default function ManifestePage() {
  return (
    <div className="min-h-screen bg-chalk">
      {/* Page header */}
      <div className="border-b border-slate bg-chalk">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 lg:px-20">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
            / 01 — Manifeste
          </p>
          <h1 className="font-display text-display-xl font-bold text-ink">
            Manifeste
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-20">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Sidebar TOC — desktop only */}
          <nav className="hidden lg:block">
            <div className="sticky top-28 border-l border-slate pl-6">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-flint">
                Sommaire
              </p>
              <ul className="space-y-3">
                {TOC_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="font-mono text-xs uppercase tracking-widest text-flint transition-colors hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Content */}
          <div>
            {/* Section 01 */}
            <section id="qui-nous-sommes" className="mb-20 scroll-mt-28 border-b border-slate/20 pb-16">
              <SectionLabel number="01" label="QUI NOUS SOMMES" className="mb-5 block" />
              <h2 className="mb-8 font-display text-display-md font-bold text-ink">
                Qui nous sommes
              </h2>
              <div className="max-w-prose space-y-5 text-base leading-relaxed text-slate/80">
                <p>
                  Design Lab Normandie est un réseau professionnel qui fédère les
                  designers du territoire normand. Antenne régionale du{' '}
                  <strong className="text-slate">France Design Lab</strong>,
                  porté par l&apos;APCI (Agence pour la Promotion de la Création
                  Industrielle), notre collectif œuvre à structurer, valoriser et
                  développer la filière design en Normandie.
                </p>
                <p>
                  Nous rassemblons des designers de toutes disciplines — design
                  produit, design de service, design graphique, design numérique,
                  design d&apos;espace — autour d&apos;une conviction commune :
                  le design est un levier essentiel pour répondre aux défis
                  contemporains de notre territoire.
                </p>
                <p>
                  Depuis notre création, nous travaillons à rendre visible la
                  richesse et la diversité des pratiques de design en Normandie,
                  en construisant des ponts entre les designers, les entreprises,
                  les institutions publiques et les citoyens.
                </p>
              </div>
            </section>

            {/* Section 02 */}
            <section id="notre-manifeste" className="mb-20 scroll-mt-28 border-b border-slate/20 pb-16">
              <SectionLabel number="02" label="NOTRE MANIFESTE" className="mb-5 block" />
              <h2 className="mb-8 font-display text-display-md font-bold text-ink">
                Notre manifeste
              </h2>
              <div className="max-w-prose space-y-5 text-base leading-relaxed text-slate/80">
                <p>
                  Nous croyons que le design est un levier fondamental pour
                  accompagner les transitions écologiques, sociales et économiques
                  en Normandie. Face à l&apos;urgence climatique, aux mutations
                  du travail et aux fractures territoriales, le design offre une
                  méthodologie unique : celle de placer l&apos;humain et son
                  environnement au cœur de chaque décision.
                </p>
                <p>
                  Les designers jouent un rôle clé dans l&apos;innovation
                  publique et privée. Par leur capacité à observer, comprendre et
                  reformuler les problèmes, ils transforment des enjeux complexes
                  en solutions concrètes, désirables et responsables.
                </p>
                <p>
                  Construire un écosystème local est une nécessité. Nous militons
                  pour un maillage territorial fort qui connecte designers,
                  entreprises, institutions de formation et pouvoirs publics.
                </p>
                <p>
                  La Normandie possède une spécificité territoriale unique. Du
                  littoral aux bocages, des villes portuaires aux campagnes
                  intérieures, notre territoire est un terrain
                  d&apos;expérimentation exceptionnel pour le design.
                </p>
                <blockquote className="border-l-4 border-earth py-2 pl-6 font-display text-lg font-bold text-ink">
                  &ldquo;Le design doit exprimer la rigueur des bâtisseurs et la
                  vision prospective des designers. Il doit paraître aussi vaste
                  que la mer et aussi solide que les falaises.&rdquo;
                </blockquote>
              </div>
            </section>

            {/* Section 03 */}
            <section id="notre-fonctionnement" className="mb-20 scroll-mt-28 border-b border-slate/20 pb-16">
              <SectionLabel number="03" label="NOTRE FONCTIONNEMENT" className="mb-5 block" />
              <h2 className="mb-8 font-display text-display-md font-bold text-ink">
                Notre fonctionnement
              </h2>
              <div className="max-w-prose space-y-5 text-base leading-relaxed text-slate/80">
                <p>
                  Design Lab Normandie fonctionne comme un collectif ouvert,
                  animé par une gouvernance collégiale. Notre bureau assure la
                  coordination des actions, la représentation du réseau et le
                  lien avec l&apos;APCI et les autres antennes régionales.
                </p>
                <p>
                  Nous sommes ouverts à tous les designers exerçant en Normandie,
                  quelle que soit leur discipline, leur statut ou leur niveau
                  d&apos;expérience.
                </p>
                <p>
                  Notre action s&apos;articule autour de quatre axes : la mise en
                  réseau des professionnels, la promotion du design, la formation
                  et la montée en compétences, et la contribution aux réflexions
                  nationales sur le design et la transition.
                </p>
              </div>
            </section>

            {/* Section 04 */}
            <section id="nos-partenaires" className="scroll-mt-28">
              <SectionLabel number="04" label="NOS PARTENAIRES" className="mb-5 block" />
              <h2 className="mb-8 font-display text-display-md font-bold text-ink">
                Nos partenaires
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex aspect-[3/2] items-center justify-center border border-slate bg-white"
                  >
                    <span className="font-mono text-xs uppercase tracking-widest text-flint/40">
                      Partenaire
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
