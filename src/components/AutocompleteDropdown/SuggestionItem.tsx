import { memo } from 'react'
import type { Product } from '../../types/product'

interface SuggestionItemProps {
  suggestion: Product
  query: string
  isActive: boolean
  onSelect: (suggestion: Product) => void
  id: string
}

function SuggestionItem({ suggestion, query, isActive, onSelect, id }: SuggestionItemProps) {
  const highlightText = (text: string, query: string) => {
    if (!query) return text
    
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)
    
    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark key={index} className="bg-yellow-200 font-semibold">
              {part}
            </mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    )
  }

  return (
    <li
      id={id}
      role="option"
      aria-selected={isActive}
      className={`px-4 py-2 cursor-pointer ${
        isActive
          ? 'bg-blue-100 text-blue-900'
          : 'hover:bg-gray-100 text-gray-900'
      }`}
      onClick={() => onSelect(suggestion)}
    >
      {highlightText(suggestion.title, query)}
    </li>
  )
}

export default memo(SuggestionItem)
