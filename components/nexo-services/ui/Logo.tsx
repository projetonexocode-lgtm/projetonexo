type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
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
        <rect x="0.5" y="0.5" width="27" height="27" stroke="#B08D4F" />
        <path d="M8 20V8h3.1L20 20h-3.15L11.2 11.4V20H8Z" fill="#B08D4F" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.22em] text-charcoal/70">
          Nexo
        </span>
        <span className="font-display text-xl tracking-wide text-charcoal sm:text-[1.35rem]">
          Services
        </span>
      </span>
    </span>
  );
}
