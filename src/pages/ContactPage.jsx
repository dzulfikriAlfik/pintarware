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

const infoSurfaces = ["bg-sticky-note-mint", "bg-sticky-note-teal", "bg-cream-paper border border-forest-ink", "bg-sticky-note-blush"];

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
      <div className="pb-20 max-w-[1200px] mx-auto px-6">
        <p className="text-pencil-gray">Loading...</p>
      </div>
    );
  }

  const infoItems = [
    { icon: Mail, title: "Email", value: resolved.email, href: resolved.email ? `mailto:${resolved.email}` : null },
    { icon: MapPin, title: "Location", value: resolved.location, href: null },
    { icon: Clock, title: "Availability", value: resolved.availability, href: null },
    { icon: DollarSign, title: "Rate", value: resolved.rate, href: null },
  ];

  return (
    <div className="pb-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-display-sm text-3xl sm:text-4xl text-forest-ink mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-forest-ink text-lg">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {infoItems.map((item, i) => (
              <div key={item.title} className={`p-6 rounded-xl ${infoSurfaces[i % infoSurfaces.length]}`}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-highlighter-yellow text-forest-ink flex items-center justify-center">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-pencil-gray uppercase tracking-wider font-roboto-mono mb-1">
                      {item.title}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-forest-ink hover:underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-forest-ink">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="p-6 rounded-xl bg-cream-paper border border-forest-ink">
              <h4 className="font-semibold text-forest-ink text-sm mb-4">
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
                      className="flex items-center justify-between p-3 rounded-md hover:bg-whisper-gray transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className="w-4 h-4 text-forest-ink" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-forest-ink truncate">
                            {s.label ?? "Social"}
                          </p>
                          {s.username ? (
                            <p className="text-xs text-pencil-gray truncate font-roboto-mono">{s.username}</p>
                          ) : null}
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-forest-ink" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="p-8 rounded-xl bg-sticky-note-blush border border-forest-ink h-full">
              <h4 className="font-semibold text-forest-ink text-sm mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {t("contact.reasonsTitle")}
              </h4>
              <ul className="space-y-3">
                {resolved.collaboration_reasons.length > 0 ? (
                  resolved.collaboration_reasons.map((reason, i) => (
                    <li key={`${reason}-${i}`} className="text-forest-ink text-sm leading-relaxed">
                      {reason}
                    </li>
                  ))
                ) : (
                  <li className="text-pencil-gray text-sm">{t("contact.noReasons")}</li>
                )}
              </ul>

              <div className="mt-8">
                <Button variant="default" asChild>
                  <a href={resolved.email ? `mailto:${resolved.email}` : "#"} className="inline-flex items-center gap-2">
                    → {t("contact.emailCta")} <ArrowUpRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-forest-ink text-forest-ink hover:bg-whisper-gray transition-colors">
            {t("contact.backToBlog")}
          </Link>
        </div>
      </div>
    </div>
  );
}
