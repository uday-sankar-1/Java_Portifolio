"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Decorative parallax glow + grid. Transform/opacity only; static under reduced motion. */
export function HeroBackdrop() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 140]);
  const y2 = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -90]);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[46rem] overflow-hidden"
    >
      <div className="bg-grid absolute inset-0" />
      <m.div
        style={{ y: y1 }}
        className="absolute -top-40 left-[8%] size-[26rem] rounded-full bg-accent opacity-[0.14] blur-[110px]"
      />
      <m.div
        style={{ y: y2 }}
        className="absolute top-20 right-[6%] size-[22rem] rounded-full bg-accent opacity-[0.08] blur-[120px]"
      />
    </div>
  );
}
