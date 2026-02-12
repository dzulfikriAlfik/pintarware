import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { SITE_URL } from "@/config/site";

const posts = {
  "tips-belajar-programming": {
    title: "5 Tips Belajar Programming tanpa Burnout",
    date: "12 Feb 2025",
    dateISO: "2025-02-12",
    content: "Belajar coding butuh konsistensi. Berikut cara tetap produktif tanpa kelelahan mental.",
    description: "Belajar coding butuh konsistensi. Simak 5 tips agar tetap produktif belajar programming tanpa kelelahan mental—dari praktisi untuk praktisi.",
  },
  "react-vs-vue-2025": {
    title: "React vs Vue di 2025: Pilih yang Mana?",
    date: "8 Feb 2025",
    dateISO: "2025-02-08",
    content: "Perbandingan kedua framework populer untuk memudahkan keputusan proyek Anda.",
    description: "Perbandingan React vs Vue di 2025—ekosistem, performa, kurva belajar. Bantu memilih framework yang tepat untuk proyek Anda.",
  },
  "api-design-laravel": {
    title: "API Design yang Rapi dengan Laravel",
    date: "1 Feb 2025",
    dateISO: "2025-02-01",
    content: "Best practices merancang REST API—struktur, versioning, dan error handling.",
    description: "Best practices merancang REST API dengan Laravel—struktur response, versioning, error handling, dan dokumentasi.",
  },
};

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = posts[slug];

  if (!post) {
    return (
      <div className="pt-24 pb-20 max-w-4xl mx-auto px-6">
        <SEO title="Artikel Tidak Ditemukan" description="Halaman yang Anda cari tidak ditemukan." path="/blog/404" />
        <p className="text-stone-600">Artikel tidak ditemukan.</p>
        <Link to="/blog" className="text-teal-600 hover:underline mt-4 inline-block">
          ← Kembali ke Blog
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
            <ArrowLeft className="w-4 h-4" /> Kembali ke Blog
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
              Konten lengkap akan ditambahkan segera. Halaman ini sebagai placeholder struktur blog detail.
            </p>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
