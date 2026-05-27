import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "@greencart/types";
import { addToCart, openCart, useAppDispatch } from "@greencart/store";
import { Button, Rating } from "@greencart/ui";
import { ReviewsModal } from "./components/ReviewsModal";
import { DEFAULT_WEIGHT_LABEL } from "./constants/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [reviewsOpen, setReviewsOpen] = useState(false);

  const handleAdd = () => {
    dispatch(addToCart(product));
    dispatch(openCart());
    const liveRegion = document.getElementById("cart-live-region");
    if (liveRegion) {
      liveRegion.textContent = `${product.title} ${t(
        "products.addedToCart",
        "adicionado ao carrinho",
      )}`;
    }
  };

  const weight = product.weight ? `${product.weight}kg` : DEFAULT_WEIGHT_LABEL;
  const reviewsCount = product.reviews?.length ?? 0;

  return (
    <>
      <article className="group relative flex flex-col items-center rounded-md border border-brand/40 bg-white p-3 pt-9 text-center transition-shadow hover:border-brand hover:shadow-md">
        <button
          type="button"
          onClick={() => setReviewsOpen(true)}
          aria-label={t("reviews.openAria", "Ver avaliações de {{title}}", {
            title: product.title,
          })}
          className="absolute right-2 top-2 z-10 rounded px-1.5 py-0.5 transition-colors hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
        >
          <Rating
            value={product.rating}
            count={reviewsCount || undefined}
            size={12}
          />
        </button>

        <div className="relative mb-2 flex aspect-square w-full items-center justify-center overflow-hidden rounded-md bg-white">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-2 transition-transform group-hover:scale-105"
          />
        </div>

        <h3
          className="line-clamp-1 w-full text-xs font-semibold text-ink"
          title={product.title}
        >
          {product.title}
        </h3>
        <p className="mt-0.5 text-[11px] text-ink-muted">{weight}</p>
        <p className="mt-1 text-xs font-semibold text-ink">
          ${product.price.toFixed(2)}
        </p>

        <Button
          size="sm"
          onClick={handleAdd}
          aria-label={`${t("products.addToCart")} ${product.title}`}
          className="mt-2 h-8 rounded px-4 text-xs font-normal"
        >
          {t("products.addToCart")}
        </Button>
      </article>

      <ReviewsModal
        open={reviewsOpen}
        onOpenChange={setReviewsOpen}
        product={product}
      />
    </>
  );
}
