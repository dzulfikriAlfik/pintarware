import { SITE_URL } from "@/config/site";

export const baseJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Pintarware",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/pintarware.png`,
      },
      description: "Platform edukasi programming—kursus online, blog, produk digital, dan mentoring. Belajar & tumbuh bersama.",
      sameAs: [
        "https://github.com/dzulfikriAlfik",
        "https://www.linkedin.com/in/dzulfikri-alkautsari-b5b892187/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Pintarware",
      description: "Platform edukasi untuk belajar programming—kursus online gratis & berbayar, blog, produk digital, dan mentoring.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "id-ID",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};
