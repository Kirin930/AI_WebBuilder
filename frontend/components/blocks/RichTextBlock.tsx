export function RichTextBlock({ text, body }: { text?: string; body?: string }) {
  const value = text ?? body ?? "";

  return (
    <div style={{ padding: 16, lineHeight: 1.6 }}>
      {value}
    </div>
  );
}
