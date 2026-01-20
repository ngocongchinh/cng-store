import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProductCard from './ProductCard'
import type { Product } from '../../types/product'

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test description',
    category: 'electronics',
    image: 'https://example.com/image.jpg',
    rating: {
      rate: 4.5,
      count: 100,
    },
  }

  it('should render product information', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })

  it('should render product image with alt text', () => {
    render(<ProductCard product={mockProduct} />)
    const image = screen.getByAltText('Test Product')
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('should render rating when available', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText(/⭐ 4.5/)).toBeInTheDocument()
    expect(screen.getByText(/\(100 reviews\)/)).toBeInTheDocument()
  })

  it('should not render rating when not available', () => {
    const productWithoutRating: Product = {
      ...mockProduct,
      rating: undefined,
    }
    render(<ProductCard product={productWithoutRating} />)
    expect(screen.queryByText(/⭐/)).not.toBeInTheDocument()
  })

  it('should format price correctly', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })
})
