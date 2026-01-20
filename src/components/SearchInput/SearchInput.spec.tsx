import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchInput from './SearchInput'
import type { Product } from '../../types/product'

describe('SearchInput', () => {
  const mockSuggestions: Product[] = [
    {
      id: 1,
      title: 'Test Product',
      price: 10,
      description: '',
      category: '',
      image: '',
    },
  ]

  const defaultProps = {
    value: '',
    onChange: vi.fn(),
    suggestions: [] as Product[],
    loading: false,
    error: null,
    activeIndex: -1,
    isOpen: false,
    onSelectSuggestion: vi.fn(),
    onKeyDown: vi.fn(),
    onCloseDropdown: vi.fn(),
    onRetry: vi.fn(),
  }

  it('should render input field', () => {
    render(<SearchInput {...defaultProps} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('should display value', () => {
    render(<SearchInput {...defaultProps} value="test query" />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('test query')
  })

  it('should call onChange when input value changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchInput {...defaultProps} onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'test')

    expect(onChange).toHaveBeenCalled()
  })

  it('should call onKeyDown when key is pressed', async () => {
    const user = userEvent.setup()
    const onKeyDown = vi.fn()
    render(<SearchInput {...defaultProps} onKeyDown={onKeyDown} />)

    const input = screen.getByRole('textbox')
    await user.type(input, '{ArrowDown}')

    expect(onKeyDown).toHaveBeenCalled()
  })

  it('should have correct ARIA attributes', () => {
    render(
      <SearchInput
        {...defaultProps}
        value="test"
        isOpen={true}
        activeIndex={0}
      />
    )
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-label', 'Enter keywords to search for products')
    expect(input).toHaveAttribute('aria-expanded', 'true')
  })

  it('should render autocomplete dropdown when open', () => {
    render(
      <SearchInput
        {...defaultProps}
        suggestions={mockSuggestions}
        isOpen={true}
      />
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
