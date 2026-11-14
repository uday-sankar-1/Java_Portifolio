import { z } from "zod";
import site from "@content/site.json";
import highlights from "@content/highlights.json";
import experience from "@content/experience.json";
import skills from "@content/skills.json";
import credentials from "@content/credentials.json";
import projects from "@content/projects.json";
import eventFlow from "@content/event-flow.json";

/**
 * All site content lives in /content/*.json. Each file is validated here with Zod,
 * so a typo fails the build instead of shipping a broken page.
 */
const siteSchema = z.object({
  name: z.string(),
  role: z.string(),
  headline: z.string(),
  description: z.string(),
  status: z.string(),
  location: z.string(),
  email: z.string().email(),
  phoneEncoded: z.string(),
  links: z.object({ linkedin: z.string(), github: z.string(), booking: z.string() }),
  photo: z.string(),
  resume: z.object({ href: z.string(), fileName: z.string() }),
  about: z.array(z.string()),
  aboutFacts: z.array(z.object({ label: z.string(), value: z.string() })),
});

const highlightSchema = z.array(
  z.object({
    id: z.string(),
    label: z.string(),
    value: z.number(),
    decimals: z.number().int(),
    suffix: z.string(),
    animate: z.boolean(),
    note: z.string(),
  }),
);

const experienceSchema = z.array(
  z.object({
    id: z.string(),
    role: z.string(),
    company: z.string(),
    location: z.string(),
    start: z.string(),
    end: z.string(),
    summary: z.string(),
    bullets: z.array(z.string()),
    stack: z.array(z.string()),
  }),
);

const skillsSchema = z.array(
  z.object({
    group: z.string(),
    icon: z.string(),
    items: z.array(z.object({ name: z.string(), icon: z.string() })),
  }),
);

const credentialsSchema = z.object({
  certifications: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      code: z.string(),
      issuer: z.string(),
      level: z.string(),
    }),
  ),
  achievements: z.array(z.object({ id: z.string(), title: z.string(), detail: z.string() })),
  education: z.object({
    degree: z.string(),
    institution: z.string(),
    university: z.string(),
    gpa: z.string(),
    gpaScale: z.string(),
  }),
});

const projectSchema = z.array(
  z.object({
    slug: z.string(),
    title: z.string(),
    subtitle: z.string(),
    badge: z.string(),
    summary: z.string(),
    problem: z.string(),
    approach: z.array(z.string()),
    architecture: z.string(),
    diagram: z.enum(["event-flow", "layers"]),
    layers: z.array(z.object({ name: z.string(), detail: z.string() })).optional(),
    stack: z.array(z.string()),
    outcome: z.array(z.string()),
  }),
);

const point = z.tuple([z.number(), z.number()]);
const flowStep = z.object({
  text: z.string(),
  route: z.array(point),
  branch: z.array(point).optional(),
  push: z.boolean().optional(),
  fail: z.boolean().optional(),
  retry: z.boolean().optional(),
  dead: z.boolean().optional(),
});
const eventFlowSchema = z.object({
  nodes: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      sub: z.string(),
      x: z.number(),
      y: z.number(),
      kind: z.enum(["client", "edge", "service", "broker", "data"]),
      desc: z.string(),
    }),
  ),
  edges: z.array(z.tuple([z.string(), z.string()])),
  flows: z.object({
    success: z.object({ label: z.string(), steps: z.array(flowStep) }),
    failure: z.object({ label: z.string(), steps: z.array(flowStep) }),
  }),
});

export const siteContent = siteSchema.parse(site);
export const highlightsContent = highlightSchema.parse(highlights);
export const experienceContent = experienceSchema.parse(experience);
export const skillsContent = skillsSchema.parse(skills);
export const credentialsContent = credentialsSchema.parse(credentials);
export const projectsContent = projectSchema.parse(projects);
export const eventFlowContent = eventFlowSchema.parse(eventFlow);

export type Project = (typeof projectsContent)[number];
export type EventFlow = typeof eventFlowContent;
export type FlowKey = keyof EventFlow["flows"];

export function getProject(slug: string) {
  return projectsContent.find((p) => p.slug === slug);
}

export const sameAs = [siteContent.links.linkedin, siteContent.links.github].filter(Boolean);
