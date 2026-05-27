import { useEffect, useState } from "react";
import {
  selectFilters,
  useAppSelector,
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from "@greencart/store";

export const PAGE_SIZE = 12;

export function useProductList() {
  const { category, sortBy, order } = useAppSelector(selectFilters);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [category, sortBy, order]);

  const skip = page * PAGE_SIZE;

  const allQuery = useGetProductsQuery(
    { limit: PAGE_SIZE, skip, sortBy, order },
    { skip: category !== null },
  );
  const catQuery = useGetProductsByCategoryQuery(
    { category: category ?? "", limit: PAGE_SIZE, skip, sortBy, order },
    { skip: category === null },
  );

  const { data, isLoading, isFetching, isError, refetch } = category
    ? catQuery
    : allQuery;

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return {
    products,
    totalPages,
    page,
    setPage,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
}
