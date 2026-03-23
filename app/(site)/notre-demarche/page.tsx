import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notre démarche — Design Lab Normandie',
  description:
    "Découvrez l\u2019équipe, le réseau France Design Lab (APCI) et la méthode qui guide la construction de Design Lab Normandie.",
}

const FRANCE_DESIGN_PROGRAMS = [
  { name: 'France Design Week', description: 'Événement national de valorisation du design français.' },
  { name: 'France Design Impact Award', description: 'Prix récompensant des projets de design à fort impact social et économique.' },
  { name: "France Design Mode d'Emploi", description: 'Programme de sensibilisation du design à destination des PME.' },
  { name: 'France Design Lab', description: 'Réseau de labs régionaux pour structurer les communautés de designers sur les territoires.' },
  { name: 'France Design Hub', description: "Plateforme nationale de ressources et d\u2019outillage pour les acteurs du design." },
] as const

const RESEARCH_QUESTIONS = [
  'Comment structurer la communauté ?',
  'Comment identifier les designers ?',
  'Comment comprendre leurs besoins ?',
  'Comment co-construire avec les volontaires ?',
  'Comment animer la communauté ?',
  'Comment rendre visible les compétences design du territoire ?',
] as const

const PARTNERS = [
  { name: 'CCI Normandie', description: "Chambre de Commerce et d\u2019Industrie" },
  { name: 'Région Normandie', description: 'Collectivité territoriale' },
  { name: 'APCI', description: 'Agence pour la Promotion de la Création Industrielle' },
] as const

export default function NotreDemarchePage() {
  return (
    <div className="min-h-screen bg-chalk">
      {/* Page header */}
      <div className="border-b border-slate bg-chalk">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 lg:px-20">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
            / 01 — Notre démarche
          </p>
          <h1 className="font-display text-display-lg font-bold text-ink">
            Notre démarche
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">

        {/* Section 1 — L'équipe */}
        <section className="border-b border-slate py-16">
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
            / 01 — L&apos;équipe
          </p>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-display-md font-bold text-ink">
                Qui porte ce projet&nbsp;?
              </h2>
              <p className="mt-5 leading-relaxed text-flint">
                Design Lab Normandie est porté par une équipe d&apos;étudiants en design
                dans le cadre d&apos;un projet pédagogique ambitieux. Nous expérimentons
                en temps réel la construction d&apos;une communauté professionnelle sur
                le territoire normand.
              </p>
              <p className="mt-4 leading-relaxed text-flint">
                Encadrés par des enseignants-chercheurs, nous articulons recherche
                de terrain, design de service et implication des parties prenantes
                pour co-construire un lab pérenne avec les designers normands.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="border border-slate bg-white p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-flint">
                  Cadre pédagogique
                </p>
                <p className="mt-2 font-display text-lg font-bold text-ink">
                  Projet de fin d&apos;études
                </p>
                <p className="mt-2 text-sm leading-relaxed text-flint">
                  Ce projet s&apos;inscrit dans un cursus de design de service et d&apos;innovation
                  territoriale, avec un ancrage fort dans la pratique professionnelle réelle.
                </p>
              </div>
              <div className="border border-slate bg-white p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-flint">
                  Approche
                </p>
                <p className="mt-2 font-display text-lg font-bold text-ink">
                  Recherche-action
                </p>
                <p className="mt-2 text-sm leading-relaxed text-flint">
                  Nous menons des entretiens, sondages et ateliers pour comprendre
                  les besoins réels des designers normands avant de construire les services du Lab.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — France Design Lab */}
        <section className="border-b border-slate py-16">
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
            / 02 — France Design Lab
          </p>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-display-md font-bold text-ink">
                Le réseau France Design Lab
              </h2>
              <p className="mt-5 leading-relaxed text-flint">
                L&apos;APCI (Agence pour la Promotion de la Création Industrielle) pilote
                le programme <strong>France Design Lab</strong>, un réseau national de labs
                régionaux visant à structurer et valoriser le design sur tous les territoires
                français.
              </p>
              <p className="mt-4 leading-relaxed text-flint">
                L&apos;APCI coordonne 5 programmes nationaux qui forment un écosystème cohérent
                autour de la promotion du design en France.
              </p>
            </div>
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-flint">
                5 programmes France Design
              </p>
              <div className="flex flex-col gap-0 border border-slate">
                {FRANCE_DESIGN_PROGRAMS.map((program, i) => (
                  <div
                    key={program.name}
                    className={`bg-white p-5 transition-colors hover:bg-chalk ${i > 0 ? 'border-t border-slate' : ''}`}
                  >
                    <p className="font-display font-bold text-ink">{program.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-flint">
                      {program.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — Notre méthode */}
        <section className="border-b border-slate py-16">
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
            / 03 — Notre méthode
          </p>
          <h2 className="mb-10 font-display text-display-md font-bold text-ink">
            6 questions de recherche
          </h2>
          <div className="grid gap-px border border-slate bg-slate sm:grid-cols-2 lg:grid-cols-3">
            {RESEARCH_QUESTIONS.map((question, i) => (
              <div key={question} className="flex flex-col gap-3 bg-chalk p-8 transition-colors hover:bg-white">
                <span className="font-mono text-[10px] uppercase tracking-widest text-earth">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-display text-lg font-bold leading-tight text-ink">
                  {question}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 — Partenaires */}
        <section className="py-16">
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
            / 04 — Partenaires
          </p>
          <h2 className="mb-10 font-display text-display-md font-bold text-ink">
            Nos partenaires
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col items-center justify-center border border-slate bg-white p-10 text-center transition-colors hover:bg-chalk"
              >
                <p className="font-display text-xl font-bold text-ink">
                  {partner.name}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-flint">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
