import { useEffect } from "react";
import { SITE_URL } from "@/config/site";

const DEFAULT_IMAGE = `${SITE_URL}/pintarware.png`;
const DEFAULT_TITLE = "Pintarware — Belajar & Tumbuh Bersama | Kursus, Blog, Mentoring";

function setMeta(name, content, attr = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaProperty(name, content) {
  setMeta(name, content, "property");
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function injectJsonLd(data) {
  const id = "pintarware-jsonld";
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);

  return () => {
    const el = document.getElementById(id);
    if (el) el.remove();
  };
}

/**
 * SEO component - updates document head via useEffect (no external deps, React 19 compatible)
 */
export function SEO({
  title,
  fullTitle,
  description,
  keywords,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
  jsonLd,
}) {
  const canonical = path ? `${SITE_URL}${path}` : SITE_URL + "/";
  const resolvedTitle = fullTitle || (title ? `${title} | Pintarware` : DEFAULT_TITLE);

  useEffect(() => {
    document.title = resolvedTitle;
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("robots", "index, follow");
    setMeta("author", "Pintarware");

    setMetaProperty("og:type", type);
    setMetaProperty("og:url", canonical);
    setMetaProperty("og:title", resolvedTitle);
    setMetaProperty("og:description", description);
    setMetaProperty("og:image", image);
    setMetaProperty("og:image:alt", "Pintarware - Platform Edukasi Programming");
    setMetaProperty("og:site_name", "Pintarware");
    setMetaProperty("og:locale", "id_ID");

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:url", canonical);
    setMeta("twitter:title", resolvedTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);

    setLink("canonical", canonical);

    const cleanupJsonLd = jsonLd ? injectJsonLd(jsonLd) : () => {};

    return () => {
      cleanupJsonLd();
    };
  }, [resolvedTitle, description, keywords, canonical, type, image, jsonLd]);

  return null;
}
