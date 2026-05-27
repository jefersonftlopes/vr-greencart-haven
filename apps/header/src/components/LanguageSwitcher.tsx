import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { type Lang, selectLanguage, setLanguage, useAppDispatch, useAppSelector } from "@greencart/store";

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectLanguage);

  const setLang = (lang: Lang) => dispatch(setLanguage(lang));

  return (
    <div
      role="group"
      aria-label={t("aria.languageSwitcher", "Language")}
      className="flex items-center gap-1 rounded-full bg-surface px-2 py-1"
    >
      <Globe className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLang("pt")}
        aria-pressed={current === "pt"}
        className={`rounded px-1 py-0.5 text-xs font-medium transition-colors ${
          current === "pt"
            ? "font-bold text-brand"
            : "text-ink-muted hover:text-brand"
        }`}
      >
        PT
      </button>
      <span className="text-xs text-ink-muted" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={current === "en"}
        className={`rounded px-1 py-0.5 text-xs font-medium transition-colors ${
          current === "en"
            ? "font-bold text-brand"
            : "text-ink-muted hover:text-brand"
        }`}
      >
        EN
      </button>
    </div>
  );
}
