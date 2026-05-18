const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!

export type ShopifyProduct = {
  id: string
  handle: string
  title: string
  description: string
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } }
  images: { edges: { node: { url: string; altText: string | null } }[] }
  variants: { edges: { node: { id: string; title: string; availableForSale: boolean; price: { amount: string; currencyCode: string } } }[] }
}

export type CartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    product: { title: string; handle: string; images: { edges: { node: { url: string } }[] } }
    price: { amount: string; currencyCode: string }
  }
}

export type Cart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: { totalAmount: { amount: string; currencyCode: string } }
  lines: { edges: { node: CartLine }[] }
}

async function shopifyFetch(query: string, variables?: Record<string, unknown>) {
  const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  })
  const json = await res.json()
  if (json.errors) throw new Error(json.errors[0].message)
  return json.data
}

export async function getProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch(`
    query {
      products(first: 50) {
        edges {
          node {
            id handle title description
            priceRange { minVariantPrice { amount currencyCode } }
            images(first: 3) { edges { node { url altText } } }
            variants(first: 10) { edges { node { id title availableForSale price { amount currencyCode } } } }
          }
        }
      }
    }
  `)
  return data.products.edges.map((e: { node: ShopifyProduct }) => e.node)
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch(`
    query($handle: String!) {
      productByHandle(handle: $handle) {
        id handle title description
        priceRange { minVariantPrice { amount currencyCode } }
        images(first: 10) { edges { node { url altText } } }
        variants(first: 20) { edges { node { id title availableForSale price { amount currencyCode } } } }
      }
    }
  `, { handle })
  return data.productByHandle
}

export async function createCart(): Promise<Cart> {
  const data = await shopifyFetch(`
    mutation {
      cartCreate {
        cart {
          id checkoutUrl totalQuantity
          cost { totalAmount { amount currencyCode } }
          lines(first: 50) { edges { node {
            id quantity
            merchandise { ... on ProductVariant {
              id title
              price { amount currencyCode }
              product { title handle images(first: 1) { edges { node { url } } } }
            }}
          }}}
        }
      }
    }
  `)
  return data.cartCreate.cart
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1): Promise<Cart> {
  const data = await shopifyFetch(`
    mutation($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id checkoutUrl totalQuantity
          cost { totalAmount { amount currencyCode } }
          lines(first: 50) { edges { node {
            id quantity
            merchandise { ... on ProductVariant {
              id title
              price { amount currencyCode }
              product { title handle images(first: 1) { edges { node { url } } } }
            }}
          }}}
        }
      }
    }
  `, { cartId, lines: [{ merchandiseId: variantId, quantity }] })
  return data.cartLinesAdd.cart
}

export async function removeFromCart(cartId: string, lineId: string): Promise<Cart> {
  const data = await shopifyFetch(`
    mutation($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id checkoutUrl totalQuantity
          cost { totalAmount { amount currencyCode } }
          lines(first: 50) { edges { node {
            id quantity
            merchandise { ... on ProductVariant {
              id title
              price { amount currencyCode }
              product { title handle images(first: 1) { edges { node { url } } } }
            }}
          }}}
        }
      }
    }
  `, { cartId, lineIds: [lineId] })
  return data.cartLinesRemove.cart
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch(`
    mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id checkoutUrl totalQuantity
          cost { totalAmount { amount currencyCode } }
          lines(first: 50) { edges { node {
            id quantity
            merchandise { ... on ProductVariant {
              id title
              price { amount currencyCode }
              product { title handle images(first: 1) { edges { node { url } } } }
            }}
          }}}
        }
      }
    }
  `, { cartId, lines: [{ id: lineId, quantity }] })
  return data.cartLinesUpdate.cart
}

export function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(parseFloat(amount))
}
