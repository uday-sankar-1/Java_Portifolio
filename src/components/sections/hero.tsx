import { ArrowDown, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";
import { EventFlowLazy } from "@/components/diagram/event-flow-lazy";
import { HeroBackdrop } from "./hero-backdrop";
import { eventFlowContent, siteContent as site } from "@/lib/content";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative pt-14 pb-16 sm:pt-24">
      <HeroBackdrop />
      <div className="container-x">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted">
          <span className="relative flex size-2.5">
            <span
              className="absolute inset-0 animate-pulse-ring rounded-full bg-accent"
              aria-hidden
            />
            <span className="relative size-2.5 rounded-full bg-accent" />
          </span>
          {site.status}
        </div>

        <h1 id="hero-title" className="mt-6 max-w-5xl text-display font-semibold text-balance">
          <span className="block text-accent">
            <SplitText text={site.name} />
            <span className="sr-only">: </span>
          </span>
          <SplitText text={site.headline} delay={0.25} stagger={0.035} />
        </h1>

        <div>
          <p className="mt-6 max-w-2xl text-lead text-muted">
            4.7 years building high-availability platforms for regulated gaming: Java 17 / Spring
            Boot microservices, Kafka and RabbitMQ event-driven systems, and Angular / React
            frontends on AWS with Docker and Kubernetes.
          </p>
          <div
            className="mt-8 flex animate-rise flex-wrap items-center gap-3"
            style={{ animationDelay: "0.2s" }}
          >
            <Magnetic>
              <Button asChild size="lg">
                <a href="#work">
                  View Work <ArrowDown className="size-4" aria-hidden />
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="secondary">
                <a href={site.resume.href} download={site.resume.fileName}>
                  <Download className="size-4" aria-hidden /> Download Resume
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="ghost">
                <a href="#contact">
                  <Mail className="size-4" aria-hidden /> Contact
                </a>
              </Button>
            </Magnetic>
          </div>
        </div>

        <div className="mt-14">
          <Reveal delay={0.1}>
            <p className="mb-3 font-mono text-sm text-accent uppercase">Event-driven, in motion</p>
            <p className="mb-5 max-w-2xl text-muted">
              Watch a message travel from client to Kafka to consumer, then see what happens when
              processing fails.
            </p>
          </Reveal>
          <EventFlowLazy data={eventFlowContent} />
        </div>
      </div>
    </section>
  );
}
