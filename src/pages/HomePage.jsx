import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Package,
  MessageCircle,
  ArrowRight,
  Lightbulb,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo/SEO";
import { baseJsonLd } from "@/lib/seo";

const offeringsConfig = [
  {
    icon: BookOpen,
    titleKey: "offering1Title",
    descKey: "offering1Desc",
    path: "/courses",
    surface: "bg-sticky-note-mint",
  },
  {
    icon: FileText,
    titleKey: "offering2Title",
    descKey: "offering2Desc",
    path: "/blog",
    surface: "bg-cream-paper border border-forest-ink",
  },
  {
    icon: Package,
    titleKey: "offering3Title",
    descKey: "offering3Desc",
    path: "/products",
    surface: "bg-sticky-note-teal",
  },
  {
    icon: MessageCircle,
    titleKey: "offering4Title",
    descKey: "offering4Desc",
    path: "/mentoring",
    surface: "bg-cream-paper border border-forest-ink",
  },
];

function SketchDecoration() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15]"
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M50 120 Q200 80 350 150 T650 100" stroke="#1a3300" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="680" cy="180" r="40" stroke="#1a3300" strokeWidth="1.5" />
      <path d="M100 450 L180 380 L260 420 L340 350" stroke="#1a3300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M550 400 C580 360 620 380 640 420 C660 460 600 480 570 450" stroke="#1a3300" strokeWidth="1.5" />
      <rect x="420" y="80" width="60" height="60" rx="4" stroke="#1a3300" strokeWidth="1.5" transform="rotate(12 450 110)" />
    </svg>
  );
}

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <div>
      <SEO
        fullTitle={t("seo.homeTitle")}
        description={t("seo.homeDesc")}
        keywords="pintarware, kursus programming Indonesia, belajar coding, tutorial Laravel, kursus React, blog programming, mentoring coding, produk digital developer"
        path="/"
        jsonLd={baseJsonLd}
      />

      {/* Hero */}
      <section className="relative min-h-[calc(90vh-var(--layout-nav-offset))] flex items-center overflow-hidden pb-20">
        <SketchDecoration />

        <div className="relative max-w-[1200px] mx-auto px-6 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-highlighter-yellow text-forest-ink text-xs font-medium mb-8"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              {t("home.badge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-display text-4xl sm:text-5xl lg:text-heading-lg text-forest-ink mb-8"
            >
              {t("home.heroTitle")}{" "}
              <span className="highlight-word">{t("home.heroTitleHighlight")}</span>{" "}
              {t("home.heroTitleSuffix")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-forest-ink leading-relaxed mb-10 max-w-[600px] mx-auto"
            >
              {t("home.heroDesc")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button variant="default" size="lg" asChild>
                <Link to="/courses">
                  → {t("home.ctaStart")}
                </Link>
              </Button>
              <Button variant="pastel" size="lg" asChild>
                <Link to="/blog">
                  {t("home.ctaBlog")} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-xs text-pencil-gray"
            >
              {t("home.ctaNote", { defaultValue: "mulai gratis, tanpa kartu kredit." })}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-20 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-display-sm text-3xl sm:text-4xl text-forest-ink mb-4">
              {t("home.offeringsTitle")}
            </h2>
            <p className="text-forest-ink max-w-2xl mx-auto text-lg">
              {t("home.offeringsSubtitle")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8">
            {offeringsConfig.map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`block h-full p-6 rounded-xl ${item.surface} group transition-all duration-300 hover:translate-y-[-2px]`}
                >
                  <div className="w-10 h-10 rounded-md bg-highlighter-yellow text-forest-ink flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-2xl text-forest-ink mb-2">
                    {t(`home.${item.titleKey}`)}
                  </h3>
                  <p className="text-base text-forest-ink leading-relaxed mb-4">
                    {t(`home.${item.descKey}`)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-forest-ink text-sm font-medium group-hover:gap-2 transition-all">
                    {t("home.explore")} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 sm:p-14 rounded-xl bg-sticky-note-blush border border-forest-ink text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-highlighter-yellow text-forest-ink text-xs font-medium mb-6">
              <GraduationCap className="w-3.5 h-3.5" />
              {t("home.ctaSectionBadge")}
            </div>
            <h2 className="text-display-sm text-3xl sm:text-4xl text-forest-ink mb-4">
              {t("home.ctaSectionTitle")}
            </h2>
            <p className="text-forest-ink max-w-xl mx-auto mb-8 text-lg">
              {t("home.ctaSectionDesc")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="default" size="lg" asChild>
                <Link to="/courses">→ {t("home.viewCourses")}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/mentoring">{t("home.bookMentoring")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
