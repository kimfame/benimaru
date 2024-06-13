import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import SessionProvider from '@/components/provider/SessionProvider'
import Header from '@/components/layout/header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Benimaru Shop',
  description: 'We have all items',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
