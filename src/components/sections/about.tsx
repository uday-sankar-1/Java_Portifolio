import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { siteContent as site } from "@/lib/content";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="High-availability platforms, owned end to end.">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="space-y-5 text-lead text-muted">
            {site.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card p-6">
            {site.photo ? (
              <Image
                src={site.photo}
                alt={`Portrait of ${site.name}`}
                width={96}
                height={96}
                className="mb-5 size-24 rounded-2xl object-cover"
              />
            ) : null}
            <dl className="space-y-4">
              {site.aboutFacts.map((f) => (
                <div key={f.label}>
                  <dt className="font-mono text-xs tracking-wide text-muted uppercase">
                    {f.label}
                  </dt>
                  <dd className="mt-0.5 font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
