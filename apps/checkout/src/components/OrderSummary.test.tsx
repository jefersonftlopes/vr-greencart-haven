import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@greencart/store/test";
import { OrderSummary } from "./OrderSummary";

describe("OrderSummary", () => {
  it("frete é grátis quando subtotal >= 50", () => {
    renderWithProviders(
      <OrderSummary subtotal={75} itemsCount={3} isLoading={false} onConfirm={() => {}} />,
    );
    expect(screen.getByText(/grátis|free/i)).toBeInTheDocument();
    // $75 aparece como subtotal E como total (com frete grátis)
    expect(screen.getAllByText("$75.00")).toHaveLength(2);
  });

  it("frete custa $9.90 quando subtotal < 50", () => {
    renderWithProviders(
      <OrderSummary subtotal={20} itemsCount={1} isLoading={false} onConfirm={() => {}} />,
    );
    expect(screen.getByText("$9.90")).toBeInTheDocument();
    // total = 20 + 9.9 = 29.90
    expect(screen.getByText("$29.90")).toBeInTheDocument();
  });

  it("frete é grátis quando carrinho vazio (subtotal = 0)", () => {
    renderWithProviders(
      <OrderSummary subtotal={0} itemsCount={0} isLoading={false} onConfirm={() => {}} />,
    );
    expect(screen.getByText(/grátis|free/i)).toBeInTheDocument();
  });

  it("botão Confirmar fica desabilitado quando itemsCount=0", () => {
    renderWithProviders(
      <OrderSummary subtotal={0} itemsCount={0} isLoading={false} onConfirm={() => {}} />,
    );
    expect(screen.getByRole("button", { name: /confirmar|place/i })).toBeDisabled();
  });

  it("botão Confirmar fica desabilitado quando isLoading", () => {
    renderWithProviders(
      <OrderSummary subtotal={20} itemsCount={1} isLoading onConfirm={() => {}} />,
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("clicar Confirmar dispara onConfirm", async () => {
    const onConfirm = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <OrderSummary subtotal={20} itemsCount={1} isLoading={false} onConfirm={onConfirm} />,
    );
    await user.click(screen.getByRole("button", { name: /confirmar|place/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
