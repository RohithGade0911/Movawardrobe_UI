'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { Cart, createCart, addToCart, removeFromCart, updateCartLine } from '@/lib/shopify'

type CartContextType = {
  cart: Cart | null
  loading: boolean
  addItem: (variantId: string, quantity?: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  cartCount: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(false)

  const getOrCreateCart = useCallback(async (): Promise<Cart> => {
    const cartId = localStorage.getItem('movawardrobe-cart-id')
    if (cartId && cart) return cart
    const newCart = await createCart()
    localStorage.setItem('movawardrobe-cart-id', newCart.id)
    return newCart
  }, [cart])

  useEffect(() => {
    const cartId = localStorage.getItem('movawardrobe-cart-id')
    if (cartId) {
      createCart().then(c => {
        localStorage.setItem('movawardrobe-cart-id', c.id)
        setCart(c)
      })
    }
  }, [])

  const addItem = async (variantId: string, quantity = 1) => {
    setLoading(true)
    try {
      const currentCart = await getOrCreateCart()
      const updated = await addToCart(currentCart.id, variantId, quantity)
      setCart(updated)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (lineId: string) => {
    if (!cart) return
    setLoading(true)
    try {
      const updated = await removeFromCart(cart.id, lineId)
      setCart(updated)
    } finally {
      setLoading(false)
    }
  }

  const updateItem = async (lineId: string, quantity: number) => {
    if (!cart) return
    setLoading(true)
    try {
      const updated = await updateCartLine(cart.id, lineId, quantity)
      setCart(updated)
    } finally {
      setLoading(false)
    }
  }

  const cartCount = cart?.totalQuantity ?? 0

  return (
    <CartContext.Provider value={{ cart, loading, addItem, removeItem, updateItem, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
