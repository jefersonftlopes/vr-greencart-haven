import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CATEGORIES, CATEGORY_PAGINATION_DOTS } from "../constants/categories";

export function Categories() {
  const { t } = useTranslation();
  const [active, setActive] = useState(CATEGORIES[0]?.slug ?? "");

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-6 text-lg font-bold uppercase tracking-wide">
        {t("sections.categories", "Category")}
      </h2>

      <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setActive(cat.slug)}
              className="group flex flex-col items-center gap-3"
            >
              <span className="flex aspect-square w-full max-w-24 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm transition-transform group-hover:scale-105">
                <img
                  src={cat.img}
                  alt={cat.label}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </span>
              <span
                className={
                  "text-xs font-semibold uppercase tracking-wide " +
                  (isActive
                    ? "text-brand"
                    : "text-ink-muted group-hover:text-brand")
                }
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: CATEGORY_PAGINATION_DOTS }).map((_, i) => (
          <span
            key={i}
            className={
              "h-2 w-2 rounded-full " + (i === 0 ? "bg-brand" : "bg-gray-300")
            }
          />
        ))}
      </div>
    </section>
  );
}
