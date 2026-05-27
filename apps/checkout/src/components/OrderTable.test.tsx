import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { addToCart, removeFromCart, selectCartItems } from "@greencart/store";
import { renderWithProviders } from "@greencart/store/test";
import type { Product } from "@greencart/types";
import { OrderTable } from "./OrderTable";

const product: Product = {
  id: 1,
  title: "Cabbage",
  description: "",
  category: "vegetables",
  price: 1.5,
  discountPercentage: 0,
  rating: 4,
  stock: 100,
  thumbnail: "https://example.com/cabbage.png",
  images: [],
};

const cartItem = { id: 1, title: "Cabbage", price: 1.5, quantity: 2, thumbnail: "img.png" };

describe("OrderTable", () => {
  it("renderiza imagem, título e preço unitário", () => {
    renderWithProviders(<OrderTable items={[cartItem]} />);
    expect(screen.getByText("Cabbage")).toBeInTheDocument();
    expect(screen.getByText(/\$1\.50/)).toBeInTheDocument();
    // subtotal = 1.5 * 2 = 3
    expect(screen.getByText("$3.00")).toBeInTheDocument();
  });

  it("clicar + incrementa a quantidade no Redux", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<OrderTable items={[cartItem]} />);
    store.dispatch(addToCart(product));
    store.dispatch(addToCart(product));
    await user.click(screen.getByRole("button", { name: /aumentar|increase/i }));
    expect(store.getState().cart.items[0]?.quantity).toBe(3);
  });

  it("clicar lixeira remove o item", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<OrderTable items={[cartItem]} />);
    store.dispatch(addToCart(product));
    await user.click(screen.getByRole("button", { name: /remover|remove/i }));
    expect(selectCartItems(store.getState())).toHaveLength(0);
  });

  it("decrementar até 0 remove o item", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(
      <OrderTable items={[{ ...cartItem, quantity: 1 }]} />,
    );
    store.dispatch(addToCart(product));
    expect(selectCartItems(store.getState())).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: /diminuir|decrease/i }));
    expect(selectCartItems(store.getState())).toHaveLength(0);
    store.dispatch(removeFromCart(1)); // no-op cleanup
  });
});
