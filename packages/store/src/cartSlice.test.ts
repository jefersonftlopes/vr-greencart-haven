import { describe, expect, it } from "vitest";
import type { Product } from "@greencart/types";
import {
  addToCart,
  cartReducer,
  clearCart,
  closeCart,
  openCart,
  removeFromCart,
  selectCartCount,
  selectCartTotal,
  selectLastOrderId,
  setLastOrderId,
  toggleCart,
  updateQuantity,
  type CartState,
} from "./cartSlice";

const product = (id: number, price = 10): Product => ({
  id,
  title: `Produto ${id}`,
  description: "",
  category: "fruits",
  price,
  discountPercentage: 0,
  rating: 5,
  stock: 100,
  thumbnail: "https://example.com/img.png",
  images: [],
});

const initial: CartState = { items: [], isOpen: false, lastOrderId: null };

describe("cartSlice", () => {
  it("adiciona um produto novo com quantidade 1", () => {
    const state = cartReducer(initial, addToCart(product(1)));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({ id: 1, quantity: 1 });
  });

  it("incrementa quantidade quando produto já existe", () => {
    let state = cartReducer(initial, addToCart(product(1)));
    state = cartReducer(state, addToCart(product(1)));
    expect(state.items[0]?.quantity).toBe(2);
  });

  it("remove um produto do carrinho", () => {
    const seeded = cartReducer(initial, addToCart(product(1)));
    const state = cartReducer(seeded, removeFromCart(1));
    expect(state.items).toHaveLength(0);
  });

  it("atualiza quantidade e remove ao chegar em 0", () => {
    const seeded = cartReducer(initial, addToCart(product(1)));
    const withTwo = cartReducer(seeded, updateQuantity({ id: 1, quantity: 5 }));
    expect(withTwo.items[0]?.quantity).toBe(5);
    const removed = cartReducer(withTwo, updateQuantity({ id: 1, quantity: 0 }));
    expect(removed.items).toHaveLength(0);
  });

  it("updateQuantity em id inexistente é no-op", () => {
    const state = cartReducer(initial, updateQuantity({ id: 999, quantity: 5 }));
    expect(state.items).toHaveLength(0);
  });

  it("limpa o carrinho", () => {
    const seeded = cartReducer(initial, addToCart(product(1)));
    const state = cartReducer(seeded, clearCart());
    expect(state.items).toHaveLength(0);
  });

  it("open/close/toggle do modal", () => {
    expect(cartReducer(initial, openCart()).isOpen).toBe(true);
    expect(cartReducer({ ...initial, isOpen: true }, closeCart()).isOpen).toBe(false);
    expect(cartReducer(initial, toggleCart()).isOpen).toBe(true);
  });

  it("selectors: count e total", () => {
    let state = cartReducer(initial, addToCart(product(1, 10)));
    state = cartReducer(state, addToCart(product(1, 10)));
    state = cartReducer(state, addToCart(product(2, 25)));
    const root = { cart: state };
    expect(selectCartCount(root)).toBe(3);
    expect(selectCartTotal(root)).toBe(45);
  });

  it("setLastOrderId guarda o id do pedido", () => {
    const state = cartReducer(initial, setLastOrderId(42));
    expect(state.lastOrderId).toBe(42);
    expect(selectLastOrderId({ cart: state })).toBe(42);
  });
});
