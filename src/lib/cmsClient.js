const CMS_API_BASE_URL = import.meta.env.VITE_CMS_API_BASE_URL ?? '';

function buildUrl(path) {
  const trimmedBase = CMS_API_BASE_URL.replace(/\/+$/, '');
  if (trimmedBase) return `${trimmedBase}${path}`;
  return path;
}

async function cmsFetchJson(path) {
  const res = await fetch(buildUrl(path), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    // ignore non-JSON
  }

  if (!res.ok) {
    const message = payload?.error?.message ?? `CMS request failed (${res.status}).`;
    throw new Error(message);
  }

  return payload;
}

export async function getProjects() {
  return cmsFetchJson('/api/v1/projects');
}

export async function getBlogPosts(locale) {
  const loc = locale === 'id' ? 'id' : 'en';
  return cmsFetchJson(`/api/v1/blog-posts?locale=${encodeURIComponent(loc)}`);
}

export async function getBlogPost(slug, locale) {
  const loc = locale === 'id' ? 'id' : 'en';
  return cmsFetchJson(
    `/api/v1/blog-posts/${encodeURIComponent(slug)}?locale=${encodeURIComponent(loc)}`,
  );
}

export async function getContact() {
  return cmsFetchJson('/api/v1/contact');
}

