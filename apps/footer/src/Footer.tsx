import { COLUMNS, SOCIAL } from "./constants/footer";

export default function Footer() {
  return (
    <footer className="bg-brand-light/30 text-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-ink">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-xs text-ink-muted transition-colors hover:text-brand"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-ink">
            Follow Us
          </h4>
          <ul className="space-y-2">
            {SOCIAL.map(({ Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="inline-flex items-center gap-2 text-xs text-ink-muted transition-colors hover:text-brand"
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-light/40">
        <p className="mx-auto max-w-7xl px-4 py-3 text-center text-[11px] text-ink-muted">
          © {new Date().getFullYear()} Green Cart Haven. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
