import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchProducts, fetchAutocompleteSuggestions } from './api'

describe('api', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('fetchProducts', () => {
    it('should fetch products successfully', async () => {
      const mockProducts = [
        {
          id: 1,
          title: 'Test Product',
          price: 10.99,
          description: 'Test description',
          category: 'test',
          image: 'test.jpg',
        },
      ]

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      } as Response)

      const result = await fetchProducts()

      expect(result).toEqual(mockProducts)
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products')
    })

    it('should throw error on failed request', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      } as Response)

      await expect(fetchProducts()).rejects.toThrow('Failed to fetch products: Not Found')
    })
  })

  describe('fetchAutocompleteSuggestions', () => {
    it('should return empty array for queries shorter than 2 characters', async () => {
      const result = await fetchAutocompleteSuggestions('a')
      expect(result).toEqual([])
      expect(fetch).not.toHaveBeenCalled()
    })

    it('should fetch suggestions successfully', async () => {
      const mockResponse = {
        products: [
          {
            id: 1,
            title: 'Product 1',
            price: 10,
            description: '',
            category: '',
            image: '',
          },
          {
            id: 2,
            title: 'Product 2',
            price: 20,
            description: '',
            category: '',
            image: '',
          },
        ],
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await fetchAutocompleteSuggestions('product')

      expect(result).toHaveLength(2)
      expect(fetch).toHaveBeenCalledWith(
        'https://dummyjson.com/products/search?q=product',
        expect.any(Object)
      )
    })

    it('should limit results to 10 suggestions', async () => {
      const mockResponse = {
        products: Array.from({ length: 15 }, (_, i) => ({
          id: i + 1,
          title: `Product ${i + 1}`,
          price: 10,
          description: '',
          category: '',
          image: '',
        })),
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await fetchAutocompleteSuggestions('product')

      expect(result).toHaveLength(10)
    })

    it('should support AbortController', async () => {
      const abortController = new AbortController()
      abortController.abort()

      await expect(
        fetchAutocompleteSuggestions('test', abortController.signal)
      ).rejects.toThrow()
    })

    it('should throw error on failed request', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        statusText: 'Server Error',
      } as Response)

      await expect(fetchAutocompleteSuggestions('test')).rejects.toThrow(
        'Failed to fetch suggestions: Server Error'
      )
    })
  })
})
