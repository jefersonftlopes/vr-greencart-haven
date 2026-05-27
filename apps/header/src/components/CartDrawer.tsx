import { ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { CartItem as CartItemType } from "@greencart/types";
import { Button, Modal } from "@greencart/ui";
import { CartItem } from "./CartItem";

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItemType[];
  count: number;
  total: number;
  onOpenChange: (open: boolean) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  count,
  total,
  onOpenChange,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const { t } = useTranslation();

  return (
    <Modal
      open={isOpen}
      onOpenChange={onOpenChange}
      title={t("cart.title", { count })}
      description={
        count === 0 ? t("cart.addProductsToStart") : t("cart.reviewBeforeClose")
      }
    >
      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center">
          <ShoppingCart className="h-12 w-12 text-gray-300" />
          <p className="text-sm text-gray-500">{t("cart.empty")}</p>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <ul className="flex-1 divide-y divide-gray-100 overflow-y-auto px-6">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))}
          </ul>
          <footer className="space-y-3 border-t border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-muted">{t("cart.total")}</span>
              <span className="text-xl font-bold text-brand">
                ${total.toFixed(2)}
              </span>
            </div>
            <Button size="lg" className="w-full" onClick={onCheckout}>
              {t("cart.checkout")}
            </Button>
          </footer>
        </div>
      )}
    </Modal>
  );
}
