import { getPageBySlug } from "@/lib/strapi";
import { SectionRenderer } from "@/components/SectionRenderer";
import { notFound } from "next/navigation";

export default async function SlugPage({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);
  if (!page) return notFound();

  const sections = [...(page.sections ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <main>
      <div>Slug route is working. Slug = {params.slug}</div>

      {sections.map((s) => (
        <SectionRenderer key={s.id} section={s} />
      ))}
    </main>
  );
}