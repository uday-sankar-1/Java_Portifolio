import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventFlowLazy } from "@/components/diagram/event-flow-lazy";
import { Footer } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TransitionLink } from "@/components/layout/view-transition";
import { Reveal } from "@/components/ui/reveal";
import { eventFlowContent, getProject, projectsContent, siteContent as site } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return projectsContent.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title}: ${p.subtitle}`,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      title: `${p.title} | ${site.name}`,
      description: p.summary,
      url: `/work/${p.slug}`,
    },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="border-t border-border py-10">
        <h2 className="mb-5 font-mono text-sm tracking-wide text-accent uppercase">{title}</h2>
        {children}
      </section>
    </Reveal>
  );
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const idx = projectsContent.findIndex((p) => p.slug === project.slug);
  const next = projectsContent[(idx + 1) % projectsContent.length]!;

  return (
    <>
      <SiteHeader />
      <main id="main" className="pt-10 pb-20 sm:pt-16">
        <article className="container-x max-w-4xl">
          <TransitionLink
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
          >
            <ArrowLeft className="size-4" aria-hidden /> All work
          </TransitionLink>
          <header className="mt-8 mb-10">
            <span className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent">
              {project.badge}
            </span>
            <h1 className="mt-5 text-display font-semibold text-balance">{project.title}</h1>
            <p className="mt-3 text-lead text-muted">{project.subtitle}</p>
          </header>

          <Block title="Problem">
            <p className="text-lead">{project.problem}</p>
          </Block>
          <Block title="Approach">
            <ul className="space-y-3 text-lead text-muted">
              {project.approach.map((a) => (
                <li key={a} className="flex gap-3">
                  <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" />
                  {a}
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Architecture">
            <p className="mb-6 max-w-3xl text-lead text-muted">{project.architecture}</p>
            {project.diagram === "event-flow" ? (
              <EventFlowLazy data={eventFlowContent} />
            ) : (
              <ol className="space-y-2" aria-label="Architecture layers">
                {project.layers?.map((l, i) => (
                  <li key={l.name} className="card flex items-center gap-4 px-5 py-4">
                    <span className="grid size-7 place-items-center rounded-full bg-accent-soft font-mono text-sm text-accent">
                      {i + 1}
                    </span>
                    <span className="w-24 font-semibold">{l.name}</span>
                    <span className="text-muted">{l.detail}</span>
                  </li>
                ))}
              </ol>
            )}
          </Block>
          <Block title="Stack">
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border px-3 py-1.5 font-mono text-sm text-muted"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Outcome">
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.outcome.map((o) => (
                <li key={o} className="card p-5">
                  {o}
                </li>
              ))}
            </ul>
          </Block>

          <TransitionLink
            href={`/work/${next.slug}`}
            className="card group mt-6 flex items-center justify-between p-6 transition-colors hover:border-accent"
          >
            <span>
              <span className="block text-sm text-muted">Next case study</span>
              <span className="text-xl font-semibold">{next.title}</span>
            </span>
            <ArrowRight
              className="size-5 text-accent transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </TransitionLink>
        </article>
      </main>
      <Footer name={site.name} />
    </>
  );
}
