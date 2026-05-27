import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface FooterColumn {
  title: string;
  items: string[];
}

export interface SocialLink {
  Icon: LucideIcon;
  label: string;
  href: string;
}

export const COLUMNS: FooterColumn[] = [
  {
    title: "About",
    items: ["Who we are", "Privacy Policy", "Careers", "Press"],
  },
  {
    title: "Help",
    items: ["Support", "Help Center", "Order Status", "Shipping Info"],
  },
  {
    title: "Contact",
    items: [
      "Terms & Conditions",
      "Return & Exchange Policy",
      "Suppliers",
      "Wholesale",
    ],
  },
];

export const SOCIAL: SocialLink[] = [
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Twitter, label: "Twitter", href: "#" },
  { Icon: Youtube, label: "Youtube", href: "#" },
];
