import { CircleCheck, ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface OrderSuccessProps {
  orderId: number | null;
}

export function OrderSuccess({ orderId }: OrderSuccessProps) {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <CircleCheck className="mb-4 h-16 w-16 text-brand" />
      <h2 className="mb-2 text-2xl font-bold text-ink">
        {t("checkout.orderSuccess")}
      </h2>
      {orderId && (
        <p className="mb-2 text-sm font-medium text-brand">
          {t("checkout.orderId")}: #{orderId}
        </p>
      )}
      <p className="mb-8 text-sm text-ink-muted">
        {t("checkout.orderSuccessMessage")}
      </p>
      <Link
        to="/"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand px-6 text-base font-medium text-white transition-colors hover:bg-brand-dark"
      >
        <ShoppingBag className="h-4 w-4" />
        {t("checkout.continueShopping")}
      </Link>
    </div>
  );
}
