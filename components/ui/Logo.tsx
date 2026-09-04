import { SITE } from "@/lib/site";

type LogoProps = {
  className?: string;
  onDark?: boolean;
};

export function Logo({ className = "", onDark = false }: LogoProps) {
  return (
    <span
      className={`inline-flex items-baseline gap-2.5 ${
        onDark ? "text-cream" : "text-charcoal"
      } ${className}`}
    >
      <span className="font-sans text-[0.95rem] font-medium uppercase tracking-[0.14em] sm:text-[1.05rem] sm:tracking-[0.2em]">
        {SITE.name.replace("Projeto ", "")}
      </span>
      <span
        className={`font-sans text-xs uppercase tracking-[0.16em] ${
          onDark ? "text-gold" : "text-accent"
        }`}
      >
        Projeto
      </span>
    </span>
  );
}
