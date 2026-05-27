import "./i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SlidersHorizontal } from "lucide-react";
import { Skeleton } from "@greencart/ui";
import ProductCard from "./ProductCard";
import { FilterDrawer } from "./FilterDrawer";
import { Pagination } from "./components/Pagination";
import { PAGE_SIZE, useProductList } from "./hooks/useProductList";

export default function ProductList() {
  const { t } = useTranslation();
  const [filterOpen, setFilterOpen] = useState(false);
  const {
    products,
    totalPages,
    page,
    setPage,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useProductList();

  if (isError) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-12 text-center">
        <p className="text-sm text-red-600">{t("products.error")}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 text-sm text-brand hover:underline"
        >
          {t("products.retry")}
        </button>
      </section>
    );
  }

  return (
    <>
      <section
        className="mx-auto max-w-7xl px-4 py-8"
        aria-labelledby="all-products-title"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="all-products-title"
            className="text-lg font-bold uppercase tracking-wide"
          >
            {t("products.title")}
          </h2>
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-brand hover:text-brand"
          >
            <SlidersHorizontal size={16} />
            {t("products.filter")}
          </button>
        </div>

        {isFetching && !isLoading && (
          <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-brand" />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-card border border-gray-100 p-4"
              >
                <Skeleton className="aspect-square" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : products.length === 0 ? (
            <p className="col-span-full py-12 text-center text-sm text-ink-muted">
              {t("products.noProducts")}
            </p>
          ) : (
            products.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </section>

      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} />
    </>
  );
}
