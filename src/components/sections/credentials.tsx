import { Award, GraduationCap, Medal, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { credentialsContent as c } from "@/lib/content";

export function Credentials() {
  return (
    <Section id="credentials" eyebrow="Credentials" title="Certified, recognised, educated.">
      <div className="grid gap-4 md:grid-cols-2">
        {c.certifications.map((cert, i) => (
          <Reveal key={cert.id} delay={i * 0.08}>
            <article className="card relative h-full overflow-hidden p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent">
              <div className="flex items-start gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent ring-1 ring-accent/30">
                  <ShieldCheck className="size-7" aria-hidden />
                </span>
                <div>
                  <p className="font-mono text-xs tracking-wide text-muted uppercase">
                    {cert.issuer}
                  </p>
                  <h3 className="mt-1 text-lg leading-snug font-semibold">{cert.title}</h3>
                  <p className="mt-3 flex flex-wrap gap-2 text-sm">
                    <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-accent-fg">
                      {cert.code}
                    </span>
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-muted">
                      {cert.level}
                    </span>
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
        {c.achievements.map((a, i) => (
          <Reveal key={a.id} delay={0.16 + i * 0.08}>
            <article className="card flex h-full items-center gap-4 p-6">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                {a.id === "patent" ? (
                  <Award className="size-6" aria-hidden />
                ) : (
                  <Medal className="size-6" aria-hidden />
                )}
              </span>
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-muted">{a.detail}</p>
              </div>
            </article>
          </Reveal>
        ))}
        <Reveal delay={0.3} className="md:col-span-2">
          <article className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                <GraduationCap className="size-6" aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold">{c.education.degree}</h3>
                <p className="text-sm text-muted">
                  {c.education.institution} · {c.education.university}
                </p>
              </div>
            </div>
            <p className="font-mono text-lg">
              GPA <span className="text-accent">{c.education.gpa}</span>/{c.education.gpaScale}
            </p>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
