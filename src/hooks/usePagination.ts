import { useState, useEffect, useCallback } from 'react'

interface UsePaginationOptions {
  itemsPerPage?: number
  totalItems: number
  resetTrigger?: unknown
}

export function usePagination({
  itemsPerPage = 12,
  totalItems,
  resetTrigger,
}: UsePaginationOptions) {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage)

  useEffect(() => {
    setVisibleCount(itemsPerPage)
  }, [itemsPerPage, resetTrigger])

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + itemsPerPage, totalItems))
  }, [itemsPerPage, totalItems])

  const reset = useCallback(() => {
    setVisibleCount(itemsPerPage)
  }, [itemsPerPage])

  const visibleItems = Math.min(visibleCount, totalItems)
  const hasMore = visibleCount < totalItems

  return {
    visibleItems,
    hasMore,
    loadMore,
    reset,
  }
}
