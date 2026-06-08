import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo/SEO";
import { getProjects } from "@/lib/cmsClient";

const cardSurfaces = [
  "bg-sticky-note-mint",
  "bg-cream-paper border border-forest-ink",
  "bg-sticky-note-teal",
];

export default function ProjectsPage() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const payload = await getProjects();
        if (cancelled) return;
        const data = payload?.data ?? {};
        setProjects(Array.isArray(data.projects) ? data.projects : []);
        setCategories(Array.isArray(data.categories) ? data.categories : []);
      } catch {
        if (cancelled) return;
        setProjects([]);
        setCategories([]);
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filters = useMemo(() => ["All", ...categories], [categories]);
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  useEffect(() => {
    if (!filters.includes(activeFilter)) setActiveFilter("All");
  }, [filters]);

  return (
    <div className="pb-20">
      <SEO
        title={t("projects.title")}
        description={t("projects.subtitle")}
        keywords="projects, portfolio, fullstack, web development"
        path="/projects"
      />

      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-display-sm text-3xl sm:text-4xl text-forest-ink mb-4">
            {t("projects.title")}
          </h1>
          <p className="text-forest-ink text-lg">{t("projects.subtitle")}</p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 font-roboto-mono ${
                activeFilter === f
                  ? "bg-sticky-note-mint text-forest-ink border border-forest-ink"
                  : "bg-cream-paper border border-pencil-gray text-forest-ink hover:border-forest-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-pencil-gray">Loading...</p>
        ) : filteredProjects.length === 0 ? (
          <p className="text-pencil-gray">{t("projects.empty")}</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-8">
            {filteredProjects.map((p, i) => (
              <motion.article
                key={p.id ?? p.slug ?? `${p.title}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`p-6 rounded-xl ${cardSurfaces[i % cardSurfaces.length]} flex flex-col`}
              >
                <h2 className="font-semibold text-xl text-forest-ink mb-2">
                  {p.title}
                </h2>
                <p className="text-forest-ink flex-1 mb-5">{p.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {(p.tags ?? []).slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-highlighter-yellow text-forest-ink font-roboto-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-forest-ink font-roboto-mono">
                    {p.category}
                  </span>
                  <div className="flex gap-2">
                    {p.demo && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={p.demo} target="_blank" rel="noopener noreferrer">
                          Live Demo <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {p.github && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={p.github} target="_blank" rel="noopener noreferrer">
                          Source <ArrowRight className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-forest-ink text-forest-ink hover:bg-whisper-gray transition-colors"
          >
            {t("projects.browseBlog")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
