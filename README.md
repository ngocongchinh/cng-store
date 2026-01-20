# CNG-Store - Product Search with Autocomplete

A production-grade product search application featuring an autocomplete search component built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Autocomplete Search**: Real-time product suggestions with debouncing and caching
- **Product List**: Responsive grid layout with client-side filtering
- **Load More**: Client-side pagination for better performance
- **Accessibility**: Full ARIA combobox implementation with keyboard navigation
- **Error Handling**: Graceful error states with retry functionality
- **Performance**: Memoization, request cancellation, and caching optimizations
- **Unit Tests**: Comprehensive test coverage for all components, hooks, and utilities

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Running Tests

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Architecture

### Data Flow

```
User Input → useDebounce → useAutocomplete → API Service → Cache → Suggestions
                ↓
         SearchInput Component
                ↓
         AutocompleteDropdown Component
                ↓
    User Selection → App State → ProductList Filter → usePagination → LoadMoreButton
```

## API Endpoints

- **Products List**: `https://fakestoreapi.com/products`
- **Autocomplete Suggestions**: `https://dummyjson.com/products/search?q=<query>`

## Accessibility Features

### ARIA Implementation

The autocomplete component implements the ARIA combobox pattern with:

- `role="combobox"` on the input container
- `role="listbox"` on the suggestions list
- `role="option"` on each suggestion item
- `aria-expanded` to indicate dropdown state
- `aria-activedescendant` for keyboard navigation
- `aria-selected` on active suggestion
- `aria-controls` to link input and dropdown
- `aria-autocomplete="list"` to indicate autocomplete type

### Keyboard Navigation

- **Arrow Down (↓)**: Navigate to next suggestion
- **Arrow Up (↑)**: Navigate to previous suggestion
- **Enter**: Select active suggestion
- **Escape**: Close dropdown
- **Tab**: Close dropdown and move focus naturally

## Performance Optimizations

1. **Debouncing**: API calls are debounced (300ms) to reduce unnecessary requests
2. **Request Cancellation**: AbortController cancels in-flight requests when query changes
3. **Caching**: In-memory cache stores autocomplete results per query
4. **Memoization**: React.memo, useMemo, and useCallback prevent unnecessary re-renders
5. **Lazy Loading**: Product images use lazy loading
6. **Pagination**: Client-side pagination reduces initial render time

## Testing

### Test Coverage

- **Hooks**: State management, side effects, cleanup
- **Components**: Rendering, user interactions, accessibility
- **Services**: API calls, error handling, caching
- **Utilities**: Edge cases, different input scenarios

### Test Files

All test files are co-located with their source files using the `.spec.ts` or `.spec.tsx` naming convention:

- `src/hooks/useDebounce.spec.ts`
- `src/hooks/useAutocomplete.spec.ts`
- `src/components/AutocompleteDropdown/AutocompleteDropdown.spec.tsx`
- `src/components/ProductList/ProductList.spec.tsx`
- And more...

## Development Guidelines

### Code Style

- TypeScript strict mode enabled
- ESLint for code quality
- Consistent naming conventions
- Component-based architecture
