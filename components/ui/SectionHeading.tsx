type SectionHeadingProps = {
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({
  title,
  highlight,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const parts = highlight ? title.split(highlight) : [title];
  const isDark = tone === "dark";

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl min-w-0 text-center" : "max-w-3xl min-w-0"}>
      <h2
        className={`max-w-[22ch] font-display text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem] ${
          isDark ? "text-cream" : "text-charcoal"
        }`}
      >
        {highlight && parts.length === 2 ? (
          <>
            {parts[0]}
            <span className={isDark ? "text-gold" : "text-accent"}>{highlight}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {description ? (
        <p
          className={`mt-4 max-w-[65ch] text-base sm:text-lg ${
            isDark
              ? "leading-[1.7] tracking-[0.01em] text-cream"
              : "leading-relaxed text-charcoal/70"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
