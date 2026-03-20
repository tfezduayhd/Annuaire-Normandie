import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

export function FeaturedDesigners() {
  return (
    <section className="bg-chalk px-6 py-section md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionLabel number="02" label="ILS FONT NORMANDIE" className="mb-4" />
        <h2 className="font-display text-display-md italic text-ink">
          Derniers inscrits
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-full flex min-h-[200px] items-center justify-center rounded-sm border border-dashed border-flint/30 p-8">
            <p className="text-center text-flint">
              Les premiers designers arrivent bientôt&hellip;
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button href="/annuaire" variant="secondary" size="md">
            Voir tout l&apos;annuaire&nbsp;&rarr;
          </Button>
        </div>
      </div>
    </section>
  )
}
