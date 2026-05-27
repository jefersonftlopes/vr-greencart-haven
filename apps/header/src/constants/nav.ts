export const NAV_KEYS = ["home", "about", "service", "product", "contact"] as const;
export type NavKey = (typeof NAV_KEYS)[number];
