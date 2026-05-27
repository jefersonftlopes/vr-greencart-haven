import { describe, expect, it } from "vitest";
import {
  filtersReducer,
  resetFilters,
  selectCategory,
  selectFilters,
  setCategory,
  setOrder,
  setSortBy,
  type FiltersState,
} from "./filtersSlice";

const initial: FiltersState = { category: null, sortBy: "title", order: "asc" };

describe("filtersSlice", () => {
  it("define categoria", () => {
    const state = filtersReducer(initial, setCategory("fruits"));
    expect(state.category).toBe("fruits");
    expect(selectCategory({ filters: state })).toBe("fruits");
  });

  it("limpa categoria com null", () => {
    const seeded: FiltersState = { ...initial, category: "fruits" };
    const state = filtersReducer(seeded, setCategory(null));
    expect(state.category).toBeNull();
  });

  it("define sortBy", () => {
    const state = filtersReducer(initial, setSortBy("price"));
    expect(state.sortBy).toBe("price");
  });

  it("define order", () => {
    const state = filtersReducer(initial, setOrder("desc"));
    expect(state.order).toBe("desc");
  });

  it("reset preserva categoria mas reseta sort/order", () => {
    const seeded: FiltersState = { category: "fruits", sortBy: "price", order: "desc" };
    const state = filtersReducer(seeded, resetFilters());
    expect(state.sortBy).toBe("title");
    expect(state.order).toBe("asc");
    expect(state.category).toBe("fruits");
  });

  it("selectFilters retorna estado completo", () => {
    const state: FiltersState = { category: "fruits", sortBy: "rating", order: "desc" };
    expect(selectFilters({ filters: state })).toEqual(state);
  });
});
