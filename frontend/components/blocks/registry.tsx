// frontend/components/blocks/registry.tsx
import type { Block } from "@/lib/strapi";
import { BlocksBlock } from "./BlocksBlock";
import { RichTextBlock } from "./RichTextBlock";
import { HeroBlock } from "./HeroBlock";
import { JSX } from "react";


type BlockComponent = (props: any) => JSX.Element;

const registry: Record<string, BlockComponent> = {
  richText: RichTextBlock,
  "shared.rich-text": RichTextBlock,
  "shared.richText": RichTextBlock,

  block: BlocksBlock,
  "shared.block": BlocksBlock,
  
  hero: HeroBlock,
  "shared.hero": HeroBlock,
  "blocks.hero": HeroBlock,
};

export function RenderBlock({ block }: { block: Block }) {
  const Comp = registry[block.type];

  if (!Comp) {
    return (
      <div style={{ border: "1px dashed #999", padding: 12, margin: "8px 0" }}>
        <strong>Unknown block type:</strong> {block.type}
        <pre style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>
          {JSON.stringify(block.props ?? {}, null, 2)}
        </pre>
      </div>
    );
  }

  return <Comp {...(block.props ?? {})} />;
}
