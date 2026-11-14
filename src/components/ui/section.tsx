import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("py-20 sm:py-28", className)}>
      <div className="container-x">
        <Reveal>
          <p className="mb-3 font-mono text-sm tracking-wide text-accent uppercase">{eyebrow}</p>
          <h2 id={`${id}-title`} className="max-w-3xl text-h2 font-semibold text-balance">
            {title}
          </h2>
          {intro ? <p className="mt-4 max-w-2xl text-lead text-muted">{intro}</p> : null}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
