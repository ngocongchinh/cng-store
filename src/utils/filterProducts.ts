import type { Product } from '../types/product'

export function filterProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) {
    return products
  }

  const lowerQuery = query.toLowerCase().trim()
  return products.filter((product) =>
    product.title.toLowerCase().includes(lowerQuery)
  )
}
