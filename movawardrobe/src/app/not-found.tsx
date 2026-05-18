import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
      <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: 24 }}>404</p>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '-0.03em', marginBottom: 24 }}>
        Page not found
      </h1>
      <p style={{ fontSize: 14, color: '#8a8a8a', marginBottom: 40 }}>
        The page you're looking for doesn't exist.
      </p>
      <Link href="/" style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', borderBottom: '1px solid #0a0a0a', paddingBottom: 4 }}>
        Back to Home →
      </Link>
    </div>
  )
}
