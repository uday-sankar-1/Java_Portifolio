import { CalendarDays, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { GithubIcon, LinkedinIcon } from "@/lib/icons";
import { siteContent as site } from "@/lib/content";
import { ContactFormLazy } from "./contact-form-lazy";
import { PhoneReveal } from "./phone-reveal";

export function Contact() {
  const row =
    "flex items-center gap-3 rounded-xl border border-border px-4 py-3 transition-colors hover:border-accent hover:text-accent";
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk."
      intro={`${site.status}. Send a message, email me, or book a call.`}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <ContactFormLazy fallbackEmail={site.email} />
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="space-y-3">
            <li>
              <a className={row} href={`mailto:${site.email}`}>
                <Mail className="size-4 text-accent" aria-hidden /> {site.email}
              </a>
            </li>
            <li>
              <a
                className={row}
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon className="size-4 text-accent" /> LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            {site.links.github ? (
              <li>
                <a
                  className={row}
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="size-4 text-accent" /> GitHub
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ) : null}
            <li
              className={row.replace("transition-colors hover:border-accent hover:text-accent", "")}
            >
              <PhoneReveal encoded={site.phoneEncoded} />
            </li>
            {site.links.booking ? (
              <li className="pt-2">
                <Button asChild size="lg" className="w-full">
                  <a href={site.links.booking} target="_blank" rel="noopener noreferrer">
                    <CalendarDays className="size-4" aria-hidden /> Book a call
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
              </li>
            ) : null}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
