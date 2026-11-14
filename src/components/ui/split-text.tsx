type Props = { text: string; className?: string; delay?: number; stagger?: number };

/**
 * Word-by-word staggered entrance, done with pure CSS keyframes (transform + opacity) so the
 * text is server-rendered and paints without waiting for hydration (keeps LCP fast).
 */
export function SplitText({ text, className, delay = 0, stagger = 0.045 }: Props) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <span
            className="inline-block animate-word"
            style={{ animationDelay: `${delay + i * stagger}s` }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
