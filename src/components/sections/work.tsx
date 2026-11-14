import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { TransitionLink } from "@/components/layout/view-transition";
import { projectsContent } from "@/lib/content";

export function Work() {
  return (
    <Section
      id="work"
      eyebrow="Featured work"
      title="Two platforms, end to end."
      intro="Each case study covers the problem, approach, architecture, stack and outcome."
    >
      <ul className="grid gap-5 lg:grid-cols-2">
        {projectsContent.map((p, i) => (
          <li key={p.slug}>
            <Reveal delay={i * 0.1} className="h-full">
              <TransitionLink
                href={`/work/${p.slug}`}
                className="card group flex h-full flex-col p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent sm:p-8"
              >
                <span className="w-fit rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent">
                  {p.badge}
                </span>
                <h3 className="mt-5 text-2xl font-semibold">{p.title}</h3>
                <p className="mt-1 text-muted">{p.subtitle}</p>
                <p className="mt-4 flex-1 text-muted">{p.summary}</p>
                <ul aria-label="Stack" className="mt-6 flex flex-wrap gap-2">
                  {p.stack.slice(0, 6).map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1.5 font-medium text-accent">
                  Read case study
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </TransitionLink>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
