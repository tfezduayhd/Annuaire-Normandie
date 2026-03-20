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
    <div className="bg-chalk px-6 py-section md:px-12 lg:px-20">
      <header className="mb-24">
        <h1 className="font-display text-display-xl italic text-ink">
          Manifeste
        </h1>
      </header>

      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-16">
        {/* Sidebar TOC — desktop only */}
        <nav className="hidden lg:block">
          <div className="sticky top-32">
            <ul className="space-y-4">
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
          {/* Section 01 — Qui nous sommes */}
          <section id="qui-nous-sommes" className="mb-24 scroll-mt-32">
            <SectionLabel number="01" label="QUI NOUS SOMMES" className="mb-6 block" />
            <h2 className="mb-8 font-display text-display-md italic text-ink">
              Qui nous sommes
            </h2>
            <div className="max-w-prose space-y-6 text-lg leading-relaxed text-slate/80">
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
                contemporains de notre territoire. Notre réseau crée de la
                solidarité entre les professionnels normands, favorise les
                échanges de compétences et donne une voix collective à une
                profession encore trop souvent méconnue.
              </p>
              <p>
                Depuis notre création, nous travaillons à rendre visible la
                richesse et la diversité des pratiques de design en Normandie,
                en construisant des ponts entre les designers, les entreprises,
                les institutions publiques et les citoyens.
              </p>
            </div>
          </section>

          {/* Section 02 — Notre manifeste */}
          <section id="notre-manifeste" className="mb-24 scroll-mt-32">
            <SectionLabel number="02" label="NOTRE MANIFESTE" className="mb-6 block" />
            <h2 className="mb-8 font-display text-display-md italic text-ink">
              Notre manifeste
            </h2>
            <div className="max-w-prose space-y-6 text-lg leading-relaxed text-slate/80">
              <p>
                Nous croyons que le design est un levier fondamental pour
                accompagner les transitions écologiques, sociales et économiques
                en Normandie. Face à l&apos;urgence climatique, aux mutations
                du travail et aux fractures territoriales, le design offre une
                méthodologie unique : celle de placer l&apos;humain et son
                environnement au cœur de chaque décision, de chaque projet, de
                chaque politique publique.
              </p>
              <p>
                Les designers jouent un rôle clé dans l&apos;innovation
                publique et privée. Par leur capacité à observer, comprendre et
                reformuler les problèmes, ils transforment des enjeux complexes
                en solutions concrètes, désirables et responsables. En
                Normandie, ce potentiel est immense : nos designers
                accompagnent déjà des collectivités, des entreprises
                industrielles, des associations et des startups dans leurs
                démarches de transformation.
              </p>
              <p>
                Construire un écosystème local est une nécessité. Nous militons
                pour un maillage territorial fort qui connecte designers,
                entreprises, institutions de formation et pouvoirs publics.
                C&apos;est en créant ces connexions que nous rendrons le design
                accessible à tous les acteurs du territoire, y compris les
                PME, les artisans et les collectivités rurales qui en ont le
                plus besoin.
              </p>
              <p>
                Le design, tel que nous le pratiquons, est une discipline
                qui place l&apos;humain et l&apos;environnement au centre.
                Ce n&apos;est pas simplement une question d&apos;esthétique ou
                de forme : c&apos;est une démarche de projet qui interroge les
                usages, anticipe les impacts, intègre les contraintes
                écologiques et cherche la juste réponse plutôt que la
                surenchère technologique.
              </p>
              <p>
                La Normandie possède une spécificité territoriale unique. Du
                littoral aux bocages, des villes portuaires aux campagnes
                intérieures, de l&apos;héritage industriel aux nouvelles
                économies créatives — notre territoire est un terrain
                d&apos;expérimentation exceptionnel pour le design. Chaque
                contexte appelle des réponses situées, ancrées dans les
                réalités locales, nourries par les savoirs et les savoir-faire
                normands.
              </p>
              <p>
                Nous appelons à un design collaboratif et ouvert. Les défis
                auxquels nous faisons face — transition énergétique, mobilités
                durables, alimentation locale, inclusion numérique, vieillissement
                de la population — ne peuvent être relevés en silo. Ils exigent
                des approches pluridisciplinaires, des co-conceptions avec les
                usagers, des expérimentations terrain et une culture du
                prototypage rapide.
              </p>
              <p>
                Notre vision pour 2030 : une Normandie où le design est reconnu
                comme une compétence stratégique, où chaque projet de territoire
                intègre une démarche de design, où les designers normands sont
                des acteurs incontournables de la transition. Ensemble, nous
                construisons ce futur — un projet à la fois, une rencontre à
                la fois, un territoire à la fois.
              </p>
            </div>
          </section>

          {/* Section 03 — Notre fonctionnement */}
          <section id="notre-fonctionnement" className="mb-24 scroll-mt-32">
            <SectionLabel
              number="03"
              label="NOTRE FONCTIONNEMENT"
              className="mb-6 block"
            />
            <h2 className="mb-8 font-display text-display-md italic text-ink">
              Notre fonctionnement
            </h2>
            <div className="max-w-prose space-y-6 text-lg leading-relaxed text-slate/80">
              <p>
                Design Lab Normandie fonctionne comme un collectif ouvert,
                animé par une gouvernance collégiale. Notre bureau, composé de
                designers bénévoles issus de différentes disciplines et
                territoires normands, assure la coordination des actions, la
                représentation du réseau et le lien avec l&apos;APCI et les
                autres antennes régionales du France Design Lab.
              </p>
              <p>
                Nous sommes ouverts à tous les designers exerçant en Normandie
                ou pour le territoire normand, quelle que soit leur discipline,
                leur statut (indépendant, salarié, enseignant, étudiant) ou
                leur niveau d&apos;expérience. Nos valeurs fondatrices —
                solidarité, ouverture, exigence et engagement — guident
                l&apos;ensemble de nos actions et de nos prises de position.
              </p>
              <p>
                Notre action s&apos;articule autour de quatre axes : la mise en
                réseau des professionnels (rencontres, annuaire, mentorat), la
                promotion du design auprès des acteurs économiques et publics,
                la formation et la montée en compétences, et enfin la
                contribution aux réflexions nationales sur le design et la
                transition.
              </p>
            </div>
          </section>

          {/* Section 04 — Nos partenaires */}
          <section id="nos-partenaires" className="scroll-mt-32">
            <SectionLabel
              number="04"
              label="NOS PARTENAIRES"
              className="mb-6 block"
            />
            <h2 className="mb-8 font-display text-display-md italic text-ink">
              Nos partenaires
            </h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-[3/2] items-center justify-center rounded-sm border border-flint/20 bg-flint/5"
                >
                  <span className="font-mono text-xs text-flint/40">
                    Logo partenaire
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
