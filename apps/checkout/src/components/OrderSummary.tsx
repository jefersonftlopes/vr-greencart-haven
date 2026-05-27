import { useTranslation } from 'react-i18next';
import { Lock } from 'lucide-react';
import { Button } from '@greencart/ui';
import { SHIPPING_FEE, SHIPPING_FREE_THRESHOLD } from '../constants/checkout';

interface OrderSummaryProps {
  subtotal: number;
  itemsCount: number;
  isLoading: boolean;
  onConfirm: () => void;
}

export function OrderSummary({ subtotal, itemsCount, isLoading, onConfirm }: OrderSummaryProps) {
  const { t } = useTranslation();
  const shipping = subtotal >= SHIPPING_FREE_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  return (
    <aside className="sticky top-24 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <header>
        <h2 className="text-base font-bold uppercase tracking-wide text-ink">
          {t('checkout.orderSummary')}
        </h2>
        <p className="mt-0.5 text-xs text-ink-muted">
          {t('checkout.items', { count: itemsCount })}
        </p>
      </header>

      <dl className="space-y-2 border-t border-gray-100 pt-4 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-ink-muted">{t('checkout.subtotal')}</dt>
          <dd className="font-medium text-ink">${subtotal.toFixed(2)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-ink-muted">{t('checkout.shipping')}</dt>
          <dd className={shipping === 0 ? 'font-medium text-brand' : 'font-medium text-ink'}>
            {shipping === 0 ? t('checkout.freeShipping') : `$${shipping.toFixed(2)}`}
          </dd>
        </div>
      </dl>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-sm font-bold uppercase tracking-wide text-ink">
          {t('checkout.orderTotal')}
        </span>
        <span className="text-xl font-extrabold text-brand">${total.toFixed(2)}</span>
      </div>

      <Button size="lg" className="w-full" onClick={onConfirm} disabled={isLoading || itemsCount === 0}>
        {isLoading ? t('checkout.placingOrder') : t('checkout.placeOrder')}
      </Button>

      <p className="flex items-center justify-center gap-1.5 text-[11px] text-ink-muted">
        <Lock className="h-3 w-3" />
        {t('checkout.secureCheckout')}
      </p>
    </aside>
  );
}
