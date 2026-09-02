type PlaceholderNoteProps = {
  children: string;
  className?: string;
};

export function PlaceholderNote({ children, className = "" }: PlaceholderNoteProps) {
  return (
    <p
      className={`text-[0.62rem] font-medium uppercase tracking-[0.14em] text-bronze ${className}`}
    >
      {children}
    </p>
  );
}
