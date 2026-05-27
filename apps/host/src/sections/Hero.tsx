import { useTranslation } from "react-i18next";
import { Button } from "@greencart/ui";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-4 pt-4">
      <div className="grid items-stretch overflow-hidden rounded-lg bg-brand text-white md:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col justify-center gap-4 px-6 py-10 md:px-10">
          <h1 className="font-display text-2xl font-bold uppercase leading-tight tracking-wide md:text-3xl">
            {t("hero.titleLine1")}
            <br />
            {t("hero.titleLine2")}
          </h1>
          <p className="max-w-sm text-xs uppercase tracking-wide text-white/85 md:text-sm">
            {t("hero.description")}
          </p>
          <div>
            <Button className="bg-white px-6 text-xs font-bold uppercase tracking-wider text-brand hover:bg-white/90">
              {t("hero.cta")}
            </Button>
          </div>
        </div>
        <div className="relative flex items-center justify-center bg-brand">
          <img
            src="/hero.png"
            alt="Variedade de produtos frescos e mantimentos"
            loading="eager"
            className="h-full max-h-72 w-full object-cover md:max-h-80"
          />
        </div>
      </div>
    </section>
  );
}
