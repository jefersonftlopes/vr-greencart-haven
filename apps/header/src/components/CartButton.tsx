import { ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CartButtonProps {
  count: number;
  onClick: () => void;
}

export function CartButton({ count, onClick }: CartButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative rounded-full bg-surface p-2.5 text-ink-muted hover:bg-brand/10 hover:text-brand"
      aria-label={t("aria.openCart", { count })}
    >
      <ShoppingCart className="h-4 w-4" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold leading-none text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
