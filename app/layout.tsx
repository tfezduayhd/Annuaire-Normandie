import type { Metadata } from 'next'
import { Inter, Montserrat, Space_Mono } from 'next/font/google'
import { Providers } from '@/components/providers/Providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
  weight: ['400', '700'],
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
