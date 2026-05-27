import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  const pages: Array<number | "..."> = [];
  if (totalPages <= 7) {
    for (let i = 0; i < totalPages; i++) pages.push(i);
  } else {
    pages.push(0);
    if (page > 2) pages.push("...");
    for (
      let i = Math.max(1, page - 1);
      i <= Math.min(totalPages - 2, page + 1);
      i++
    ) {
      pages.push(i);
    }
    if (page < totalPages - 3) pages.push("...");
    pages.push(totalPages - 1);
  }

  return (
    <nav
      aria-label={t("products.page")}
      className="mt-8 flex items-center justify-center gap-1"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        aria-label={t("products.prev")}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-ink-muted transition-colors hover:border-brand hover:text-brand disabled:opacity-40"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={`ellipsis-${idx === 1 ? "L" : "R"}`} className="px-1 text-sm text-ink-muted">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors ${
              p === page
                ? "bg-brand text-white"
                : "border border-gray-200 text-ink-muted hover:border-brand hover:text-brand"
            }`}
          >
            {p + 1}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages - 1}
        aria-label={t("products.next")}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-ink-muted transition-colors hover:border-brand hover:text-brand disabled:opacity-40"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
