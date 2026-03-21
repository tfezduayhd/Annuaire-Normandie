import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Providers } from '@/components/providers/Providers'
import './globals.css'

const inter = localFont({
  src: '../public/fonts/Inter-Variable.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
})

const montserrat = localFont({
  src: '../public/fonts/Montserrat-Variable.woff2',
  variable: '--font-montserrat',
  display: 'swap',
  weight: '100 900',
})

const spaceMono = localFont({
  src: [
    { path: '../public/fonts/SpaceMono-Regular.woff2', weight: '400' },
    { path: '../public/fonts/SpaceMono-Bold.woff2', weight: '700' },
  ],
  variable: '--font-space-mono',
  display: 'swap',
})

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
      <body className={`${inter.variable} ${montserrat.variable} ${spaceMono.variable} font-sans bg-chalk text-ink antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
