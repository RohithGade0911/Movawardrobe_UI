import Link from 'next/link'
import Image from 'next/image'
import { ShopifyProduct, formatPrice } from '@/lib/shopify'

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const image = product.images.edges[0]?.node
  const price = product.priceRange.minVariantPrice

  return (
    <Link href={`/product/${product.handle}`} className="product-card">
      <div className="product-card-img">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="product-card-img-placeholder">
            <span style={{ fontSize: 11, letterSpacing: '0.1em', color: '#8a8a8a', textTransform: 'uppercase' }}>
              No image
            </span>
          </div>
        )}
        <div className="product-card-overlay" />
      </div>
      <div className="product-card-body">
        <div>
          <div className="product-card-name">{product.title}</div>
          <div className="product-card-cat">Apparel</div>
        </div>
        <div className="product-card-price">
          {formatPrice(price.amount, price.currencyCode)}
        </div>
      </div>
    </Link>
  )
}
