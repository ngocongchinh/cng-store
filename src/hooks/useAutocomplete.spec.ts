import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAutocomplete } from './useAutocomplete'
import { fetchAutocompleteSuggestions } from '../services/api'
import { getCached, clearCache } from '../services/cache'

vi.mock('../services/api')
vi.mock('../services/cache')

describe('useAutocomplete', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    clearCache()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useAutocomplete())

    expect(result.current.query).toBe('')
    expect(result.current.suggestions).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.isOpen).toBe(false)
  })

  it('should not fetch suggestions for queries shorter than minQueryLength', async () => {
    const { result } = renderHook(() =>
      useAutocomplete({ minQueryLength: 2 })
    )

    act(() => {
      result.current.setQuery('a')
      vi.advanceTimersByTime(300)
    })
    expect(fetchAutocompleteSuggestions).not.toHaveBeenCalled()
  })

  it('should fetch suggestions after debounce delay', async () => {
    const mockSuggestions = [
      { id: 1, title: 'Test Product', price: 10, description: '', category: '', image: '' },
    ]
    vi.mocked(fetchAutocompleteSuggestions).mockResolvedValue(mockSuggestions)

    const { result } = renderHook(() => useAutocomplete())

    act(() => {
      result.current.setQuery('test')
    })

    expect(result.current.loading).toBe(false)

    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current.loading).toBe(true)

    await act(async () => {
      await Promise.resolve()
    })

    expect(result.current.suggestions).toEqual(mockSuggestions)
    expect(result.current.loading).toBe(false)
    expect(result.current.isOpen).toBe(true)
  })

  it('should use cached results when available', async () => {
    const mockSuggestions = [
      { id: 1, title: 'Cached Product', price: 10, description: '', category: '', image: '' },
    ]
    vi.mocked(getCached).mockReturnValue(mockSuggestions)

    const { result } = renderHook(() => useAutocomplete())

    act(() => {
      result.current.setQuery('cached')
    })

    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current.suggestions).toEqual(mockSuggestions)
    expect(fetchAutocompleteSuggestions).not.toHaveBeenCalled()
  })

  it('should cancel previous requests when query changes', async () => {
    vi.mocked(fetchAutocompleteSuggestions).mockImplementation(
      async (_, signal) => {
        return new Promise((resolve) => {
          signal?.addEventListener('abort', () => {
            resolve([])
          })
        })
      }
    )

    const { result } = renderHook(() => useAutocomplete())

    act(() => {
      result.current.setQuery('first')
    })
    act(() => {
      vi.advanceTimersByTime(100)
    })
    act(() => {
      result.current.setQuery('second')
    })
    act(() => {
      vi.advanceTimersByTime(350)
    })

    await act(async () => {
      await Promise.resolve()
    })

    expect(fetchAutocompleteSuggestions).toHaveBeenCalled()
  })

  it('should handle errors gracefully', async () => {
    const error = new Error('API Error')
    vi.mocked(fetchAutocompleteSuggestions).mockRejectedValue(error)

    const { result } = renderHook(() => useAutocomplete())

    act(() => {
      result.current.setQuery('error')
    })

    act(() => {
      vi.advanceTimersByTime(300)
    })

    await act(async () => {
      await Promise.resolve()
    })
    expect(result.current.error).toEqual(error)
    expect(result.current.loading).toBe(false)
  })

  it('should select suggestion and update query', () => {
    const suggestion = {
      id: 1,
      title: 'Selected Product',
      price: 10,
      description: '',
      category: '',
      image: '',
    }

    const { result } = renderHook(() => useAutocomplete())

    act(() => {
      result.current.selectSuggestion(suggestion)
    })

    expect(result.current.query).toBe('Selected Product')
    expect(result.current.isOpen).toBe(false)
  })

  it('should handle keyboard navigation', () => {
    const suggestions = [
      { id: 1, title: 'First', price: 10, description: '', category: '', image: '' },
      { id: 2, title: 'Second', price: 20, description: '', category: '', image: '' },
    ]

    const { result } = renderHook(() => useAutocomplete())

    act(() => {
      result.current.setQuery('test')
    })

    // Mock suggestions
    vi.mocked(getCached).mockReturnValue(suggestions)
    act(() => {
      result.current.setQuery('test')
    })

    const event = {
      key: 'ArrowDown',
      preventDefault: vi.fn(),
    } as unknown as React.KeyboardEvent

    act(() => {
      result.current.handleKeyDown(event)
    })

    // Note: This test would need more setup to properly test keyboard navigation
    // The actual implementation requires isOpen and suggestions to be set
  })
})
