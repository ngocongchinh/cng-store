import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchAutocompleteSuggestions } from '../services/api'
import { getCached, setCached } from '../services/cache'
import { useDebounce } from './useDebounce'
import type { Product } from '../types/product'

interface UseAutocompleteOptions {
  minQueryLength?: number
  debounceDelay?: number
}

export function useAutocomplete({
  minQueryLength = 2,
  debounceDelay = 300,
}: UseAutocompleteOptions = {}) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)

  const debouncedQuery = useDebounce(query, debounceDelay)
  const abortControllerRef = useRef<AbortController | null>(null)
  const justSelectedRef = useRef(false)

  useEffect(() => {
    // Skip auto-open if we just selected a suggestion
    if (justSelectedRef.current) {
      justSelectedRef.current = false
      return
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    if (debouncedQuery.length < minQueryLength) {
      setSuggestions([])
      setLoading(false)
      setIsOpen(false)
      return
    }

    // Check cache first
    const cached = getCached(debouncedQuery)
    if (cached) {
      setSuggestions(cached)
      setLoading(false)
      setError(null)
      setIsOpen(true)
      return
    }

    // Fetch from API
    setLoading(true)
    setError(null)
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    fetchAutocompleteSuggestions(debouncedQuery, abortController.signal)
      .then((results) => {
        if (!abortController.signal.aborted) {
          setCached(debouncedQuery, results)
          setSuggestions(results)
          setLoading(false)
          setError(null)
          setIsOpen(true)
          setActiveIndex(-1)
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return // Ignore abort errors
        }
        if (!abortController.signal.aborted) {
          setError(err as Error)
          setLoading(false)
          setSuggestions([])
        }
      })

    return () => {
      abortController.abort()
    }
  }, [debouncedQuery, minQueryLength])

  const selectSuggestion = useCallback((suggestion: Product) => {
    justSelectedRef.current = true // Set flag to prevent auto-open
    setQuery(suggestion.title)
    setSuggestions([])
    setIsOpen(false)
    setActiveIndex(-1)
    // Flag will be reset in useEffect when debouncedQuery updates
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      // Handle Tab key to close dropdown
      if (event.key === 'Tab') {
        setIsOpen(false)
        setActiveIndex(-1)
        return
      }

      if (!isOpen || suggestions.length === 0) {
        if (event.key === 'ArrowDown' && query.length >= minQueryLength) {
          event.preventDefault()
          setIsOpen(true)
          // Set activeIndex to 0 (first item) when opening dropdown with ArrowDown
          setActiveIndex(0)
        }
        return
      }

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setActiveIndex((prev) => {
            if (prev === -1) {
              return 0 // Start from first item
            }
            return prev < suggestions.length - 1 ? prev + 1 : prev
          })
          break
        case 'ArrowUp':
          event.preventDefault()
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1))
          break
        case 'Enter':
          event.preventDefault()
          if (activeIndex >= 0 && activeIndex < suggestions.length) {
            selectSuggestion(suggestions[activeIndex])
          }
          break
        case 'Escape':
          event.preventDefault()
          setIsOpen(false)
          setActiveIndex(-1)
          break
      }
    },
    [isOpen, suggestions, activeIndex, selectSuggestion, query.length, minQueryLength]
  )

  const handleFocus = useCallback(() => {
    // When user focuses on input, if query.length > 2, trigger search and open dropdown
    if (query.length >= minQueryLength) {
      const cached = getCached(query)
      if (cached) {
        setSuggestions(cached)
        setLoading(false)
        setError(null)
        setIsOpen(true)
      } else if (!loading) {
        // Trigger search if not already loading
        const abortController = new AbortController()
        abortControllerRef.current = abortController

        setLoading(true)
        setError(null)
        fetchAutocompleteSuggestions(query, abortController.signal)
          .then((results) => {
            if (!abortController.signal.aborted) {
              setCached(query, results)
              setSuggestions(results)
              setLoading(false)
              setError(null)
              setIsOpen(true)
              setActiveIndex(-1)
            }
          })
          .catch((err) => {
            if (err.name === 'AbortError') {
              return
            }
            if (!abortController.signal.aborted) {
              setError(err as Error)
              setLoading(false)
              setSuggestions([])
            }
          })
      }
    }
  }, [query, minQueryLength, loading])

  const closeDropdown = useCallback(() => {
    setIsOpen(false)
    setActiveIndex(-1)
  }, [])


  return {
    query,
    setQuery,
    suggestions,
    loading,
    error,
    activeIndex,
    isOpen,
    selectSuggestion,
    handleKeyDown,
    handleFocus,
    closeDropdown,
  }
}
