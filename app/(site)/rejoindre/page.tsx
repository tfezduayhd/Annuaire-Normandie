import type { Metadata } from "next"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { DesignerRegistrationForm } from "@/components/forms/DesignerRegistrationForm"

export const metadata: Metadata = {
  title: "Rejoindre la communauté — Design Lab Normandie",
  description:
    "Inscrivez-vous à l'annuaire des designers normands et rejoignez la communauté Design Lab Normandie.",
}

export default function RejoindrePage() {
  return (
    <main className="bg-chalk px-6 py-section md:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <SectionLabel number="01" label="Inscription" className="mb-6" />

        <h1 className="font-display text-display-lg italic text-ink">
          Rejoindre la communauté
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-flint">
          Tu es designer en Normandie&nbsp;? Rejoins l&apos;annuaire pour
          gagner en visibilité, rencontrer d&apos;autres créatif·ves engagé·es
          et participer à la dynamique du design sur le territoire.
        </p>

        <div className="mt-12">
          <DesignerRegistrationForm />
        </div>
      </div>
    </main>
  )
}
