import { Header } from '@/components/header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Asistencia App',
  description: 'Llevar la asistencia nunca fue tan facil.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Header />
        {children}
        <TailwindIndicator />
      </body>
    </html>
  )
}
