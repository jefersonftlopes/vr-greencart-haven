import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@greencart/store/test";
import { LanguageSwitcher } from "./LanguageSwitcher";

describe("LanguageSwitcher", () => {
  it("renderiza botões PT e EN", () => {
    renderWithProviders(<LanguageSwitcher />);
    expect(screen.getByRole("button", { name: "PT" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
  });

  it("PT vem ativo por padrão (aria-pressed)", () => {
    renderWithProviders(<LanguageSwitcher />);
    expect(screen.getByRole("button", { name: "PT" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("clicar em EN atualiza o estado do Redux", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<LanguageSwitcher />);
    await user.click(screen.getByRole("button", { name: "EN" }));
    expect(store.getState().lang.current).toBe("en");
  });
});
