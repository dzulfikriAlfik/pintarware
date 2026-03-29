import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  DollarSign,
  Globe,
  Github,
  Mail,
  MapPin,
  Linkedin,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/cmsClient";

function getSocialIcon(social) {
  const label = (social?.label ?? "").toLowerCase();
  const href = (social?.href ?? "").toLowerCase();

  if (href.includes("github") || label.includes("github")) return Github;
  if (href.includes("linkedin") || label.includes("linkedin")) return Linkedin;
  if (href.includes("discord") || label.includes("discord")) return MessageSquare;
  return Globe;
}

export default function ContactPage() {
  const { t } = useTranslation();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const payload = await getContact();
        if (cancelled) return;
        setContact(payload?.data ?? null);
      } catch {
        if (cancelled) return;
        setContact(null);
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

  const resolved = useMemo(() => {
    const c = contact ?? {};
    return {
      email: c.email ?? "",
      location: c.location ?? "",
      availability: c.availability ?? "",
      rate: c.rate ?? "",
      social_links: Array.isArray(c.social_links) ? c.social_links : [],
      collaboration_reasons: Array.isArray(c.collaboration_reasons)
        ? c.collaboration_reasons
        : [],
    };
  }, [contact]);

  if (loading) {
    return (
      <div className="pt-24 pb-20 max-w-6xl mx-auto px-6">
        <p className="text-stone-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-stone-600 text-lg">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: resolved.email,
                  href: resolved.email ? `mailto:${resolved.email}` : null,
                },
                {
                  icon: MapPin,
                  title: "Location",
                  value: resolved.location,
                  href: null,
                },
                {
                  icon: Clock,
                  title: "Availability",
                  value: resolved.availability,
                  href: null,
                },
                {
                  icon: DollarSign,
                  title: "Rate",
                  value: resolved.rate,
                  href: null,
                },
              ].map((item) => (
                <div key={item.title} className="p-6 bg-white border border-stone-200 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 uppercase tracking-wider font-medium mb-1">
                        {item.title}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium text-stone-900 hover:text-teal-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-stone-900">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white border border-stone-200 rounded-2xl">
              <h4 className="font-display font-semibold text-stone-900 text-sm mb-4">
                {t("contact.socialTitle")}
              </h4>
              <div className="space-y-3">
                {resolved.social_links.map((s) => {
                  const Icon = getSocialIcon(s);
                  return (
                    <a
                      key={s.href ?? s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className="w-4 h-4 text-stone-500" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-stone-900 truncate">
                            {s.label ?? "Social"}
                          </p>
                          {s.username ? (
                            <p className="text-xs text-stone-500 truncate">{s.username}</p>
                          ) : null}
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-teal-600" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="p-6 bg-stone-900 text-white border border-stone-800 rounded-2xl">
              <h4 className="font-display font-semibold text-white text-sm mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-200" />
                {t("contact.reasonsTitle")}
              </h4>
              <ul className="space-y-3">
                {resolved.collaboration_reasons.length > 0 ? (
                  resolved.collaboration_reasons.map((reason, i) => (
                    <li key={`${reason}-${i}`} className="text-white/80 text-sm leading-relaxed">
                      {reason}
                    </li>
                  ))
                ) : (
                  <li className="text-white/60 text-sm">{t("contact.noReasons")}</li>
                )}
              </ul>

              <div className="mt-8">
                <Button variant="outline" asChild>
                  <a href={resolved.email ? `mailto:${resolved.email}` : "#"} className="inline-flex items-center gap-2">
                    {t("contact.emailCta")} <ArrowUpRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb-like CTA back to blog */}
        <div className="mt-12 text-center text-stone-500">
          <Link to="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 transition-colors">
            {t("contact.backToBlog")}
          </Link>
        </div>
      </div>
    </div>
  );
}

