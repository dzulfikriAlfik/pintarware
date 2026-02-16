import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BookOpen, Clock, Star, ArrowRight, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo/SEO";

const coursesConfig = [
  { titleKey: "course1Title", descKey: "course1Desc", levelKey: "course1Level", durationKey: "course1Duration", free: true },
  { titleKey: "course2Title", descKey: "course2Desc", levelKey: "course2Level", durationKey: "course2Duration", free: false },
  { titleKey: "course3Title", descKey: "course3Desc", levelKey: "course3Level", durationKey: "course3Duration", free: false },
];

export default function CoursesPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-24 pb-20">
      <SEO
        title={t("courses.title")}
        description="Online programming courses Pintarware—JavaScript, React, Laravel. Free & paid content, self-paced, certificates. Learn from beginner to advanced."
        keywords="kursus programming, kursus JavaScript, kursus React, kursus Laravel, belajar coding online, kursus web development Indonesia"
        path="/courses"
      />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            {t("courses.title")}
          </h1>
          <p className="text-stone-600 max-w-2xl text-lg">
            {t("courses.subtitle")}
          </p>
        </motion.div>

        <div className="grid gap-8">
          {coursesConfig.map((course, i) => (
            <motion.div
              key={course.titleKey}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 hover:border-teal-300/50 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    {course.free && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-700 text-xs font-medium flex items-center gap-1">
                        <Gift className="w-3 h-3" /> {t("courses.free")}
                      </span>
                    )}
                  </div>
                  <h2 className="font-display font-semibold text-xl text-stone-900 mb-2">
                    {t(`courses.${course.titleKey}`)}
                  </h2>
                  <p className="text-stone-600 mb-4">{t(`courses.${course.descKey}`)}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-stone-500">
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4" /> {t(`courses.${course.levelKey}`)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {t(`courses.${course.durationKey}`)}
                    </span>
                  </div>
                </div>
                <Button variant="default" asChild>
                  <Link to="#" className="shrink-0">
                    {course.free ? t("courses.startNow") : t("courses.viewDetail")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-teal-50 border border-teal-200/60 text-center"
        >
          <p className="text-stone-600 mb-4">
            {t("courses.newCoursesNote")}
          </p>
          <Button variant="outline" asChild>
            <Link to="/blog">{t("courses.readBlog")}</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
