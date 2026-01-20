import { describe, it, expect, beforeEach } from 'vitest'
import { getCached, setCached, clearCache } from './cache'
import type { Product } from '../types/product'

describe('cache', () => {
  beforeEach(() => {
    clearCache()
  })

  it('should store and retrieve cached results', () => {
    const query = 'test query'
    const products: Product[] = [
      {
        id: 1,
        title: 'Test Product',
        price: 10,
        description: '',
        category: '',
        image: '',
      },
    ]

    setCached(query, products)
    const result = getCached(query)

    expect(result).toEqual(products)
  })

  it('should handle case-insensitive queries', () => {
    const products: Product[] = [
      {
        id: 1,
        title: 'Test Product',
        price: 10,
        description: '',
        category: '',
        image: '',
      },
    ]

    setCached('TEST QUERY', products)
    const result = getCached('test query')

    expect(result).toEqual(products)
  })

  it('should trim whitespace from queries', () => {
    const products: Product[] = [
      {
        id: 1,
        title: 'Test Product',
        price: 10,
        description: '',
        category: '',
        image: '',
      },
    ]

    setCached('  test query  ', products)
    const result = getCached('test query')

    expect(result).toEqual(products)
  })

  it('should return undefined for non-existent queries', () => {
    const result = getCached('non-existent')
    expect(result).toBeUndefined()
  })

  it('should clear all cached results', () => {
    const products: Product[] = [
      {
        id: 1,
        title: 'Test Product',
        price: 10,
        description: '',
        category: '',
        image: '',
      },
    ]

    setCached('query1', products)
    setCached('query2', products)

    clearCache()

    expect(getCached('query1')).toBeUndefined()
    expect(getCached('query2')).toBeUndefined()
  })
})
