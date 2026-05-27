import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Category,
  DummyCartResponse,
  Product,
  ProductsResponse,
} from "@greencart/types";

export interface ProductQueryParams {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: string;
}

export interface AddCartPayload {
  userId: number;
  products: Array<{ id: number; quantity: number }>;
}

const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
  "https://dummyjson.com";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductQueryParams | void>({
      query: (args) => {
        const { limit = 24, skip = 0, sortBy, order } = args ?? {};
        const params = new URLSearchParams({
          limit: String(limit),
          skip: String(skip),
        });
        if (sortBy) params.set("sortBy", sortBy);
        if (order) params.set("order", order);
        return `/products?${params}`;
      },
    }),
    getCategories: builder.query<string[], void>({
      query: () => "/products/category-list",
    }),
    getCategoriesFull: builder.query<Category[], void>({
      query: () => "/products/categories",
    }),
    getProductsByCategory: builder.query<
      ProductsResponse,
      { category: string } & ProductQueryParams
    >({
      query: ({ category, limit = 24, skip = 0, sortBy, order }) => {
        const params = new URLSearchParams({
          limit: String(limit),
          skip: String(skip),
        });
        if (sortBy) params.set("sortBy", sortBy);
        if (order) params.set("order", order);
        return `/products/category/${category}?${params}`;
      },
    }),
    searchProducts: builder.query<ProductsResponse, string>({
      query: (q) => `/products/search?q=${encodeURIComponent(q)}`,
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
    addCart: builder.mutation<DummyCartResponse, AddCartPayload>({
      query: (body) => ({
        url: "/carts/add",
        method: "POST",
        body,
      }),
    }),
  }),
});

// Exports explícitos para sobreviver ao shared module wrapper do MF.
export const useGetProductsQuery = productsApi.useGetProductsQuery;
export const useGetCategoriesQuery = productsApi.useGetCategoriesQuery;
export const useGetCategoriesFullQuery = productsApi.useGetCategoriesFullQuery;
export const useGetProductsByCategoryQuery =
  productsApi.useGetProductsByCategoryQuery;
export const useSearchProductsQuery = productsApi.useSearchProductsQuery;
export const useGetProductQuery = productsApi.useGetProductQuery;
export const useAddCartMutation = productsApi.useAddCartMutation;
