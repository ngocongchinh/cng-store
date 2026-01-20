import { useState, useCallback } from "react";
import { useAutocomplete } from "./hooks/useAutocomplete";
import SearchInput from "./components/SearchInput";
import ProductList from "./components/ProductList";
import { Product } from "./types/product";
import AnimationRolling from "./components/AnimationRolling";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

function App() {
  const {
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
  } = useAutocomplete();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSuggestionSelect = useCallback(
    (suggestion: { title: string }) => {
      selectSuggestion(suggestion as Product);
      setSearchQuery(suggestion.title);
    },
    [selectSuggestion],
  );

  const handleInputChange = useCallback(
    (value: string) => {
      setQuery(value);
      setSearchQuery(value);
    },
    [setQuery],
  );

  const handleKeyDownWithFilter = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      // If Enter is pressed and there's an active suggestion, select it and filter
      if (
        event.key === "Enter" &&
        isOpen &&
        activeIndex >= 0 &&
        activeIndex < suggestions.length
      ) {
        event.preventDefault();
        const selectedSuggestion = suggestions[activeIndex];
        handleSuggestionSelect(selectedSuggestion);
        return;
      }
      // Otherwise, use the default handleKeyDown
      handleKeyDown(event);
    },
    [isOpen, activeIndex, suggestions, handleSuggestionSelect, handleKeyDown],
  );

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="relative w-full min-h-[250px] lg:min-h-[450px] bg-black">
        <div
          style={{
            backgroundImage: `url(/images/shopping-online.webp)`,
          }}
          className="absolute top-0 pointer-events-none left-0 w-full h-full bg-no-repeat bg-center bg-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 pointer-events-none" />
        <div className="z-10 relative text-white">
          <header className="">
            <div className="container mx-auto px-4 py-6">
              <a href="/">
                <h1 className="text-2xl text-center lg:text-left">
                  <b>CNG</b> Store
                </h1>
              </a>
            </div>
          </header>
          <h3 className="text-xl lg:text-4xl pt-2.5 lg:pt-20 text-center mb-4 lg:mb-12">
            <span className="font-bold lg:font-extrabold">
              Are you looking for
              <AnimationRolling />
              products?
            </span>
          </h3>
          <div className="flex justify-center px-4">
            <SearchInput
              value={query}
              onChange={handleInputChange}
              onFocus={handleFocus}
              suggestions={suggestions}
              loading={loading}
              error={error}
              activeIndex={activeIndex}
              isOpen={isOpen}
              onSelectSuggestion={handleSuggestionSelect}
              onKeyDown={handleKeyDownWithFilter}
              onCloseDropdown={closeDropdown}
            />
          </div>
        </div>
      </div>
      <main>
        <ProductList searchQuery={searchQuery} />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
