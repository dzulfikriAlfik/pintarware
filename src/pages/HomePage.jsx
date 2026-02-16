import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Package,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Play,
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
    color: "from-teal-500/10 to-teal-600/5",
    iconBg: "bg-teal-100 text-teal-600",
  },
  {
    icon: FileText,
    titleKey: "offering2Title",
    descKey: "offering2Desc",
    path: "/blog",
    color: "from-amber-500/10 to-amber-600/5",
    iconBg: "bg-amber-100 text-amber-600",
  },
  {
    icon: Package,
    titleKey: "offering3Title",
    descKey: "offering3Desc",
    path: "/products",
    color: "from-teal-500/10 to-teal-600/5",
    iconBg: "bg-teal-100 text-teal-600",
  },
  {
    icon: MessageCircle,
    titleKey: "offering4Title",
    descKey: "offering4Desc",
    path: "/mentoring",
    color: "from-amber-500/10 to-amber-600/5",
    iconBg: "bg-amber-100 text-amber-600",
  },
];

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
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-teal-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-amber-200/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-teal-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200/60 text-teal-700 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              {t("home.badge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] text-stone-900 mb-6"
            >
              {t("home.heroTitle")}{" "}
              <span className="gradient-text">{t("home.heroTitleHighlight")}</span> {t("home.heroTitleSuffix")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-stone-600 leading-relaxed mb-8 max-w-2xl"
            >
              {t("home.heroDesc")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="accent" size="lg" asChild>
                <Link to="/courses">
                  <Play className="w-4 h-4" />
                  {t("home.ctaStart")}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/blog">
                  {t("home.ctaBlog")} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
              {t("home.offeringsTitle")}
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              {t("home.offeringsSubtitle")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className={`block h-full p-6 rounded-2xl bg-gradient-to-br ${item.color} border border-stone-200/60 hover:border-teal-300/40 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300 group`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-stone-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {t(`home.${item.titleKey}`)}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-4">
                    {t(`home.${item.descKey}`)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-teal-600 text-sm font-medium group-hover:gap-2 transition-all">
                    {t("home.explore")} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-stone-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(20,184,166,0.12)_0%,transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-stone-300 text-sm mb-6"
          >
            <GraduationCap className="w-4 h-4" />
            {t("home.ctaSectionBadge")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            {t("home.ctaSectionTitle")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-400 max-w-xl mx-auto mb-8"
          >
            {t("home.ctaSectionDesc")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-teal-500 hover:bg-teal-400 text-white border-0"
              asChild
            >
              <Link to="/courses">{t("home.viewCourses")}</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-stone-600 text-white hover:bg-white/10 hover:border-stone-500"
              asChild
            >
              <Link to="/mentoring">{t("home.bookMentoring")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
