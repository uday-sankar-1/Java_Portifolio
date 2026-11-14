import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { highlightsContent } from "@/lib/content";
import { cn } from "@/lib/utils";

const span: Record<string, string> = {
  experience: "col-span-2 md:col-span-3",
  patent: "col-span-2 md:col-span-3",
  aws: "col-span-1 md:col-span-2",
  gpa: "col-span-1 md:col-span-2",
  hits: "col-span-2 md:col-span-2",
};

export function Highlights() {
  return (
    <section aria-label="Highlights" className="pb-8">
      <div className="container-x">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
          {highlightsContent.map((h, i) => (
            <li key={h.id} className={span[h.id]}>
              <Reveal delay={i * 0.06} className="h-full">
                <div
                  className={cn(
                    "card group h-full p-5 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent sm:p-6",
                    (h.id === "experience" || h.id === "patent") && "md:min-h-44",
                  )}
                >
                  <p className="text-4xl font-semibold tracking-tight text-fg sm:text-6xl">
                    <Counter
                      value={h.value}
                      decimals={h.decimals}
                      suffix={h.suffix}
                      animated={h.animate}
                    />
                  </p>
                  <p className="mt-3 font-medium text-accent">{h.label}</p>
                  <p className="mt-1 text-sm text-muted">{h.note}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
