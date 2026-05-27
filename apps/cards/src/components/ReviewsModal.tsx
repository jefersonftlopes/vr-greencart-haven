import { useTranslation } from "react-i18next";
import { MessageSquareText } from "lucide-react";
import type { Product, ProductReview } from "@greencart/types";
import { Modal, Rating } from "@greencart/ui";

interface ReviewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

function formatDate(iso: string, locale: string): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function reviewerInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

export function ReviewsModal({ open, onOpenChange, product }: ReviewsModalProps) {
  const { t, i18n } = useTranslation();
  const reviews: ProductReview[] = product.reviews ?? [];

  return (
    <Modal
      variant="center"
      open={open}
      onOpenChange={onOpenChange}
      title={t("reviews.title", "Avaliações")}
      description={product.title}
    >
      <div className="flex items-center gap-4 border-b border-gray-100 px-6 py-4">
        <div className="text-center">
          <p className="text-3xl font-extrabold text-ink">
            {product.rating.toFixed(1)}
          </p>
          <Rating value={product.rating} size={14} hideValue />
          <p className="mt-1 text-[11px] text-ink-muted">
            {t("reviews.count", "{{count}} avaliações", { count: reviews.length })}
          </p>
        </div>
        <div className="flex-1 text-xs text-ink-muted">
          {t(
            "reviews.summary",
            "Veja o que outros clientes acharam deste produto.",
          )}
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 p-10 text-center">
          <MessageSquareText className="h-10 w-10 text-gray-300" />
          <p className="text-sm text-ink-muted">
            {t("reviews.empty", "Nenhuma avaliação ainda.")}
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {reviews.map((r, idx) => (
            <li key={`${r.reviewerEmail}-${idx}`} className="flex gap-3 px-6 py-4">
              <div
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand"
              >
                {reviewerInitials(r.reviewerName)}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">{r.reviewerName}</p>
                  <span className="text-[11px] text-ink-muted">
                    {formatDate(r.date, i18n.language)}
                  </span>
                </div>
                <Rating value={r.rating} size={12} hideValue className="mt-0.5" />
                <p className="mt-1.5 text-sm text-ink/80">{r.comment}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
