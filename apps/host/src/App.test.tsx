import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@greencart/store/test";
import { HomePage } from "./pages/HomePage";

describe("HomePage", () => {
  it("renderiza Hero (h1) e ProductList stub", async () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(await screen.findByTestId("stub-product-list")).toBeInTheDocument();
  });

  it("renderiza seção de categorias", () => {
    renderWithProviders(<HomePage />);
    expect(
      screen.getByRole("heading", { name: /categorias|category/i }),
    ).toBeInTheDocument();
  });

  it("renderiza Featured Products", () => {
    renderWithProviders(<HomePage />);
    expect(
      screen.getByRole("heading", { name: /produtos em destaque|featured/i }),
    ).toBeInTheDocument();
  });
});
