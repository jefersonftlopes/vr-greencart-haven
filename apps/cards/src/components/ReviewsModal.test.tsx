import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@greencart/store/test";
import type { Product } from "@greencart/types";
import { ReviewsModal } from "./ReviewsModal";

const productWith = (reviews: Product["reviews"]): Product => ({
  id: 1,
  title: "Cabbage",
  description: "",
  category: "vegetables",
  price: 1.5,
  discountPercentage: 0,
  rating: 4.3,
  stock: 10,
  thumbnail: "img.png",
  images: [],
  reviews,
});

describe("ReviewsModal", () => {
  it("não renderiza nada quando open=false", () => {
    renderWithProviders(
      <ReviewsModal open={false} onOpenChange={() => {}} product={productWith([])} />,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("exibe título, nome do produto e resumo da nota", () => {
    renderWithProviders(
      <ReviewsModal open onOpenChange={() => {}} product={productWith([])} />,
    );
    expect(
      screen.getByRole("heading", { name: /avaliações|reviews/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Cabbage")).toBeInTheDocument();
    expect(screen.getByText("4.3")).toBeInTheDocument();
  });

  it("mostra empty state quando não há reviews", () => {
    renderWithProviders(
      <ReviewsModal open onOpenChange={() => {}} product={productWith([])} />,
    );
    expect(
      screen.getByText(/nenhuma avaliação|no reviews/i),
    ).toBeInTheDocument();
  });

  it("lista reviews com nome, comentário e nota", () => {
    const product = productWith([
      {
        rating: 5,
        comment: "Muito bom!",
        date: "2025-04-30T09:41:02.054Z",
        reviewerName: "Luna Russell",
        reviewerEmail: "luna@x.com",
      },
      {
        rating: 2,
        comment: "Não recomendo",
        date: "2025-04-30T09:41:02.054Z",
        reviewerName: "Mason Wright",
        reviewerEmail: "mason@x.com",
      },
    ]);
    renderWithProviders(
      <ReviewsModal open onOpenChange={() => {}} product={product} />,
    );
    expect(screen.getByText("Luna Russell")).toBeInTheDocument();
    expect(screen.getByText("Muito bom!")).toBeInTheDocument();
    expect(screen.getByText("Mason Wright")).toBeInTheDocument();
    expect(screen.getByText("Não recomendo")).toBeInTheDocument();
  });

  it("clicar no botão Fechar dispara onOpenChange(false)", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <ReviewsModal open onOpenChange={onOpenChange} product={productWith([])} />,
    );
    await user.click(screen.getByRole("button", { name: /fechar|close/i }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
