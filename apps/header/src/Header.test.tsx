import { describe, expect, it } from "vitest";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { addToCart, createAppStore } from "@greencart/store";
import { renderWithProviders } from "@greencart/store/test";
import type { Product } from "@greencart/types";
import Header from "./Header";

const fakeProduct: Product = {
  id: 1,
  title: "Test",
  description: "",
  category: "fruits",
  price: 10,
  discountPercentage: 0,
  rating: 5,
  stock: 10,
  thumbnail: "img.png",
  images: [],
};

describe("Header", () => {
  it("renderiza nav e links principais", () => {
    renderWithProviders(<Header />);
    expect(
      screen.getByRole("navigation", { name: /main navigation|navegação/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /início|home/i }).length).toBeGreaterThan(0);
  });

  it("badge do carrinho aparece quando há itens", () => {
    const store = createAppStore();
    act(() => {
      store.dispatch(addToCart(fakeProduct));
      store.dispatch(addToCart(fakeProduct));
    });
    const { container } = renderWithProviders(<Header />, { store });
    // badge é um span circular dentro do botão de carrinho
    const badge = container.querySelector("button .rounded-full.bg-brand");
    expect(badge?.textContent).toBe("2");
  });

  it("abre drawer ao clicar no botão de carrinho", async () => {
    const user = userEvent.setup();
    const store = createAppStore();
    act(() => {
      store.dispatch(addToCart(fakeProduct));
    });
    renderWithProviders(<Header />, { store });
    const cartButton = screen
      .getAllByRole("button")
      .find((b) => /carrinho|cart/i.test(b.getAttribute("aria-label") ?? ""));
    expect(cartButton).toBeTruthy();
    await user.click(cartButton!);
    expect(store.getState().cart.isOpen).toBe(true);
  });
});
