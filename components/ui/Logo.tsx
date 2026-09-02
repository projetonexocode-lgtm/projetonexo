import { SITE } from "@/lib/site";

type LogoProps = {
  className?: string;
  onDark?: boolean;
};

export function Logo({ className = "", onDark = false }: LogoProps) {
  const mark = onDark ? "#D4A05A" : "#6D461B";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <rect x="0.5" y="0.5" width="27" height="27" stroke={mark} />
        <path
          d="M8 20V8h3.1L20 20h-3.15L11.2 11.4V20H8Z"
          fill={mark}
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[0.62rem] uppercase tracking-[0.22em] ${
            onDark ? "text-cream/70" : "text-charcoal/70"
          }`}
        >
          Projeto
        </span>
        <span
          className={`font-display text-xl sm:text-[1.35rem] ${
            onDark ? "text-cream" : "text-charcoal"
          }`}
        >
          {SITE.name.replace("Projeto ", "")}
        </span>
      </span>
    </span>
  );
}
