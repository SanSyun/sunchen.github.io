export type Locale = "zh" | "en";

type SiteCopy = {
  lang: string;
  brandNote: string;
  footer: string;
  switchLabel: string;
  switchAriaLabel: string;
  nav: Array<{ href: string; label: string }>;
};

export const siteCopy: Record<Locale, SiteCopy> = {
  zh: {
    lang: "zh-CN",
    brandNote: "项目、笔记与持续中的研究。",
    footer: "基于 Astro 与 Markdown 构建，强调沉静阅读体验与清晰的求职信号。",
    switchLabel: "EN",
    switchAriaLabel: "切换到英文页面",
    nav: [
      { href: "/", label: "首页" },
      { href: "/projects", label: "项目" },
      { href: "/notes", label: "笔记" },
      { href: "/about", label: "关于" }
    ]
  },
  en: {
    lang: "en",
    brandNote: "Projects, notes, and ongoing research.",
    footer: "Built with Astro and Markdown. Designed for calm reading and clear hiring signals.",
    switchLabel: "中",
    switchAriaLabel: "Switch to Chinese",
    nav: [
      { href: "/en", label: "Home" },
      { href: "/en/projects", label: "Projects" },
      { href: "/en/notes", label: "Notes" },
      { href: "/en/about", label: "About" }
    ]
  }
};

export function formatDate(date: Date, locale: Locale) {
  return date.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-CA");
}
