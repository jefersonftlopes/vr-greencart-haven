import { useTranslation } from "react-i18next";
import type { Product } from "@greencart/types";
import { addToCart, openCart, useAppDispatch } from "@greencart/store";
import { Button } from "@greencart/ui";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleAdd = () => {
    dispatch(addToCart(product));
    dispatch(openCart());
    // Anuncia para leitores de tela (live region renderizado no host App)
    const liveRegion = document.getElementById("cart-live-region");
    if (liveRegion) {
      liveRegion.textContent = `${product.title} ${t("products.addedToCart", "adicionado ao carrinho")}`;
    }
  };

  const weight = product.weight ? `${product.weight}kg` : "1kg";

  return (
    <article className="group flex flex-col items-center rounded-md border border-brand/40 bg-white p-3 text-center transition-shadow hover:border-brand hover:shadow-md">
      <div className="relative mb-2 flex aspect-square w-full items-center justify-center overflow-hidden rounded-md bg-white">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
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
  );
}
