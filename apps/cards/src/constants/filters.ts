import type { SortByField, SortOrder } from "@greencart/store";

export const PAGE_SIZE = 12;

export const SORT_OPTIONS: Array<{ value: SortByField; key: string }> = [
  { value: "title", key: "title" },
  { value: "price", key: "price" },
  { value: "rating", key: "rating" },
  { value: "stock", key: "stock" },
  { value: "discountPercentage", key: "discountPercentage" },
];

export const ORDER_OPTIONS: Array<{ value: SortOrder; key: string }> = [
  { value: "asc", key: "asc" },
  { value: "desc", key: "desc" },
];
