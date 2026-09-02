import { Phone } from "lucide-react";
import type { ReactNode } from "react";
import { SITE } from "@/lib/nexo-services/site";

type CallButtonProps = {
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
};

export function CallButton({
  children,
  className = "",
  showIcon = true,
}: CallButtonProps) {
  return (
    <a
      href={`tel:${SITE.phoneTel}`}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-none bg-charcoal px-5 text-sm font-medium tracking-wide text-warm transition-colors hover:bg-charcoal/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze ${className}`}
    >
      {showIcon ? <Phone className="size-4 shrink-0" aria-hidden /> : null}
      <span>{children}</span>
    </a>
  );
}
