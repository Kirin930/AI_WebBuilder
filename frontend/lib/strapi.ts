// frontend/lib/strapi.ts
export type Block = { id: number; type: string; props: Record<string, any> };
export type Section = { id: number; name: string; order: number; blocks: Block[] };
export type Page = { id: number; title: string; slug: string; sections: Section[] };

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function normalizeType(t: string | undefined): string {
  if (!t) return "";
  // examples: "shared.hero" -> "hero", "shared.rich-text" -> "richText"
  const last = t.split(".").pop() ?? t;
  if (last === "rich-text") return "richText";
  return last;
}

const STRAPI_URL = mustEnv("STRAPI_URL");
const STRAPI_TOKEN = mustEnv("STRAPI_TOKEN");

async function strapiFetch<T>(path: string): Promise<T> {
  const url = `${STRAPI_URL}${path}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
    cache: "no-store", // dev-friendly; later we can switch to ISR
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Strapi fetch failed ${res.status} ${res.statusText} for ${url}: ${text}`);
  }
  return (await res.json()) as T;
}

/**
 * ⚠️ IMPORTANT:
 * Strapi often returns { data: [{ id, attributes: {...}}] }.
 * If your API returns a different shape (flattened), we can tweak mapPage().
 */
function mapPage(entity: any): Page {
  const a = entity?.attributes ?? entity; // supports both "attributes" and flattened
  const sectionsRaw = a?.sections?.data ?? a?.sections ?? [];
  const sections: Section[] = sectionsRaw.map((s: any) => {
    const sa = s?.attributes ?? s;
    const blocksRaw = sa?.blocks?.data ?? sa?.blocks ?? [];
    const blocks: Block[] = blocksRaw.map((b: any) => {
      const ba = b?.attributes ?? b;
      return {
        id: b.id ?? ba.id,
        type: ba.__component ?? "unknown",
        props: ba.props ?? ba,
      };
    });

    return {
      id: s.id ?? sa.id,
      name: sa.name ?? "",
      order: sa.order ?? 0,
      blocks,
    };
  });

  return {
    id: entity.id ?? a.id,
    title: a.title ?? "",
    slug: a.slug ?? "",
    sections,
  };
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const qs = new URLSearchParams();
  qs.set("filters[slug][$eq]", slug);

  // Populate deep enough: page -> sections -> blocks
  qs.set("populate[sections][populate]", "blocks");

  const json = await strapiFetch<{ data: any[] }>(`/api/pages?${qs.toString()}`);
  if (!json?.data?.length) return null;

  return mapPage(json.data[0]);
}