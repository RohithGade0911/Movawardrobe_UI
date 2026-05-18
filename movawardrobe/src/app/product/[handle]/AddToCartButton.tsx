'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'

type Variant = {
  id: string
  title: string
  availableForSale: boolean
  price: { amount: string; currencyCode: string }
}

export default function AddToCartButton({ variants }: { variants: Variant[] }) {
  const { addItem, loading } = useCart()
  const [selected, setSelected] = useState<Variant | null>(variants.length === 1 ? variants[0] : null)
  const [added, setAdded] = useState(false)

  const hasMultiple = variants.length > 1

  const handleAdd = async () => {
    if (!selected) return
    await addItem(selected.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      {hasMultiple && (
        <>
          <p className="variants-label">Size / Option</p>
          <div className="variants">
            {variants.map(v => (
              <button
                key={v.id}
                className={`variant-btn${selected?.id === v.id ? ' selected' : ''}${!v.availableForSale ? ' unavailable' : ''}`}
                onClick={() => v.availableForSale && setSelected(v)}
                disabled={!v.availableForSale}
              >
                {v.title}
              </button>
            ))}
          </div>
        </>
      )}

      <button
        className={`btn-atc${added ? ' added' : ''}`}
        onClick={handleAdd}
        disabled={!selected || loading}
      >
        {loading ? 'Adding...' : added ? '✓ Added to Bag' : !selected ? 'Select a size' : 'Add to Bag'}
      </button>

      <p style={{ fontSize: 12, color: '#8a8a8a', textAlign: 'center', letterSpacing: '0.05em' }}>
        Free returns · Secure checkout
      </p>
    </div>
  )
}
