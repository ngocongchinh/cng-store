import { memo } from "react";
import type { Product } from "../../types/product";
import type { ViewMode } from "../../hooks/useViewMode";

interface ProductCardProps {
  product: Product;
  viewMode?: ViewMode;
}

function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col sm:flex-row">
        <div className="w-full sm:w-52 lg:p-8 flex-shrink-0 ">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 sm:h-full object-contain p-4"
            loading="lazy"
          />
        </div>
        <div className="p-4 lg:p-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {product.title}
            </h3>
            {product.description && (
              <p className="text-gray-600 text-sm line-clamp-3 mb-2">
                {product.description}
              </p>
            )}
          </div>
          <div className="mt-2">
            <p className="text-xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div className="mt-2">
            {product.rating && (
              <div className="text-sm text-gray-600">
                <span>⭐ {product.rating.rate}</span>
                <span className="ml-2">({product.rating.count} reviews)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden ">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain p-4"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3
          className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-14"
          title={product.title}
        >
          {product.title}
        </h3>
        <p className="text-xl font-bold text-blue-600">
          ${product.price.toFixed(2)}
        </p>
        {product.rating && (
          <div className="mt-2 text-sm text-gray-600">
            <span>⭐ {product.rating.rate}</span>
            <span className="ml-2">({product.rating.count} reviews)</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ProductCard);
