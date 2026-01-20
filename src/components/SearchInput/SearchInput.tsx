import { useRef, useCallback } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import AutocompleteDropdown from "../AutocompleteDropdown";
import type { Product } from "../../types/product";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  suggestions: Product[];
  loading: boolean;
  error: Error | null;
  activeIndex: number;
  isOpen: boolean;
  onSelectSuggestion: (suggestion: Product) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onCloseDropdown: () => void;
}

export default function SearchInput({
  value,
  onChange,
  onFocus,
  placeholder = "Enter keywords to search for products",
  suggestions,
  loading,
  error,
  activeIndex,
  isOpen,
  onSelectSuggestion,
  onKeyDown,
  onCloseDropdown,
}: SearchInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside(containerRef, onCloseDropdown);

  const inputId = "search-input";
  const listboxId = `${inputId}-listbox`;

  const handleClearSearch = useCallback(() => {
    onChange("");
    inputRef.current?.focus();
  }, [onChange]);

  return (
    <div ref={containerRef} className="relative w-full max-w-[750px] mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="w-full min-h-10 lg:min-h-14 lg:text-xl text-black pr-4 pl-9 lg:pl-12 py-2 border border-gray-300 rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoComplete="off"
          aria-label="Enter keywords to search for products"
          aria-controls={isOpen ? listboxId : undefined}
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 && isOpen
              ? `${inputId}-option-${activeIndex}`
              : undefined
          }
        />
        <span className="w-[20px] lg:w-[30px] top-2.5 lg:top-[18px] left-2 lg:left-3 absolute flex items-center justify-center pointer-events-none">
          <svg
            width="20"
            height="20"
            viewBox="32 20 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M46.921 33.947 51 38m-1.974-9.031c0 3.849-3.14 6.969-7.013 6.969-3.873 0-7.013-3.12-7.013-6.97C35 25.12 38.14 22 42.013 22c3.873 0 7.013 3.12 7.013 6.969z"
              stroke="#222222"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        {value && value.trim().length >= 2 && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#222222"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        )}
      </div>

      <AutocompleteDropdown
        suggestions={suggestions}
        loading={loading}
        error={error}
        activeIndex={activeIndex}
        isOpen={isOpen}
        query={value}
        onSelect={onSelectSuggestion}
        inputId={inputId}
      />
    </div>
  );
}
