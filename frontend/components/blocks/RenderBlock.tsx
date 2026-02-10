// components/RenderBlock.tsx
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export function RenderBlock({ block }: { block: any }) {
  // Rich text block (matches your payload: { id, Text: [...] })
  if (Array.isArray(block?.Text)) {
    return (
      <div className="prose max-w-none">
        <BlocksRenderer content={block.Text} />
      </div>
    );
  }

  // Add more block types here (Image, Hero, CTA, etc.)
  return (
    <div style={{ border: "1px dashed #999", padding: 12, margin: "8px 0" }}>
      <strong>Unknown block type:</strong>
      <pre style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>
        {JSON.stringify(block, null, 2)}
      </pre>
    </div>
  );
}