import { useState } from "react";
import { useTranslation } from "react-i18next";

const CATEGORIES = [
  {
    slug: "vegetables",
    label: "Vegetables",
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=240&q=80",
  },
  {
    slug: "fruits",
    label: "Fruits",
    img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=240&q=80",
  },
  {
    slug: "drinks",
    label: "Drinks",
    img: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=240&q=80",
  },
  {
    slug: "nuts",
    label: "Fresh Nuts",
    img: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=240&q=80",
  },
  {
    slug: "fish",
    label: "Fresh Fish",
    img: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?auto=format&fit=crop&w=240&q=80",
  },
  {
    slug: "meat",
    label: "Meat",
    img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=240&q=80",
  },
];

export function Categories() {
  const { t } = useTranslation();
  const [active, setActive] = useState("vegetables");

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
        {[0, 1, 2, 3].map((i) => (
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
