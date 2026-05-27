import "./i18n";
import { useState } from "react";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./hooks/useCart";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { CartButton } from "./components/CartButton";
import { CartDrawer } from "./components/CartDrawer";

const NAV_KEYS = ["home", "about", "service", "product", "contact"] as const;

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    items,
    count,
    total,
    isOpen,
    handleOpen,
    handleClose,
    handleCheckout,
    handleUpdateQuantity,
    handleRemove,
  } = useCart();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileNavOpen(false);
  };

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, key: string) => {
    e.preventDefault();
    setMobileNavOpen(false);
    if (key === "home") {
      goHome(e);
      return;
    }
    // Outras seções: garante home e faz scroll para âncora se existir
    if (location.pathname !== "/") {
      navigate("/");
    }
    requestAnimationFrame(() => {
      const el =
        document.getElementById(key) ??
        document.querySelector(`[data-section="${key}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-40 bg-white text-ink shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link
          to="/"
          onClick={goHome}
          aria-label="GreenCart"
          className="flex items-center font-display text-base font-bold text-brand"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white">
            <ShoppingCart className="h-5 w-5" />
          </span>
        </Link>

        <nav
          aria-label={t("aria.mainNav", "Main navigation")}
          className="hidden flex-1 items-center justify-center gap-8 md:flex"
        >
          {NAV_KEYS.map((key) => (
            <NavLink
              key={key}
              to={key === "home" ? "/" : `#${key}`}
              onClick={(e) => handleAnchor(e, key)}
              className={
                "text-sm font-medium transition-colors hover:text-brand " +
                (key === "home" && isHome ? "text-brand" : "text-ink-muted")
              }
            >
              {t(`nav.${key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          <CartButton count={count} onClick={handleOpen} />

          <button
            type="button"
            className="rounded-full bg-surface p-2.5 text-ink-muted hover:bg-brand/10 hover:text-brand"
            aria-label={t("aria.myAccount")}
          >
            <User className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileNavOpen((v) => !v)}
            className="rounded-full bg-surface p-2.5 text-ink-muted hover:bg-brand/10 hover:text-brand md:hidden"
            aria-label={t("aria.menu")}
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileNavOpen && (
        <nav className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">
          <ul className="space-y-3">
            {NAV_KEYS.map((key) => (
              <li key={key}>
                <a
                  href={key === "home" ? "/" : `#${key}`}
                  className="block text-sm font-medium text-ink-muted hover:text-brand"
                  onClick={(e) => handleAnchor(e, key)}
                >
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <CartDrawer
        isOpen={isOpen}
        items={items}
        count={count}
        total={total}
        onOpenChange={(o) => (o ? handleOpen() : handleClose())}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
      />
    </header>
  );
}
