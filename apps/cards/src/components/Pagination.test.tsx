import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@greencart/store/test";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("não renderiza nada quando há apenas 1 página", () => {
    const { container } = renderWithProviders(
      <Pagination page={0} totalPages={1} onPageChange={() => {}} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renderiza todas as páginas quando totalPages <= 7", () => {
    renderWithProviders(
      <Pagination page={0} totalPages={5} onPageChange={() => {}} />,
    );
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByRole("button", { name: String(i) })).toBeInTheDocument();
    }
  });

  it("renderiza ellipsis quando totalPages > 7", () => {
    renderWithProviders(
      <Pagination page={5} totalPages={20} onPageChange={() => {}} />,
    );
    expect(screen.getAllByText("…")).toHaveLength(2);
  });

  it("desabilita botão anterior na primeira página", () => {
    renderWithProviders(
      <Pagination page={0} totalPages={5} onPageChange={() => {}} />,
    );
    expect(screen.getByRole("button", { name: /anterior|prev/i })).toBeDisabled();
  });

  it("desabilita botão próximo na última página", () => {
    renderWithProviders(
      <Pagination page={4} totalPages={5} onPageChange={() => {}} />,
    );
    expect(screen.getByRole("button", { name: /próxima|next/i })).toBeDisabled();
  });

  it("chama onPageChange ao clicar em uma página", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <Pagination page={0} totalPages={5} onPageChange={onPageChange} />,
    );
    await user.click(screen.getByRole("button", { name: "3" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("marca página ativa com aria-current=page", () => {
    renderWithProviders(
      <Pagination page={2} totalPages={5} onPageChange={() => {}} />,
    );
    expect(screen.getByRole("button", { name: "3" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
