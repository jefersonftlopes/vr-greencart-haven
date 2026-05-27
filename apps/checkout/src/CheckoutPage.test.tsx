import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  addToCart,
  createAppStore,
  selectCartCount,
  selectLastOrderId,
  server,
} from "@greencart/store/test";
import { renderWithProviders } from "@greencart/store/test";
import type { Product } from "@greencart/types";
import CheckoutPage from "./CheckoutPage";

const cabbage: Product = {
  id: 1,
  title: "Cabbage",
  description: "",
  category: "vegetables",
  price: 1.5,
  discountPercentage: 0,
  rating: 4,
  stock: 100,
  thumbnail: "img.png",
  images: [],
};

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("CheckoutPage (integração)", () => {
  it("mostra empty state quando carrinho vazio", () => {
    renderWithProviders(<CheckoutPage />);
    expect(screen.getByText(/carrinho está vazio|cart is empty/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /continuar/i })).toBeInTheDocument();
  });

  it("renderiza itens e Order Summary quando há produtos", () => {
    const store = createAppStore();
    store.dispatch(addToCart(cabbage));
    store.dispatch(addToCart(cabbage));
    renderWithProviders(<CheckoutPage />, { store });
    expect(screen.getByText("Cabbage")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /resumo|summary/i }),
    ).toBeInTheDocument();
  });

  it("confirmar pedido faz POST /carts/add e limpa o carrinho", async () => {
    const user = userEvent.setup();
    const store = createAppStore();
    store.dispatch(addToCart(cabbage));
    renderWithProviders(<CheckoutPage />, { store });
    const confirmBtn = await screen.findByRole("button", {
      name: /confirmar pedido|place order/i,
    });
    await user.click(confirmBtn);
    await waitFor(() => {
      expect(selectCartCount(store.getState())).toBe(0);
      expect(selectLastOrderId(store.getState())).toBe(42);
    });
  });
});
