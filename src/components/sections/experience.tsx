import { Section } from "@/components/ui/section";
import { experienceContent } from "@/lib/content";
import { ExperienceTimeline } from "./experience-timeline";

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I have shipped.">
      <ExperienceTimeline items={experienceContent} />
    </Section>
  );
}
