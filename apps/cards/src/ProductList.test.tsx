import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { server } from "@greencart/store/test";
import { renderWithProviders } from "@greencart/store/test";
import ProductList from "./ProductList";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("ProductList (integração com MSW)", () => {
  it("renderiza produtos vindos da API", async () => {
    renderWithProviders(<ProductList />);
    await waitFor(() => {
      expect(screen.getByText("Cabbage")).toBeInTheDocument();
    });
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Orange Juice")).toBeInTheDocument();
  });

  it("título 'Todos os Produtos' está presente", async () => {
    renderWithProviders(<ProductList />);
    expect(
      await screen.findByRole("heading", { name: /todos os produtos|all products/i }),
    ).toBeInTheDocument();
  });
});
