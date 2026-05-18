import Link from 'next/link'
import { getProducts } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'

export const revalidate = 60

export default async function HomePage() {
  const products = await getProducts()
  const featured = products.slice(0, 4)

  const marqueeItems = ['New Arrivals', 'Minimal Design', 'Quality Fabrics', 'Considered Craft', 'Free Shipping Over $100', 'New Arrivals', 'Minimal Design', 'Quality Fabrics', 'Considered Craft', 'Free Shipping Over $100']

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="hero-eyebrow fade-up fade-up-1">SS 2025 Collection</p>
          <h1 className="hero-title fade-up fade-up-2">
            Wear<br />
            <em>what</em><br />
            moves you
          </h1>
          <p className="hero-sub fade-up fade-up-3">
            Carefully considered clothing for the intentional wardrobe. Less, but better.
          </p>
          <Link href="/shop" className="hero-cta fade-up fade-up-4">
            Explore Collection
            <span className="hero-cta-arrow">→</span>
          </Link>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <Link href="/shop" className="section-link">View all →</Link>
          </div>
          <div className="product-grid">
            {featured.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Editorial band */}
      <section style={{ padding: '80px 32px', borderTop: '1px solid #e8e7e3', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: 16 }}>Our Philosophy</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 24 }}>
            Designed for<br /><em style={{ fontStyle: 'italic', color: '#8a8a8a' }}>real life</em>
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: '#8a8a8a', maxWidth: 400, marginBottom: 32 }}>
            MovaWardrobe is built around a single idea: that great clothing should feel effortless. Every piece is designed with intention, made to last, and built to move with you.
          </p>
          <Link href="/about" style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '1px solid #0a0a0a', paddingBottom: 4 }}>
            Our story →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px' }}>
          {[
            { num: '100%', label: 'Considered design' },
            { num: '0', label: 'Compromises' },
            { num: '∞', label: 'Wearability' },
            { num: '1', label: 'Focus: you' },
          ].map((s, i) => (
            <div key={i} style={{ background: i % 2 === 0 ? '#0a0a0a' : '#e8e7e3', padding: '32px 24px' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 36, letterSpacing: '-0.04em', color: i % 2 === 0 ? '#f5f4f0' : '#0a0a0a', marginBottom: 8 }}>{s.num}</div>
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: i % 2 === 0 ? '#8a8a8a' : '#0a0a0a' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* All products */}
      {products.length > 4 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-header">
            <h2 className="section-title">Full Collection</h2>
            <span style={{ fontSize: 12, color: '#8a8a8a' }}>{products.length} pieces</span>
          </div>
          <div className="product-grid">
            {products.slice(4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {products.length === 0 && (
        <section className="section" style={{ textAlign: 'center', padding: '120px 32px' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 32, letterSpacing: '-0.02em', marginBottom: 16 }}>Coming soon</p>
          <p style={{ fontSize: 14, color: '#8a8a8a' }}>The collection is being prepared. Check back shortly.</p>
        </section>
      )}
    </>
  )
}
