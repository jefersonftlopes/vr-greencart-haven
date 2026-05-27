import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { selectCartCount } from "@greencart/store";
import { renderWithProviders } from "@greencart/store/test";
import type { Product } from "@greencart/types";
import ProductCard from "./ProductCard";

const product: Product = {
  id: 42,
  title: "Tomate Cereja",
  description: "Fresco e suculento",
  category: "fruits",
  price: 9.99,
  discountPercentage: 15,
  rating: 4.5,
  stock: 50,
  thumbnail: "https://example.com/tomato.png",
  images: [],
};

describe("ProductCard", () => {
  it("renderiza nome, peso e preço", () => {
    renderWithProviders(<ProductCard product={product} />);
    expect(screen.getByText("Tomate Cereja")).toBeInTheDocument();
    expect(screen.getByText("$9.99")).toBeInTheDocument();
    expect(screen.getByText("1kg")).toBeInTheDocument();
  });

  it("clicar Adicionar dispara addToCart e abre carrinho", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<ProductCard product={product} />);
    await user.click(
      screen.getByRole("button", { name: /adicionar tomate cereja/i }),
    );
    expect(selectCartCount(store.getState())).toBe(1);
    expect(store.getState().cart.isOpen).toBe(true);
  });

  it("imagem tem alt acessível com o título", () => {
    renderWithProviders(<ProductCard product={product} />);
    expect(screen.getByAltText("Tomate Cereja")).toBeInTheDocument();
  });
});
