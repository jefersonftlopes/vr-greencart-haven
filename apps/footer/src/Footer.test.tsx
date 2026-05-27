import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renderiza as 4 colunas e copyright", () => {
    render(<Footer />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Help")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Follow Us")).toBeInTheDocument();
    expect(screen.getByText(/Green Cart Haven/i)).toBeInTheDocument();
  });

  it("inclui links de redes sociais com aria-label", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /facebook/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /instagram/i })).toBeInTheDocument();
  });
});
