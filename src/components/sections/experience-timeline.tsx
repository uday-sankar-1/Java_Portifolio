"use client";

import { m, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";

type Item = {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  bullets: string[];
  stack: string[];
};

/** Vertical timeline whose spine draws itself as you scroll (scaleY only). */
export function ExperienceTimeline({ items }: { items: Item[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <ol ref={ref} className="relative space-y-10 pl-8 sm:pl-12">
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-[7px] w-px bg-border sm:left-[11px]"
      />
      <m.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : draw, transformOrigin: "top" }}
        className="absolute top-2 bottom-2 left-[7px] w-px bg-accent sm:left-[11px]"
      />
      {items.map((it) => (
        <li key={it.id} className="relative">
          <span
            aria-hidden
            className="absolute top-1.5 -left-8 size-[15px] rounded-full border-2 border-accent bg-bg sm:-left-12 sm:size-[23px]"
          />
          <Reveal>
            <article className="card p-5 sm:p-7">
              <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{it.role}</h3>
                  <p className="text-accent">{it.company}</p>
                </div>
                <p className="font-mono text-sm text-muted">
                  {it.start} – {it.end} · {it.location}
                </p>
              </header>
              <p className="mt-3 text-muted">{it.summary}</p>
              <ul className="mt-4 space-y-2.5 text-[0.95rem] text-muted">
                {it.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
              <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
                {it.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
