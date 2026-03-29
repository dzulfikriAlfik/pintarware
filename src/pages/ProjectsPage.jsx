import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo/SEO";
import { getProjects } from "@/lib/cmsClient";

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
    <div className="pt-24 pb-20">
      <SEO
        title={t("projects.title")}
        description={t("projects.subtitle")}
        keywords="projects, portfolio, fullstack, web development"
        path="/projects"
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            {t("projects.title")}
          </h1>
          <p className="text-stone-600 text-lg">{t("projects.subtitle")}</p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === f
                  ? "bg-teal-600 text-white"
                  : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-stone-600">Loading...</p>
        ) : filteredProjects.length === 0 ? (
          <p className="text-stone-600">{t("projects.empty")}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p, i) => (
              <motion.article
                key={p.id ?? p.slug ?? `${p.title}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-teal-300/50 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 flex flex-col"
              >
                <div
                  className={`h-12 rounded-xl bg-linear-to-br ${
                    p.color ?? "from-teal-500/10 to-teal-600/5"
                  } mb-5`}
                />

                <h2 className="font-display font-semibold text-xl text-stone-900 mb-2">
                  {p.title}
                </h2>
                <p className="text-stone-600 flex-1 mb-5">{p.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {(p.tags ?? []).slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-teal-700">
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

        {/* Optional breadcrumb-like CTA */}
        <div className="mt-12 text-center text-stone-500">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 transition-colors"
          >
            {t("projects.browseBlog")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

