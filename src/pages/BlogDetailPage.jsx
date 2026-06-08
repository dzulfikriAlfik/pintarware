import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { SITE_URL } from "@/config/site";
import { getBlogPost } from "@/lib/cmsClient";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const locale = i18n.language === "id" ? "id" : "en";
        const payload = await getBlogPost(slug, locale);
        if (cancelled) return;
        setPost(payload?.data ?? null);
      } catch {
        if (cancelled) return;
        setPost(null);
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug, i18n.language]);

  if (!loading && !post) {
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

  if (loading) {
    return (
      <div className="pt-24 pb-20 max-w-4xl mx-auto px-6">
        <p className="text-stone-600">Loading...</p>
      </div>
    );
  }

  const metaDescription =
    (post.seo?.description && String(post.seo.description).trim()) ||
    (post.excerpt && String(post.excerpt).trim()) ||
    post.title;
  const metaKeywords =
    (post.seo?.keywords && String(post.seo.keywords).trim()) || undefined;
  const metaImage =
    (post.seo?.image && String(post.seo.image).trim()) ||
    `${SITE_URL}/pintarware.png`;
  const titleForSeo =
    (post.seo?.title && String(post.seo.title).trim()) || post.title;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: metaDescription || post.title,
    datePublished: post.published_at || post.date,
    author: { "@type": "Organization", name: "Pintarware" },
    publisher: {
      "@type": "Organization",
      name: "Pintarware",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/pintarware.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
    image: metaImage ? [metaImage] : undefined,
  };

  return (
    <div className="pt-24 pb-20">
      <SEO
        title={titleForSeo}
        description={metaDescription}
        keywords={metaKeywords}
        path={`/blog/${slug}`}
        type="article"
        image={metaImage}
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
            <Calendar className="w-4 h-4" /> {post.date ?? ""}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-6">
            {post.title}
          </h1>

          <div
            className="prose prose-stone max-w-none prose-base prose-headings:font-display prose-img:rounded-xl prose-a:text-teal-700 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.body ?? "" }}
          />
    
        </motion.div>
      </article>
    </div>
  );
}
