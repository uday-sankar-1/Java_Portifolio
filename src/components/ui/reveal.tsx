import type { CSSProperties, ReactNode } from "react";

type Props = { children: ReactNode; delay?: number; className?: string; y?: number };

/**
 * Scroll-triggered fade/slide. Pure markup: the styles live in globals.css and a single shared
 * IntersectionObserver (RevealController) flips `data-shown`. Only opacity + transform animate,
 * and no per-element JS has to hydrate.
 */
export function Reveal({ children, delay = 0, className, y = 18 }: Props) {
  return (
    <div
      data-reveal
      className={className}
      style={{ "--rd": `${delay}s`, "--ry": `${y}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}
