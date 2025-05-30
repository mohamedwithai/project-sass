import './globals.css'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/toaster'
import { Dashboard } from '@/components/layout/dashboard'
import { Toaster as SonnerToaster } from 'sonner'

const outfit = Outfit({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Tail Admin Dashboard',
  description: 'A professional admin dashboard template',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <Providers>
          <Dashboard>{children}</Dashboard>
          <Toaster />
          <SonnerToaster />
        </Providers>
      </body>
    </html>
  )
}