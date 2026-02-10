import type { Section } from "@/lib/strapi";
import { RenderBlock } from "./blocks/RenderBlock";


export function SectionRenderer({ section }: { section: any }) {
  /*const blocks = [...(section.blocks ?? [])];

  return (
    <div style={{ padding: 8 }}>
      {blocks.map((b) => (
        <RenderBlock key={b.id} block={b} />
      ))}
    </div>
  );
  */

  
  return (
    <div style={{ padding: 8 }}>
      {section?.blocks?.map((block: any) => (
        <RenderBlock key={block.id} block={block} />
      ))}
    </div>
  );
}