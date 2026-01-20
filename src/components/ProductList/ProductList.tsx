import { useState, useEffect, useMemo } from "react";
import { fetchProducts } from "../../services/api";
import { filterProducts } from "../../utils/filterProducts";
import { usePagination } from "../../hooks/usePagination";
import { useViewMode } from "../../hooks/useViewMode";
import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";
import LoadingSpinner from "../LoadingSpinner";
import ErrorMessage from "../ErrorMessage";
import LoadMoreButton from "../LoadMoreButton";
import ViewModeToggle from "./ViewModeToggle";

interface ProductListProps {
  searchQuery: string;
}

export default function ProductList({ searchQuery }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [sortBy, setSortBy] = useState("");
  const { viewMode, toggleViewMode } = useViewMode();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err as Error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(
    () => filterProducts(products, searchQuery),
    [products, searchQuery],
  );

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case "name-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  const { visibleItems, hasMore, loadMore } = usePagination({
    itemsPerPage: 12,
    totalItems: sortedProducts.length,
    resetTrigger: searchQuery,
  });

  const visibleProducts = useMemo(
    () => sortedProducts.slice(0, visibleItems),
    [sortedProducts, visibleItems],
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error.message} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {filteredProducts.length === 0 && searchQuery ? (
        <div className="text-center py-8">
          <img
            src="/images/search-empty.svg"
            alt="Search Empty"
            className="inline-block"
          />

          <p className="text-gray-600 text-lg mt-4">
            No products found matching &quot;{searchQuery}&quot;
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-x-4 mb-6">
            <div>
              <span className="text-gray-700">
                <span className="font-bold">{filteredProducts.length}</span>{" "}
                products
              </span>
            </div>
            <div className="flex gap-x-2.5 justify-between lg:justify-start items-center mt-4 lg:mt-0">
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sort by</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
              <ViewModeToggle viewMode={viewMode} onToggle={toggleViewMode} />
            </div>
          </div>

          <div
            className={
              viewMode === "list"
                ? "flex flex-col gap-6"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            }
          >
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>
          <div className="lg:py-8">
            <LoadMoreButton onClick={loadMore} hasMore={hasMore} />
          </div>
        </>
      )}
    </div>
  );
}
