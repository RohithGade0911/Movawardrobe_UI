import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'

export const metadata: Metadata = {
  title: 'MovaWardrobe — Minimal Editorial Fashion',
  description: 'Carefully considered clothing. Designed to move with you.',
  openGraph: {
    title: 'MovaWardrobe',
    description: 'Carefully considered clothing. Designed to move with you.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Preloader />
          <Nav />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
