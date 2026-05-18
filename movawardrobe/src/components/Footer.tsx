import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer-copy">© {new Date().getFullYear()} MovaWardrobe. All rights reserved.</span>
      <div className="footer-links">
        <Link href="/shop" className="footer-link">Shop</Link>
        <Link href="/about" className="footer-link">About</Link>
        <Link href="/contact" className="footer-link">Contact</Link>
        <Link href="/cart" className="footer-link">Bag</Link>
      </div>
    </footer>
  )
}
