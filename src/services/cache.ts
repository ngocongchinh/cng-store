import type { Product } from '../types/product'

const cache = new Map<string, Product[]>()

export function getCached(query: string): Product[] | undefined {
  return cache.get(query.toLowerCase().trim())
}

export function setCached(query: string, results: Product[]): void {
  cache.set(query.toLowerCase().trim(), results)
}

export function clearCache(): void {
  cache.clear()
}
