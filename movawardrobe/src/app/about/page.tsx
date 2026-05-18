import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'About — MovaWardrobe' }

export default function AboutPage() {
  return (
    <>
      <div className="about-hero">
        <p className="about-eyebrow">Our Story</p>
        <h1 className="about-title">
          Clothing that<br />
          <em>moves</em> with<br />
          your life
        </h1>
        <div className="about-body">
          <p>
            MovaWardrobe was born from a simple frustration: most clothing is designed for display, not for living. We set out to build a wardrobe where every piece earns its place — through quality, versatility, and honest design.
          </p>
          <p>
            We work with a small team of designers and a network of carefully chosen manufacturers. Every material is selected for how it feels after a hundred washes, not just how it photographs. Every silhouette is tested across body types, climates, and days.
          </p>
          <p>
            Less, but better. That's the only brief we ever give ourselves.
          </p>
        </div>
      </div>

      <div className="about-stats">
        <div className="about-stat">
          <div className="about-stat-num">2022</div>
          <div className="about-stat-label">Founded</div>
        </div>
        <div className="about-stat" style={{ paddingLeft: 32 }}>
          <div className="about-stat-num">100%</div>
          <div className="about-stat-label">Intentional design</div>
        </div>
        <div className="about-stat" style={{ paddingLeft: 32 }}>
          <div className="about-stat-num">0</div>
          <div className="about-stat-label">Wasted pieces</div>
        </div>
      </div>

      <section style={{ padding: '0 32px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', maxWidth: 1000 }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: 16 }}>How we work</p>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: '#8a8a8a' }}>
            We design in small batches. We don't chase trends. We release a collection when it's ready, not when a calendar demands it. This means you'll sometimes wait — but what arrives will be worth it.
          </p>
        </div>
        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: 16 }}>What we believe</p>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: '#8a8a8a' }}>
            A great wardrobe isn't about having more. It's about having exactly what you need, in the best version possible. We're building that wardrobe, one piece at a time.
          </p>
        </div>
      </section>

      <section style={{ borderTop: '1px solid #e8e7e3', padding: '60px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 3vw, 36px)', letterSpacing: '-0.02em', marginBottom: 12 }}>
            Ready to start?
          </p>
          <p style={{ fontSize: 14, color: '#8a8a8a' }}>Discover the current collection.</p>
        </div>
        <Link href="/shop" style={{ padding: '14px 32px', background: '#0a0a0a', color: '#f5f4f0', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Shop Now →
        </Link>
      </section>
    </>
  )
}
