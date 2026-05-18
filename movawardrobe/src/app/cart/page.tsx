'use client'

import { useCart } from '@/lib/cart-context'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/shopify'

export default function CartPage() {
  const { cart, loading, removeItem, updateItem } = useCart()
  const lines = cart?.lines.edges.map(e => e.node) ?? []

  if (lines.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-title">Your Bag</h1>
        <div className="cart-empty">
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 24, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Your bag is empty
          </p>
          <p style={{ fontSize: 14, color: '#8a8a8a', marginBottom: 32 }}>
            Discover pieces you'll reach for every day.
          </p>
          <Link href="/shop" style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', borderBottom: '1px solid #0a0a0a', paddingBottom: 4 }}>
            Continue Shopping →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Bag</h1>

      <div>
        {lines.map(line => {
          const img = line.merchandise.product.images.edges[0]?.node
          return (
            <div key={line.id} className="cart-item">
              <div className="cart-item-img">
                {img ? (
                  <Image src={img.url} alt={line.merchandise.product.title} width={80} height={107} style={{ objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#e8e7e3' }} />
                )}
              </div>

              <div>
                <p className="cart-item-name">{line.merchandise.product.title}</p>
                {line.merchandise.title !== 'Default Title' && (
                  <p className="cart-item-variant">{line.merchandise.title}</p>
                )}
                <div className="cart-qty">
                  <button
                    className="cart-qty-btn"
                    onClick={() => line.quantity > 1 ? updateItem(line.id, line.quantity - 1) : removeItem(line.id)}
                    disabled={loading}
                  >−</button>
                  <span style={{ fontSize: 14, minWidth: 20, textAlign: 'center' }}>{line.quantity}</span>
                  <button
                    className="cart-qty-btn"
                    onClick={() => updateItem(line.id, line.quantity + 1)}
                    disabled={loading}
                  >+</button>
                </div>
                <button className="cart-remove" onClick={() => removeItem(line.id)} disabled={loading}>
                  Remove
                </button>
              </div>

              <div className="cart-item-price">
                {formatPrice(
                  (parseFloat(line.merchandise.price.amount) * line.quantity).toString(),
                  line.merchandise.price.currencyCode
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="cart-summary">
        <div>
          <div className="cart-total-label">Total</div>
          <div className="cart-total">
            {cart ? formatPrice(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode) : '—'}
          </div>
        </div>
        <p style={{ fontSize: 12, color: '#8a8a8a' }}>Shipping calculated at checkout</p>
      </div>

      {cart?.checkoutUrl && (
        <a href={cart.checkoutUrl} className="btn-checkout">
          Proceed to Checkout →
        </a>
      )}

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Link href="/shop" style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a8a8a' }}>
          ← Continue Shopping
        </Link>
      </div>
    </div>
  )
}
