import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/site";

type WhatsAppButtonProps = {
  serviceLabel: string;
  children: ReactNode;
  variant?: "dark" | "cream";
  className?: string;
  showIcon?: boolean;
  compact?: boolean;
};

const VARIANTS: Record<
  NonNullable<WhatsAppButtonProps["variant"]>,
  { classes: string; punch: string }
> = {
  dark: {
    classes: "bg-charcoal text-cream hover:bg-bronze",
    punch: "var(--color-charcoal)",
  },
  cream: {
    classes: "bg-cream text-charcoal hover:bg-gold",
    punch: "var(--color-cream)",
  },
};

export function WhatsAppButton({
  serviceLabel,
  children,
  variant = "dark",
  className = "",
  showIcon = true,
  compact = false,
}: WhatsAppButtonProps) {
  const { classes, punch } = VARIANTS[variant];

  return (
    <a
      href={buildWhatsAppUrl(serviceLabel)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full text-sm tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze ${
        compact ? "min-w-12 px-0" : "px-6"
      } ${classes} ${className}`}
    >
      {showIcon ? (
        <WhatsAppIcon punchColor={punch} className="size-4 shrink-0" />
      ) : null}
      {compact ? <span className="sr-only">{children}</span> : <span>{children}</span>}
    </a>
  );
}
