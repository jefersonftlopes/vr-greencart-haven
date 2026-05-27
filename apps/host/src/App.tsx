import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RemoteBoundary } from "./components/RemoteBoundary";
import { HomePage } from "./pages/HomePage";

const Header = lazy(() => import("header/Header"));
const Footer = lazy(() => import("footer/Footer"));
const CheckoutPage = lazy(() => import("checkout/CheckoutPage"));
const OrderSuccessPage = lazy(() => import("checkout/OrderSuccessPage"));

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-white">
        <RemoteBoundary name="Header">
          <Suspense fallback={<div className="h-16 animate-pulse bg-brand" />}>
            <Header />
          </Suspense>
        </RemoteBoundary>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          id="cart-live-region"
        />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/checkout"
              element={
                <RemoteBoundary name="Checkout">
                  <Suspense
                    fallback={
                      <div className="py-20 text-center text-ink-muted">
                        Carregando checkout…
                      </div>
                    }
                  >
                    <CheckoutPage />
                  </Suspense>
                </RemoteBoundary>
              }
            />
            <Route
              path="/checkout/success"
              element={
                <RemoteBoundary name="Checkout">
                  <Suspense
                    fallback={
                      <div className="py-20 text-center text-ink-muted">…</div>
                    }
                  >
                    <OrderSuccessPage />
                  </Suspense>
                </RemoteBoundary>
              }
            />
          </Routes>
        </main>

        <RemoteBoundary name="Footer">
          <Suspense fallback={<div className="h-40 bg-footer" />}>
            <Footer />
          </Suspense>
        </RemoteBoundary>
      </div>
    </BrowserRouter>
  );
}
