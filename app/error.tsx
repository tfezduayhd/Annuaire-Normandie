'use client'

import { Button } from '@/components/ui/Button'

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="bg-chalk px-6 py-section flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-display-md font-display italic text-ink">
        Une erreur est survenue
      </h1>
      <p className="text-slate mt-4 max-w-md text-lg">
        Quelque chose s&apos;est mal passé. Veuillez réessayer.
      </p>
      <div className="mt-8 flex gap-4">
        <Button variant="primary" onClick={() => reset()}>
          Réessayer
        </Button>
        <Button variant="primary" href="/">
          Retour à l&apos;accueil
        </Button>
      </div>
    </main>
  )
}
