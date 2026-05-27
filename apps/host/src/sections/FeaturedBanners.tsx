import { useTranslation } from "react-i18next";

export function FeaturedBanners() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-4 text-lg font-bold uppercase tracking-wide">
        {t("sections.featured")}
      </h2>

      <div className="grid gap-4 md:grid-cols-[minmax(0,42%)_1fr]">
        <div className="relative flex min-h-[300px] flex-col items-center justify-start overflow-hidden rounded-lg bg-banner-mustard p-6 text-center md:min-h-[420px]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ink">
            {t("banners.freshVegetables")}
          </span>
          <h3 className="mt-1 text-3xl font-extrabold uppercase text-ink md:text-4xl">
            {t("banners.bigSale")}
          </h3>
          <img
            src="/big-sale.png"
            alt={t("banners.freshVegetables")}
            loading="lazy"
            decoding="async"
            className="mx-auto mt-auto w-full max-w-md object-contain"
          />
        </div>

        <div className="grid gap-4">
          <div className="relative flex min-h-[200px] items-center overflow-hidden rounded-lg bg-brand-pink px-4 py-4 md:px-6">
            <img
              src="/super-sale.png"
              alt={t("banners.freshFruit")}
              loading="lazy"
              decoding="async"
              className="h-44 w-56 shrink-0 object-contain md:h-52 md:w-72"
            />
            <div className="ml-auto flex flex-col items-center pl-2 pr-2 text-center md:pr-6">
              <p className="text-xl font-light uppercase leading-tight text-white md:text-2xl">
                {t("banners.freshFruit")}{" "}
                <span className="font-extrabold">{t("banners.superSale")}</span>
              </p>
              <button
                type="button"
                className="mt-3 rounded bg-ink px-6 py-2 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-ink/80"
              >
                {t("banners.shopNow")}
              </button>
            </div>
          </div>

          <div className="relative flex min-h-[200px] items-center overflow-hidden rounded-lg bg-brand-orange px-4 py-4 md:px-6">
            <div className="flex shrink-0 flex-col items-center text-center">
              <div className="border-2 border-ink px-5 py-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-ink">
                  {t("banners.upTo")}
                </p>
                <p className="my-0.5 text-4xl font-extrabold uppercase leading-none text-ink md:text-5xl">
                  20%
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-ink">
                  {t("banners.discount")}
                </p>
              </div>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-white drop-shadow">
                {t("banners.enjoyFreshDrink")}
              </p>
            </div>
            <img
              src="/up-to-discount.png"
              alt={t("banners.enjoyFreshDrink")}
              loading="lazy"
              decoding="async"
              className="ml-auto h-36 w-56 shrink-0 object-contain md:h-44 md:w-72"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
