'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCart } from '@/lib/cart-context'

export default function Nav() {
  const pathname = usePathname()
  const { cartCount } = useCart()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <Link href="/" className="nav-logo">MovaWardrobe</Link>

      <div className="nav-links">
        <Link href="/shop" className={`nav-link${pathname === '/shop' ? ' active' : ''}`}>Shop</Link>
        <Link href="/about" className={`nav-link${pathname === '/about' ? ' active' : ''}`}>About</Link>
        <Link href="/contact" className={`nav-link${pathname === '/contact' ? ' active' : ''}`}>Contact</Link>
      </div>

      <Link href="/cart" className="nav-cart nav-link">
        Bag
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </Link>
    </nav>
  )
}
