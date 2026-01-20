import { describe, it, expect } from 'vitest'
import { filterProducts } from './filterProducts'
import type { Product } from '../types/product'

describe('filterProducts', () => {
  const products: Product[] = [
    {
      id: 1,
      title: 'iPhone 13',
      price: 999,
      description: '',
      category: '',
      image: '',
    },
    {
      id: 2,
      title: 'Samsung Galaxy',
      price: 899,
      description: '',
      category: '',
      image: '',
    },
    {
      id: 3,
      title: 'Google Pixel',
      price: 799,
      description: '',
      category: '',
      image: '',
    },
  ]

  it('should return all products when query is empty', () => {
    const result = filterProducts(products, '')
    expect(result).toEqual(products)
  })

  it('should return all products when query is only whitespace', () => {
    const result = filterProducts(products, '   ')
    expect(result).toEqual(products)
  })

  it('should filter products by title (case-insensitive)', () => {
    const result = filterProducts(products, 'iphone')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('iPhone 13')
  })

  it('should filter products by partial match', () => {
    const result = filterProducts(products, 'Galaxy')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Samsung Galaxy')
  })

  it('should return empty array when no matches found', () => {
    const result = filterProducts(products, 'Nokia')
    expect(result).toEqual([])
  })

  it('should handle multiple matches', () => {
    const moreProducts: Product[] = [
      ...products,
      {
        id: 4,
        title: 'iPhone 14',
        price: 1099,
        description: '',
        category: '',
        image: '',
      },
    ]

    const result = filterProducts(moreProducts, 'iPhone')
    expect(result).toHaveLength(2)
  })

  it('should trim query before filtering', () => {
    const result = filterProducts(products, '  iPhone  ')
    expect(result).toHaveLength(1)
  })
})
