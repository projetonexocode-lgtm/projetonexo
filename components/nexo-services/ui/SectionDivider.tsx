export function SectionDivider() {
  return (
    <div className="flex items-center gap-3 px-5 sm:px-8 lg:px-12" aria-hidden>
      <span className="h-px flex-1 bg-bronze/35" />
      <span className="size-1.5 rotate-45 bg-gold" />
      <span className="h-px flex-1 bg-bronze/35" />
    </div>
  );
}
