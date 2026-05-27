import "./i18n";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCheckout } from "./hooks/useCheckout";
import { OrderTable } from "./components/OrderTable";
import { OrderSummary } from "./components/OrderSummary";

export default function CheckoutPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, total, isLoading, error, handleConfirm } = useCheckout(() =>
    navigate("/checkout/success"),
  );

  const itemsCount = items.reduce((sum, i) => sum + i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 bg-white p-10 text-center">
          <ShoppingCart className="h-12 w-12 text-gray-300" />
          <div>
            <h2 className="text-xl font-bold text-ink">{t("checkout.emptyCart")}</h2>
            <p className="mt-1 text-sm text-ink-muted">
              {t("checkout.emptyCartMessage")}
            </p>
          </div>
          <Link
            to="/"
            className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-brand px-4 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
          >
            {t("checkout.continueShopping")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("checkout.backToHome")}
      </Link>

      <header className="mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-ink md:text-3xl">
          {t("checkout.title")}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">{t("checkout.subtitle")}</p>
      </header>

      {error && (
        <div
          role="alert"
          className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {t("checkout.orderError")}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section aria-label={t("checkout.yourItems")}>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-muted">
            {t("checkout.yourItems")}
          </h2>
          <OrderTable items={items} />
        </section>

        <OrderSummary
          subtotal={total}
          itemsCount={itemsCount}
          isLoading={isLoading}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}
