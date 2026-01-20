import type { Product } from '../types/product'

const PRODUCTS_API = 'https://fakestoreapi.com/products'
const AUTOCOMPLETE_API = 'https://dummyjson.com/products/search'

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_API)

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchAutocompleteSuggestions(
  query: string,
  signal?: AbortSignal
): Promise<Product[]> {
  if (query.length < 2) {
    return []
  }

  const url = `${AUTOCOMPLETE_API}?q=${encodeURIComponent(query)}`
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`Failed to fetch suggestions: ${response.statusText}`)
  }

  const data = await response.json()
  return (data.products || []).slice(0, 10) as Product[]
}
