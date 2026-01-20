import type { ViewMode } from "../../hooks/useViewMode";

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onToggle: () => void;
}

export default function ViewModeToggle({
  viewMode,
  onToggle,
}: ViewModeToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex border border-gray-300 rounded-md overflow-hidden">
        <button
          onClick={() => {
            if (viewMode !== "grid") {
              onToggle();
            }
          }}
          className={`px-4 py-1.5 flex items-center gap-2 transition-colors ${
            viewMode === "grid"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          aria-label="Grid view"
          aria-pressed={viewMode === "grid"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          <span className="hidden lg:inline-block">Grid</span>
        </button>
        <button
          onClick={() => {
            if (viewMode !== "list") {
              onToggle();
            }
          }}
          className={`px-4 py-1.5 flex items-center gap-2 transition-colors ${
            viewMode === "list"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          aria-label="List view"
          aria-pressed={viewMode === "list"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          <span className="hidden lg:inline-block">List</span>
        </button>
      </div>
    </div>
  );
}
