import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SkillIcon } from "@/lib/icons";
import { skillsContent } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="The toolkit."
      intro="Grouped by the layer of the system where I use them."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {skillsContent.map((g, i) => (
          <Reveal
            key={g.group}
            delay={(i % 3) * 0.07}
            className={cn("lg:col-span-2", g.items.length > 9 && "lg:col-span-4")}
          >
            <section aria-labelledby={`skill-${i}`} className="card h-full p-5 sm:p-6">
              <h3 id={`skill-${i}`} className="mb-4 flex items-center gap-2.5 font-semibold">
                <span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-accent">
                  <SkillIcon name={g.icon} className="size-4" />
                </span>
                {g.group}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s.name}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-bg/40 px-3 py-1.5 text-sm text-muted transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-fg"
                  >
                    <SkillIcon name={s.icon} className="size-3.5 text-accent" />
                    {s.name}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
