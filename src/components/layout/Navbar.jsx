import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocaleSelector } from "@/components/ui/LocaleSelector";
import { cn } from "@/lib/utils";

const navPaths = [
  { path: "/", key: "home" },
  { path: "/courses", key: "courses" },
  { path: "/blog", key: "blog" },
  { path: "/products", key: "products" },
  { path: "/mentoring", key: "mentoring" },
];

export function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "py-3 bg-stone-50/95 backdrop-blur-xl border-b border-stone-200/80 shadow-sm"
            : "py-4 bg-transparent"
        )}
      >
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/pintarware.png"
              alt="Pintarware"
              className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display font-semibold text-lg text-stone-800">
              Pintarware
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navPaths.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive
                      ? "text-teal-600 bg-teal-50"
                      : "text-stone-600 hover:text-teal-600 hover:bg-stone-100"
                  )}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <LocaleSelector />
            <Button variant="accent" size="sm" className="hidden md:inline-flex" asChild>
              <Link to="/courses">
                <BookOpen className="w-4 h-4" />
                {t("nav.startLearning")}
              </Link>
            </Button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
              aria-label="Toggle menu"
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
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-stone-50 shadow-2xl z-50 md:hidden border-l border-stone-200"
            >
              <div className="flex flex-col h-full pt-24 px-6 pb-8">
                <div className="flex flex-col gap-1">
                  {navPaths.map((link, i) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <motion.div key={link.path} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                        <Link
                          to={link.path}
                          className={cn(
                            "px-4 py-3 rounded-xl text-base font-medium transition-all",
                            isActive ? "bg-teal-50 text-teal-600" : "text-stone-700 hover:bg-stone-100"
                          )}
                        >
                          {t(`nav.${link.key}`)}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-auto pt-4 space-y-3">
                  <LocaleSelector />
                  <Button variant="accent" className="w-full" asChild>
                    <Link to="/courses">{t("nav.startLearning")}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
