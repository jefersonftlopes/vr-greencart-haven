import type { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { render, type RenderOptions } from "@testing-library/react";
import { createAppStore } from "../store";
import type { AppStore } from "../store";

interface WithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  store?: AppStore;
  route?: string;
}

/**
 * Helper para renderizar componentes com Redux + Router (memory) configurados.
 * Cada teste obtém um store novo via `createAppStore()` para isolamento.
 */
export function renderWithProviders(
  ui: ReactElement,
  { store = createAppStore(), route = "/", ...options }: WithProvidersOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...options }) };
}
