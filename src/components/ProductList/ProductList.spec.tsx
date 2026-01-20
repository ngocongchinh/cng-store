import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductList from './ProductList'
import { fetchProducts } from '../../services/api'

vi.mock('../../services/api')

describe('ProductList', () => {
  const mockProducts = [
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
    {
      id: 3,
      title: 'Product 3',
      price: 30,
      description: '',
      category: '',
      image: '',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should show loading state initially', () => {
    vi.mocked(fetchProducts).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    render(<ProductList searchQuery="" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should render products after loading', async () => {
    vi.mocked(fetchProducts).mockResolvedValue(mockProducts)

    render(<ProductList searchQuery="" />)

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument()
    })
  })

  it('should filter products by search query', async () => {
    vi.mocked(fetchProducts).mockResolvedValue(mockProducts)

    const { rerender } = render(<ProductList searchQuery="" />)

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument()
    })

    rerender(<ProductList searchQuery="Product 1" />)

    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument()
  })

  it('should show no products message when filtered results are empty', async () => {
    vi.mocked(fetchProducts).mockResolvedValue(mockProducts)

    render(<ProductList searchQuery="NonExistent" />)

    await waitFor(() => {
      expect(
        screen.getByText(/No products found matching/)
      ).toBeInTheDocument()
    })
  })

  it('should show error message on fetch failure', async () => {
    const error = new Error('Failed to fetch')
    vi.mocked(fetchProducts).mockRejectedValue(error)

    render(<ProductList searchQuery="" />)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  it('should show load more button when more items available', async () => {
    const manyProducts = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Product ${i + 1}`,
      price: 10,
      description: '',
      category: '',
      image: '',
    }))

    vi.mocked(fetchProducts).mockResolvedValue(manyProducts)

    render(<ProductList searchQuery="" />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument()
    })
  })

  it('should load more products when load more button is clicked', async () => {
    const user = userEvent.setup()
    const manyProducts = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Product ${i + 1}`,
      price: 10,
      description: '',
      category: '',
      image: '',
    }))

    vi.mocked(fetchProducts).mockResolvedValue(manyProducts)

    render(<ProductList searchQuery="" />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument()
    })

    const loadMoreButton = screen.getByRole('button', { name: /load more/i })
    await user.click(loadMoreButton)

    // Should show more products (initially 12, after click should show more)
    await waitFor(() => {
      const products = screen.getAllByText(/Product \d+/)
      expect(products.length).toBeGreaterThan(12)
    })
  })
})
