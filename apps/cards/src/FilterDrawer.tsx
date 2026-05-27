import { useTranslation } from 'react-i18next';
import {
  resetFilters,
  selectCategory,
  selectFilters,
  setCategory,
  setOrder,
  setSortBy,
  useAppDispatch,
  useAppSelector,
  useGetCategoriesFullQuery,
} from '@greencart/store';
import type { SortByField, SortOrder } from '@greencart/store';
import { Button, Modal, Skeleton } from '@greencart/ui';

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
}

const SORT_OPTIONS: Array<{ value: SortByField; key: string }> = [
  { value: 'title', key: 'title' },
  { value: 'price', key: 'price' },
  { value: 'rating', key: 'rating' },
  { value: 'stock', key: 'stock' },
  { value: 'discountPercentage', key: 'discountPercentage' },
];

const ORDER_OPTIONS: Array<{ value: SortOrder; key: string }> = [
  { value: 'asc', key: 'asc' },
  { value: 'desc', key: 'desc' },
];

export function FilterDrawer({ open, onClose }: FilterDrawerProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { sortBy, order } = useAppSelector(selectFilters);
  const activeCategory = useAppSelector(selectCategory);
  const { data: categories = [], isLoading: loadingCats } = useGetCategoriesFullQuery();

  return (
    <Modal
      open={open}
      onOpenChange={(o) => !o && onClose()}
      title={t('products.filters')}
      description={t('products.filtersDescription')}
    >
      <div className="flex flex-col gap-6 p-6">
        {/* Category filter */}
        <div>
          <p className="mb-3 text-sm font-semibold text-ink">{t('products.category')}</p>
          {loadingCats ? (
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-full" />
              ))}
            </div>
          ) : (
            <div className="flex max-h-44 flex-wrap gap-2 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => dispatch(setCategory(null))}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  activeCategory === null
                    ? 'border-brand bg-brand text-white'
                    : 'border-gray-200 text-ink-muted hover:border-brand hover:text-brand'
                }`}
              >
                {t('products.allCategories')}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() =>
                    dispatch(setCategory(activeCategory === cat.slug ? null : cat.slug))
                  }
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                    activeCategory === cat.slug
                      ? 'border-brand bg-brand text-white'
                      : 'border-gray-200 text-ink-muted hover:border-brand hover:text-brand'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort by */}
        <div>
          <p className="mb-3 text-sm font-semibold text-ink">{t('products.sortBy')}</p>
          <div className="flex flex-wrap gap-2">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => dispatch(setSortBy(opt.value))}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  sortBy === opt.value
                    ? 'border-brand bg-brand text-white'
                    : 'border-gray-200 text-ink-muted hover:border-brand hover:text-brand'
                }`}
              >
                {t(`products.sort.${opt.key}`, opt.key)}
              </button>
            ))}
          </div>
        </div>

        {/* Sort order */}
        <div>
          <p className="mb-3 text-sm font-semibold text-ink">{t('products.sortOrder')}</p>
          <div className="flex gap-3">
            {ORDER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => dispatch(setOrder(opt.value))}
                className={`flex-1 rounded-md border py-2 text-sm font-medium transition-colors ${
                  order === opt.value
                    ? 'border-brand bg-brand text-white'
                    : 'border-gray-200 text-ink-muted hover:border-brand hover:text-brand'
                }`}
              >
                {t(`products.order.${opt.key}`)}
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="secondary"
          onClick={() => {
            dispatch(resetFilters());
            dispatch(setCategory(null));
            onClose();
          }}
        >
          {t('products.resetFilters')}
        </Button>
      </div>
    </Modal>
  );
}
