import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Rating } from "@greencart/ui";

/**
 * Testes do componente Rating (vive em @greencart/ui mas é testado aqui,
 * já que o pacote UI não tem runner de testes próprio).
 */
describe("Rating", () => {
  it("exibe valor formatado com 1 casa decimal", () => {
    render(<Rating value={4.567} />);
    expect(screen.getByText("4.6")).toBeInTheDocument();
  });

  it("inclui contagem entre parênteses quando count é passado", () => {
    render(<Rating value={4} count={123} />);
    expect(screen.getByText("(123)")).toBeInTheDocument();
  });

  it("aria-label tem nota + total de avaliações", () => {
    render(<Rating value={3.8} count={42} />);
    expect(
      screen.getByRole("img", { name: /3\.80 de 5 \(42 avaliações\)/i }),
    ).toBeInTheDocument();
  });

  it("clampa valor acima de 5", () => {
    render(<Rating value={9} />);
    expect(screen.getByText("5.0")).toBeInTheDocument();
  });

  it("clampa valor abaixo de 0", () => {
    render(<Rating value={-1} />);
    expect(screen.getByText("0.0")).toBeInTheDocument();
  });

  it("hideValue oculta texto da nota mas mantém aria-label", () => {
    render(<Rating value={4} hideValue />);
    expect(screen.queryByText("4.0")).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: /4\.00 de 5/i })).toBeInTheDocument();
  });
});
