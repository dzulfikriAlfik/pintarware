import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Heart, ArrowUpRight } from "lucide-react";

const footerLinks = [
  {
    title: "Edukasi",
    links: [
      { label: "Kursus", path: "/courses" },
      { label: "Blog", path: "/blog" },
    ],
  },
  {
    title: "Layanan",
    links: [
      { label: "Produk Digital", path: "/products" },
      { label: "Mentoring", path: "/mentoring" },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/dzulfikriAlfik", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/dzulfikri-alkautsari-b5b892187/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:dzulfikri.alkautsari@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative bg-stone-800 text-stone-300 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(20,184,166,0.08)_0%,transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src="/pintarware.png" alt="Pintarware" className="w-10 h-10 object-contain" />
              <span className="font-display font-semibold text-white text-lg">Pintarware</span>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm mb-6">
              Platform edukasi untuk belajar programming—kursus online, blog, produk digital, dan mentoring langsung. Mari tumbuh bersama.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-stone-700/50 border border-stone-600 flex items-center justify-center text-stone-400 hover:text-teal-400 hover:border-teal-500/30 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-stone-400 hover:text-teal-400 transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-stone-700 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} Pintarware. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> • React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
