export function RichTextBlock({ text }: { text?: string }) {
  return (
    <div style={{ padding: 16, lineHeight: 1.6 }}>
      {text ?? ""}
    </div>
  );
}