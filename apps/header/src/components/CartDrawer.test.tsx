import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@greencart/store/test";
import type { CartItem } from "@greencart/types";
import { CartDrawer } from "./CartDrawer";

const item: CartItem = {
  id: 1,
  title: "Cabbage",
  price: 1.5,
  quantity: 2,
  thumbnail: "https://example.com/cabbage.png",
};

describe("CartDrawer", () => {
  it("mostra mensagem de vazio quando count === 0", () => {
    renderWithProviders(
      <CartDrawer
        isOpen
        items={[]}
        count={0}
        total={0}
        onOpenChange={() => {}}
        onUpdateQuantity={() => {}}
        onRemove={() => {}}
        onCheckout={() => {}}
      />,
    );
    expect(screen.getByText(/carrinho está vazio|cart is empty/i)).toBeInTheDocument();
  });

  it("renderiza itens com título e preço total", () => {
    renderWithProviders(
      <CartDrawer
        isOpen
        items={[item]}
        count={2}
        total={3}
        onOpenChange={() => {}}
        onUpdateQuantity={() => {}}
        onRemove={() => {}}
        onCheckout={() => {}}
      />,
    );
    expect(screen.getByText("Cabbage")).toBeInTheDocument();
    expect(screen.getByText(/\$3\.00/)).toBeInTheDocument();
  });

  it("clicar em Finalizar pedido dispara onCheckout", async () => {
    const onCheckout = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <CartDrawer
        isOpen
        items={[item]}
        count={2}
        total={3}
        onOpenChange={() => {}}
        onUpdateQuantity={() => {}}
        onRemove={() => {}}
        onCheckout={onCheckout}
      />,
    );
    await user.click(screen.getByRole("button", { name: /finalizar|checkout/i }));
    expect(onCheckout).toHaveBeenCalledTimes(1);
  });
});
