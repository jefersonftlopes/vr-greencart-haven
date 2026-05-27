import "@greencart/ui/styles.css";
import "./i18n";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "@greencart/store";
import CheckoutPage from "./CheckoutPage";
import OrderSuccessPage from "./OrderSuccessPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CheckoutPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success" element={<OrderSuccessPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
