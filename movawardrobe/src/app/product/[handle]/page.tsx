import { getProduct, getProducts, formatPrice } from '@/lib/shopify'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import AddToCartButton from './AddToCartButton'
import Link from 'next/link'

export const revalidate = 60

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map(p => ({ handle: p.handle }))
}

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const product = await getProduct(params.handle)
  if (!product) return {}
  return {
    title: `${product.title} — MovaWardrobe`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle)
  if (!product) notFound()

  const images = product.images.edges.map(e => e.node)
  const variants = product.variants.edges.map(e => e.node)
  const price = product.priceRange.minVariantPrice

  return (
    <div className="product-detail">
      {/* Images */}
      <div className="product-images">
        {images[0] ? (
          <Image
            src={images[0].url}
            alt={images[0].altText ?? product.title}
            fill
            priority
            sizes="50vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#e8e7e3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.1em', color: '#8a8a8a', textTransform: 'uppercase' }}>No image</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="product-info">
        <div className="product-breadcrumb">
          <Link href="/shop" style={{ color: '#8a8a8a' }}>Shop</Link>
          <span style={{ color: '#8a8a8a' }}>/</span>
          <span>{product.title}</span>
        </div>

        <h1 className="product-title">{product.title}</h1>
        <p className="product-price">{formatPrice(price.amount, price.currencyCode)}</p>

        {product.description && (
          <p className="product-desc">{product.description}</p>
        )}

        <AddToCartButton variants={variants} />

        {/* Additional images */}
        {images.length > 1 && (
          <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
            {images.slice(1, 5).map((img, i) => (
              <div key={i} style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden' }}>
                <Image
                  src={img.url}
                  alt={img.altText ?? product.title}
                  fill
                  sizes="20vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Details */}
        <div style={{ marginTop: 40, borderTop: '1px solid #e8e7e3', paddingTop: 32 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: 16 }}>Details</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Free shipping on orders over $100', 'Returns accepted within 30 days', 'Sustainably sourced materials'].map((d, i) => (
              <li key={i} style={{ fontSize: 13, color: '#8a8a8a', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: '#0a0a0a', marginTop: 2 }}>—</span>{d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
