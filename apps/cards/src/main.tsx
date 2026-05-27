import "@greencart/ui/styles.css";
import "./i18n";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "@greencart/store";
import ProductList from "./ProductList";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="mx-auto max-w-7xl px-6 py-8">
          <ProductList />
        </div>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
