import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FileText, Calendar, ArrowRight } from "lucide-react";
import { SEO } from "@/components/seo/SEO";

const postsConfig = [
  { slug: "tips-belajar-programming", titleKey: "post1Title", excerptKey: "post1Excerpt", date: "12 Feb 2025" },
  { slug: "react-vs-vue-2025", titleKey: "post2Title", excerptKey: "post2Excerpt", date: "8 Feb 2025" },
  { slug: "api-design-laravel", titleKey: "post3Title", excerptKey: "post3Excerpt", date: "1 Feb 2025" },
];

export default function BlogPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-24 pb-20">
      <SEO
        title={t("blog.title")}
        description="Pintarware programming blog—articles, tutorials, and coding tips. Learning programming tips, React vs Vue, Laravel API design, and more."
        keywords="blog programming, tutorial coding Indonesia, tips belajar programming, artikel React, tutorial Laravel"
        path="/blog"
      />
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            {t("blog.title")}
          </h1>
          <p className="text-stone-600 text-lg">
            {t("blog.subtitle")}
          </p>
        </motion.div>

        <div className="space-y-8">
          {postsConfig.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block p-6 rounded-2xl bg-white border border-stone-200 hover:border-teal-300/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-stone-500 flex items-center gap-1.5 mb-2">
                      <Calendar className="w-4 h-4" /> {post.date}
                    </span>
                    <h2 className="font-display font-semibold text-xl text-stone-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {t(`blog.${post.titleKey}`)}
                    </h2>
                    <p className="text-stone-600">{t(`blog.${post.excerptKey}`)}</p>
                    <span className="inline-flex items-center gap-1 text-teal-600 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                      {t("blog.readMore")} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center text-stone-500"
        >
          <p>{t("blog.stayTuned")}</p>
        </motion.div>
      </div>
    </div>
  );
}
