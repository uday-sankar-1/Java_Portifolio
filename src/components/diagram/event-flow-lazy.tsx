"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView } from "motion/react";
import type { EventFlow } from "@/lib/content";

const Diagram = dynamic(() => import("./event-flow-diagram"), {
  ssr: false,
  loading: () => <Skeleton />,
});

function Skeleton() {
  return <div aria-hidden className="card h-[34rem] animate-pulse md:h-[36rem]" />;
}

/** Defers loading the animation bundle until the diagram is near the viewport. */
export function EventFlowLazy({ data }: { data: EventFlow }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: "400px" });
  return (
    <div ref={ref} className="min-h-[34rem] md:min-h-[36rem]">
      {near ? <Diagram data={data} /> : <Skeleton />}
    </div>
  );
}
