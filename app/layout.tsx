import type { Metadata } from 'next'
import { Providers } from '@/components/providers/Providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Design Lab Normandie — Annuaire des designers normands',
  description:
    'Plateforme collaborative qui fédère les designers de Normandie. Annuaire professionnel, projets, événements et ressources du réseau design normand.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="font-sans bg-chalk text-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
