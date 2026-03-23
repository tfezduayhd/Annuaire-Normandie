import type { Metadata } from "next"
import { DesignerRegistrationForm } from "@/components/forms/DesignerRegistrationForm"

export const metadata: Metadata = {
  title: "Rejoindre la communauté — Design Lab Normandie",
  description:
    "Inscrivez-vous à l'annuaire des designers normands et rejoignez la communauté Design Lab Normandie.",
}

export default function RejoindrePage() {
  return (
    <div className="min-h-screen bg-chalk">
      {/* Page header */}
      <div className="border-b border-slate bg-chalk">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 lg:px-20">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-flint">
            / 01 — Inscription
          </p>
          <h1 className="font-display text-display-lg font-bold text-ink">
            Rejoindre la communauté
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-flint">
            Tu es designer en Normandie&nbsp;? Rejoins l&apos;annuaire pour
            gagner en visibilité, rencontrer d&apos;autres créatif·ves engagé·es
            et participer à la dynamique du design sur le territoire.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-20">
        <div className="max-w-2xl">
          <DesignerRegistrationForm />
        </div>
      </div>
    </div>
  )
}
