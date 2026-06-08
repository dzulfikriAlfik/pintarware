import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocaleSelector } from "@/components/ui/LocaleSelector";
import { cn } from "@/lib/utils";

const navPaths = [
  { path: "/", key: "home" },
  { path: "/courses", key: "courses" },
  { path: "/blog", key: "blog" },
  { path: "/projects", key: "projects" },
  { path: "/products", key: "products" },
  { path: "/contact", key: "contact" },
  { path: "/mentoring", key: "mentoring" },
];

function NavActions({ className, onNavigate }) {
  const { t } = useTranslation();

  return (
    <div className={cn("space-y-3", className)}>
      <LocaleSelector variant="menu" className="w-full" />
      <Button variant="default" className="w-full" asChild>
        <Link to="/courses" onClick={onNavigate}>→ {t("nav.startLearning")}</Link>
      </Button>
    </div>
  );
}

export function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 z-50 px-4"
      >
        <nav className="max-w-[1200px] mx-auto flex items-center justify-between gap-3 px-3 py-2 sm:px-4 sm:py-3 bg-cream-paper border border-pencil-gray rounded-2xl nav-glow">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-md border-2 border-highlighter-yellow flex items-center justify-center overflow-hidden">
              <img
                src="/pintarware.png"
                alt=""
                className="w-7 h-7 object-contain"
              />
            </div>
            <span className="font-bold text-xl text-forest-ink">
              Pintarware
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5 min-w-0 flex-1 justify-center">
            {navPaths.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-2.5 xl:px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap",
                    isActive
                      ? "bg-sticky-note-mint text-forest-ink"
                      : "text-forest-ink hover:bg-whisper-gray"
                  )}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop ≥1147px: locale + CTA inline */}
            <div className="hidden nav-xl:flex items-center gap-3">
              <LocaleSelector />
              <Button variant="default" size="compact" asChild>
                <Link to="/courses">→ {t("nav.startLearning")}</Link>
              </Button>
            </div>

            {/* <1147px: hamburger for locale + CTA (and full nav below lg) */}
            <div className="relative nav-xl:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 rounded-md flex items-center justify-center border border-forest-ink text-forest-ink hover:bg-whisper-gray transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Tablet 1025–1146px: compact dropdown for locale + CTA */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="hidden lg:block absolute right-0 top-[calc(100%+0.5rem)] w-64 p-4 rounded-xl border border-pencil-gray bg-cream-paper shadow-(--shadow-subtle-2) z-50"
                  >
                    <NavActions onNavigate={closeMenu} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 nav-xl:hidden"
            onClick={closeMenu}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Mobile <1025px: full side drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-72 bg-cream-paper z-50 lg:hidden border-l border-pencil-gray"
          >
            <div className="flex flex-col h-full pt-(--layout-nav-offset) px-6 pb-8">
              <div className="flex flex-col gap-1">
                {navPaths.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        onClick={closeMenu}
                        className={cn(
                          "px-4 py-3 rounded-md text-base font-medium transition-all",
                          isActive
                            ? "bg-sticky-note-mint text-forest-ink"
                            : "text-forest-ink hover:bg-whisper-gray"
                        )}
                      >
                        {t(`nav.${link.key}`)}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-auto pt-4">
                <NavActions onNavigate={closeMenu} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
