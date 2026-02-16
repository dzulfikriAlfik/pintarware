import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MessageCircle, Clock, CheckCircle2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo/SEO";

const benefitKeys = ["benefit1", "benefit2", "benefit3", "benefit4"];

export default function MentoringPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-24 pb-20">
      <SEO
        title={t("mentoring.title")}
        description="Pintarware 1-on-1 programming mentoring—hourly live sessions. Technical discussion, code review, project guidance. Booking available."
        keywords="mentoring programming, code review Indonesia, bimbingan proyek coding, konsultasi developer, mentoring Laravel React"
        path="/mentoring"
      />
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            {t("mentoring.title")}
          </h1>
          <p className="text-stone-600 max-w-2xl text-lg">
            {t("mentoring.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-2xl bg-white border border-stone-200 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-xl text-stone-900">
                  {t("mentoring.liveSession")}
                </h2>
                <p className="text-sm text-stone-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {t("mentoring.perSession")}
                </p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {benefitKeys.map((key) => (
                <li key={key} className="flex items-center gap-3 text-stone-700">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                  {t(`mentoring.${key}`)}
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/60 mb-6">
              <p className="text-sm text-stone-700">
                <span className="font-semibold text-amber-700">Rate:</span> {t("mentoring.rate")}
              </p>
              <p className="text-xs text-stone-500 mt-1">
                {t("mentoring.rateNote")}
              </p>
            </div>

            <Button variant="accent" size="lg" className="w-full" asChild>
              <a
                href="mailto:dzulfikri.alkautsari@gmail.com?subject=Booking%20Mentoring%20Pintarware"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="w-4 h-4" />
                {t("mentoring.bookViaEmail")}
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-2xl bg-stone-100 border border-stone-200"
          >
            <h3 className="font-display font-semibold text-lg text-stone-900 mb-4">
              {t("mentoring.howToBook")}
            </h3>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                  1
                </span>
                <div>
                  <p className="font-medium text-stone-800">{t("mentoring.step1Title")}</p>
                  <p className="text-sm text-stone-600">{t("mentoring.step1Desc")}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                  2
                </span>
                <div>
                  <p className="font-medium text-stone-800">{t("mentoring.step2Title")}</p>
                  <p className="text-sm text-stone-600">{t("mentoring.step2Desc")}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                  3
                </span>
                <div>
                  <p className="font-medium text-stone-800">{t("mentoring.step3Title")}</p>
                  <p className="text-sm text-stone-600">{t("mentoring.step3Desc")}</p>
                </div>
              </li>
            </ol>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
