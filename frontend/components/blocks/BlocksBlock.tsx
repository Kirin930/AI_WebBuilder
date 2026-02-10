import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export function BlocksBlock({ content, Text }: { content?: any; Text?: any }) {
  const blocks = content ?? Text;

  if (!Array.isArray(blocks)) return null;

  return (
    <div className="prose max-w-none">
      <BlocksRenderer content={blocks} />
    </div>
  );
}
