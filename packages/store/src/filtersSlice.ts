import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SortByField =
  | "title"
  | "price"
  | "rating"
  | "stock"
  | "discountPercentage";
export type SortOrder = "asc" | "desc";

export interface FiltersState {
  category: string | null;
  sortBy: SortByField;
  order: SortOrder;
}

const initialState: FiltersState = {
  category: null,
  sortBy: "title",
  order: "asc",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string | null>) {
      state.category = action.payload;
    },
    setSortBy(state, action: PayloadAction<SortByField>) {
      state.sortBy = action.payload;
    },
    setOrder(state, action: PayloadAction<SortOrder>) {
      state.order = action.payload;
    },
    resetFilters(state) {
      state.sortBy = initialState.sortBy;
      state.order = initialState.order;
    },
  },
});

export const setCategory = filtersSlice.actions.setCategory;
export const setSortBy = filtersSlice.actions.setSortBy;
export const setOrder = filtersSlice.actions.setOrder;
export const resetFilters = filtersSlice.actions.resetFilters;

export const selectFilters = (state: { filters: FiltersState }) =>
  state.filters;
export const selectCategory = (state: { filters: FiltersState }) =>
  state.filters.category;

export const filtersReducer = filtersSlice.reducer;
