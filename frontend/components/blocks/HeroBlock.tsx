export function HeroBlock({
  title,
  subtitle,
  ctaText,
  ctaHref,
}: {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}) {
  return (
    <section style={{ padding: 32 }}>
      <h1 style={{ fontSize: 44, margin: 0 }}>{title ?? ""}</h1>
      {subtitle ? <p style={{ fontSize: 18, marginTop: 12 }}>{subtitle}</p> : null}
      {ctaText && ctaHref ? (
        <a href={ctaHref} style={{ display: "inline-block", marginTop: 16 }}>
          {ctaText}
        </a>
      ) : null}
    </section>
  );
}