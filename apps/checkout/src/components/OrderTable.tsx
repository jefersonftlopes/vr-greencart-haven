import { useTranslation } from 'react-i18next';
import { Minus, Plus, Trash2 } from 'lucide-react';
import {
  removeFromCart,
  updateQuantity,
  useAppDispatch,
} from '@greencart/store';

interface CartItemData {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

interface OrderItemListProps {
  items: CartItemData[];
}

export function OrderTable({ items }: OrderItemListProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white">
      {items.map((item) => {
        const subtotal = item.price * item.quantity;
        return (
          <li
            key={item.id}
            className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
              className="h-20 w-20 shrink-0 self-center rounded-md object-cover sm:self-auto"
            />

            <div className="flex flex-1 flex-col gap-1 sm:gap-0">
              <h3 className="line-clamp-2 text-sm font-semibold text-ink" title={item.title}>
                {item.title}
              </h3>
              <p className="text-xs text-ink-muted">
                ${item.price.toFixed(2)} {t('checkout.each')}
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-2">
              <div className="flex items-center rounded-md border border-gray-200">
                <button
                  type="button"
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                  }
                  className="flex h-8 w-8 items-center justify-center text-ink-muted hover:bg-gray-50 hover:text-ink"
                  aria-label={t('checkout.decrease')}
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="min-w-8 text-center text-sm font-semibold text-ink">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                  }
                  className="flex h-8 w-8 items-center justify-center text-ink-muted hover:bg-gray-50 hover:text-ink"
                  aria-label={t('checkout.increase')}
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-brand">${subtotal.toFixed(2)}</span>
                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-red-50 hover:text-red-500"
                  aria-label={t('checkout.remove')}
                  title={t('checkout.remove')}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
