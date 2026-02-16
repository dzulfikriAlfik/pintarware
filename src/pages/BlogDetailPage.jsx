import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { SITE_URL } from "@/config/site";

const slugToPostKey = {
  "tips-belajar-programming": "post1",
  "react-vs-vue-2025": "post2",
  "api-design-laravel": "post3",
};

const postDates = {
  "tips-belajar-programming": { date: "12 Feb 2025", dateISO: "2025-02-12" },
  "react-vs-vue-2025": { date: "8 Feb 2025", dateISO: "2025-02-08" },
  "api-design-laravel": { date: "1 Feb 2025", dateISO: "2025-02-01" },
};

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const postKey = slugToPostKey[slug];
  const dates = postDates[slug];
  const post = postKey
    ? {
        title: t(`blogDetail.${postKey}Title`),
        content: t(`blogDetail.${postKey}Content`),
        description: t(`blogDetail.${postKey}Desc`),
        date: dates?.date,
        dateISO: dates?.dateISO,
      }
    : null;

  if (!post) {
    return (
      <div className="pt-24 pb-20 max-w-4xl mx-auto px-6">
        <SEO title={t("blogDetail.articleNotFound")} description="Page not found." path="/blog/404" />
        <p className="text-stone-600">{t("blogDetail.articleNotFound")}</p>
        <Link to="/blog" className="text-teal-600 hover:underline mt-4 inline-block">
          {t("blogDetail.backToBlogLink")}
        </Link>
      </div>
    );
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description || post.content,
    datePublished: post.dateISO || post.date,
    author: { "@type": "Organization", name: "Pintarware" },
    publisher: {
      "@type": "Organization",
      name: "Pintarware",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/pintarware.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
  };

  return (
    <div className="pt-24 pb-20">
      <SEO
        title={post.title}
        description={post.description || post.content}
        path={`/blog/${slug}`}
        type="article"
        jsonLd={articleJsonLd}
      />
      <article className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-teal-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t("blogDetail.backToBlog")}
          </Link>

          <span className="text-sm text-stone-500 flex items-center gap-1.5 mb-4">
            <Calendar className="w-4 h-4" /> {post.date}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-6">
            {post.title}
          </h1>

          <div className="prose prose-stone max-w-none">
            <p className="text-stone-600 leading-relaxed text-lg">{post.content}</p>
            <p className="text-stone-600 leading-relaxed mt-4">
              {t("blogDetail.fullContentSoon")}
            </p>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
