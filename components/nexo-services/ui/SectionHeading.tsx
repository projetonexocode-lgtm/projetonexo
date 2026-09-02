type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
}: SectionHeadingProps) {
  const parts = highlight ? title.split(highlight) : [title];

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.28em] text-bronze">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
        {highlight && parts.length === 2 ? (
          <>
            {parts[0]}
            <span className="italic text-bronze">{highlight}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-charcoal/75 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
