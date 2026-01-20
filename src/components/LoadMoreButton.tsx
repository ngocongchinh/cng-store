interface LoadMoreButtonProps {
  onClick: () => void;
  hasMore: boolean;
  loading?: boolean;
}

export default function LoadMoreButton({
  onClick,
  hasMore,
  loading = false,
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return null;
  }

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onClick}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Load more products"
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}
