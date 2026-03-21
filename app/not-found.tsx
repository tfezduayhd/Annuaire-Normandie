import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <main className="bg-chalk px-6 py-section flex min-h-screen flex-col items-center justify-center text-center">
      <p className="text-display-xl font-display text-flint/20">404</p>
      <h1 className="text-display-md font-display font-bold text-ink mt-4">
        Page introuvable
      </h1>
      <p className="text-slate mt-4 max-w-md text-lg">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="mt-8">
        <Button variant="primary" href="/">
          Retour à l&apos;accueil
        </Button>
      </div>
    </main>
  )
}
