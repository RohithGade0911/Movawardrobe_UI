import { getProducts } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Shop — MovaWardrobe' }
export const revalidate = 60

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1 className="shop-title">Collection</h1>
        <p className="shop-count">{products.length} {products.length === 1 ? 'piece' : 'pieces'}</p>
      </div>

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div style={{ padding: '80px 0', textAlign: 'center', color: '#8a8a8a' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 28, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Collection coming soon
          </p>
          <p style={{ fontSize: 14 }}>Add products in your Shopify dashboard to see them here.</p>
        </div>
      )}
    </div>
  )
}
