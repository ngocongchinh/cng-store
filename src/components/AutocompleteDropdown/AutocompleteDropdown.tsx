import { useEffect, useRef } from "react";
import type { Product } from "../../types/product";
import LoadingSpinner from "../LoadingSpinner";
import ErrorMessage from "../ErrorMessage";
import SuggestionItem from "./SuggestionItem";

interface AutocompleteDropdownProps {
  suggestions: Product[];
  loading: boolean;
  error: Error | null;
  activeIndex: number;
  isOpen: boolean;
  query: string;
  onSelect: (suggestion: Product) => void;
  inputId: string;
}

export default function AutocompleteDropdown({
  suggestions,
  loading,
  error,
  activeIndex,
  isOpen,
  query,
  onSelect,
  inputId,
}: AutocompleteDropdownProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const activeElement = listRef.current.children[
        activeIndex
      ] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  if (!isOpen) {
    return null;
  }

  const dropdownId = `${inputId}-dropdown`;
  const listboxId = `${inputId}-listbox`;

  return (
    <div
      id={dropdownId}
      className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
      role="combobox"
      aria-expanded={isOpen}
      aria-controls={listboxId}
      aria-autocomplete="list"
      aria-activedescendant={
        activeIndex >= 0 ? `${inputId}-option-${activeIndex}` : undefined
      }
    >
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error.message} />}
      {!loading && !error && suggestions.length > 0 && (
        <ul ref={listRef} id={listboxId} role="listbox" className="py-1">
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={suggestion.id}
              suggestion={suggestion}
              query={query}
              isActive={index === activeIndex}
              onSelect={onSelect}
              id={`${inputId}-option-${index}`}
            />
          ))}
        </ul>
      )}
      {!loading && !error && suggestions.length === 0 && query.length >= 2 && (
        <div className="px-4 py-4 text-gray-500 text-center">
          No suggestions found
        </div>
      )}
    </div>
  );
}
