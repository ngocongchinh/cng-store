import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePagination } from './usePagination'

describe('usePagination', () => {
  it('should initialize with itemsPerPage visible items', () => {
    const { result } = renderHook(() =>
      usePagination({
        itemsPerPage: 12,
        totalItems: 50,
      })
    )

    expect(result.current.visibleItems).toBe(12)
    expect(result.current.hasMore).toBe(true)
  })

  it('should load more items when loadMore is called', () => {
    const { result } = renderHook(() =>
      usePagination({
        itemsPerPage: 12,
        totalItems: 50,
      })
    )

    act(() => {
      result.current.loadMore()
    })

    expect(result.current.visibleItems).toBe(24)
    expect(result.current.hasMore).toBe(true)
  })

  it('should not exceed totalItems', () => {
    const { result } = renderHook(() =>
      usePagination({
        itemsPerPage: 12,
        totalItems: 20,
      })
    )

    act(() => {
      result.current.loadMore()
    })

    expect(result.current.visibleItems).toBe(20)
    expect(result.current.hasMore).toBe(false)
  })

  it('should reset when resetTrigger changes', () => {
    const { result, rerender } = renderHook(
      ({ resetTrigger }) =>
        usePagination({
          itemsPerPage: 12,
          totalItems: 50,
          resetTrigger,
        }),
      { initialProps: { resetTrigger: 'query1' } }
    )

    act(() => {
      result.current.loadMore()
    })

    expect(result.current.visibleItems).toBe(24)

    rerender({ resetTrigger: 'query2' })

    expect(result.current.visibleItems).toBe(12)
  })

  it('should set hasMore to false when all items are visible', () => {
    const { result } = renderHook(() =>
      usePagination({
        itemsPerPage: 10,
        totalItems: 10,
      })
    )

    expect(result.current.hasMore).toBe(false)
  })
})
