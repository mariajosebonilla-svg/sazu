import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Cursor } from '@/components/ui/Cursor'

export const metadata: Metadata = {
  title: {
    default: 'Sazú — Agencia Creativa Integral',
    template: '%s | Sazú',
  },
  description:
    'Branding, producto digital y marketing de performance para organizaciones que quieren liderar. Agencia creativa integral con sede en Colombia.',
  keywords: ['agencia creativa', 'branding', 'UX', 'marketing digital', 'Colombia'],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'Sazú',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://sazu.co'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-sazu-black text-sazu-white antialiased overflow-x-hidden">
        {/* Noise texture */}
        <div className="noise-overlay" aria-hidden="true" />
        {/* Custom cursor */}
        <Cursor />
        {/* Nav */}
        <Navigation />
        {/* Main content */}
        <main>{children}</main>
        {/* Footer */}
        <Footer />
      </body>
    </html>
  )
}
