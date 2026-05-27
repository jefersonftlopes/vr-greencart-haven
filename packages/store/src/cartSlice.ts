import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "@greencart/types";

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  lastOrderId: number | null;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  lastOrderId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item) return;
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.id !== id);
      } else {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    setLastOrderId(state, action: PayloadAction<number | null>) {
      state.lastOrderId = action.payload;
    },
  },
});

// Exports explícitos (não destructuring) — necessário para o wrapper
// shared do Module Federation preservar todas as bindings.
export const addToCart = cartSlice.actions.addToCart;
export const removeFromCart = cartSlice.actions.removeFromCart;
export const updateQuantity = cartSlice.actions.updateQuantity;
export const clearCart = cartSlice.actions.clearCart;
export const openCart = cartSlice.actions.openCart;
export const closeCart = cartSlice.actions.closeCart;
export const toggleCart = cartSlice.actions.toggleCart;
export const setLastOrderId = cartSlice.actions.setLastOrderId;

export const cartReducer = cartSlice.reducer;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
export const selectCartIsOpen = (state: { cart: CartState }) =>
  state.cart.isOpen;
export const selectLastOrderId = (state: { cart: CartState }) =>
  state.cart.lastOrderId;
