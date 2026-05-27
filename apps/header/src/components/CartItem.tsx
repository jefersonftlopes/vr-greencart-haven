import { useTranslation } from "react-i18next";
import type { CartItem as CartItemType } from "@greencart/types";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { t } = useTranslation();

  return (
    <li className="flex gap-3 py-4">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="h-16 w-16 rounded-md object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="flex flex-1 flex-col">
        <h4 className="line-clamp-1 text-sm font-medium text-ink">
          {item.title}
        </h4>
        <p className="text-xs text-ink-muted">
          ${item.price.toFixed(2)} {t("cart.each")}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-md border border-gray-200">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="h-7 w-7 text-sm hover:bg-gray-50"
              aria-label={t("cart.decrease")}
            >
              −
            </button>
            <span className="min-w-6 text-center text-sm font-medium" aria-live="polite">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="h-7 w-7 text-sm hover:bg-gray-50"
              aria-label={t("cart.increase")}
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="text-xs text-red-500 hover:underline"
          >
            {t("cart.remove")}
          </button>
        </div>
      </div>
    </li>
  );
}
