import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Github, Linkedin, Mail, Heart, ArrowUpRight } from "lucide-react";

const footerLinksConfig = [
  {
    titleKey: "education",
    links: [
      { key: "courses", path: "/courses" },
      { key: "blog", path: "/blog" },
    ],
  },
  {
    titleKey: "services",
    links: [
      { key: "products", path: "/products" },
      { key: "mentoring", path: "/mentoring" },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/dzulfikriAlfik", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/dzulfikri-alkautsari-b5b892187/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:dzulfikri.alkautsari@gmail.com", label: "Email" },
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-cream-paper border-t border-pencil-gray overflow-hidden">
      <div className="relative max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-md border-2 border-highlighter-yellow flex items-center justify-center">
                <img src="/pintarware.png" alt="" className="w-7 h-7 object-contain" />
              </div>
              <span className="font-bold text-xl text-forest-ink">Pintarware</span>
            </Link>
            <p className="text-pencil-gray text-sm leading-relaxed max-w-sm mb-6">
              {t("footer.description")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-md border border-pencil-gray flex items-center justify-center text-forest-ink hover:bg-sticky-note-mint hover:border-forest-ink transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {footerLinksConfig.map((group) => (
            <div key={group.titleKey}>
              <h4 className="font-semibold text-forest-ink text-sm font-roboto-mono uppercase tracking-wider mb-4">
                {t(`footer.${group.titleKey}`)}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-forest-ink hover:underline flex items-center gap-1 group"
                    >
                      {t(`nav.${link.key}`)}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-pencil-gray flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-pencil-gray">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <p className="flex items-center gap-1.5">
            {t("footer.createdBy")}{" "}
            <a
              href="https://dzulfikri.pintarware.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest-ink hover:underline underline-offset-2"
            >
              Dzulfikri
            </a>
            {" "}• {t("footer.madeWith")} <Heart className="w-3.5 h-3.5 text-terracotta fill-terracotta inline" /> React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
