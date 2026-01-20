import { useState, useEffect } from 'react'

export type ViewMode = 'grid' | 'list'

const STORAGE_KEY = 'product-view-mode'
const DEFAULT_VIEW_MODE: ViewMode = 'grid'

export function useViewMode() {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    // Load from localStorage on mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as ViewMode | null
      return saved === 'list' || saved === 'grid' ? saved : DEFAULT_VIEW_MODE
    }
    return DEFAULT_VIEW_MODE
  })

  useEffect(() => {
    // Save to localStorage whenever viewMode changes
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, viewMode)
    }
  }, [viewMode])

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'))
  }

  return {
    viewMode,
    setViewMode,
    toggleViewMode,
  }
}
