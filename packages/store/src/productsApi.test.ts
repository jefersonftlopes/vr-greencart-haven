import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { server } from "./test/server";
import { createAppStore } from "./store";
import { productsApi } from "./productsApi";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("productsApi (RTK Query + MSW)", () => {
  it("getProducts retorna produtos paginados", async () => {
    const store = createAppStore();
    const result = await store.dispatch(
      productsApi.endpoints.getProducts.initiate({ limit: 10, skip: 0 }),
    );
    expect(result.data?.products).toHaveLength(3);
    expect(result.data?.total).toBe(3);
  });

  it("getCategoriesFull retorna categorias", async () => {
    const store = createAppStore();
    const result = await store.dispatch(
      productsApi.endpoints.getCategoriesFull.initiate(),
    );
    expect(result.data).toHaveLength(2);
    expect(result.data?.[0]?.slug).toBe("vegetables");
  });

  it("getProductsByCategory filtra por slug", async () => {
    const store = createAppStore();
    const result = await store.dispatch(
      productsApi.endpoints.getProductsByCategory.initiate({ category: "fruits" }),
    );
    expect(result.data?.products).toHaveLength(1);
    expect(result.data?.products[0]?.title).toBe("Apple");
  });

  it("addCart faz POST e retorna pedido", async () => {
    const store = createAppStore();
    const result = await store.dispatch(
      productsApi.endpoints.addCart.initiate({
        userId: 1,
        products: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: 1 },
        ],
      }),
    );
    expect(result.data?.id).toBe(42);
    expect(result.data?.totalQuantities).toBe(3);
    expect(result.data?.products).toHaveLength(2);
  });
});
