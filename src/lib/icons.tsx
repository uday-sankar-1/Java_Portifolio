import {
  Boxes,
  Check,
  Cloud,
  Code2,
  Cpu,
  Database,
  Gauge,
  Layers,
  Layout,
  Lock,
  Network,
  Radio,
  Server,
  ShieldCheck,
  Split,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  siAngular,
  siApachekafka,
  siApachemaven,
  siCss,
  siDocker,
  siGithub,
  siGithubactions,
  siGradle,
  siGraphql,
  siHibernate,
  siHtml5,
  siJavascript,
  siJenkins,
  siJest,
  siJsonwebtokens,
  siJunit5,
  siKubernetes,
  siMysql,
  siOpenjdk,
  siPostgresql,
  siRabbitmq,
  siReact,
  siReactivex,
  siRedis,
  siRedux,
  siSpring,
  siSpringboot,
  siSpringsecurity,
  siSwagger,
  siTerraform,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

const lucide: Record<string, LucideIcon> = {
  boxes: Boxes,
  check: Check,
  cloud: Cloud,
  code: Code2,
  cpu: Cpu,
  database: Database,
  gauge: Gauge,
  layers: Layers,
  layout: Layout,
  lock: Lock,
  network: Network,
  radio: Radio,
  server: Server,
  shield: ShieldCheck,
  split: Split,
  workflow: Workflow,
  zap: Zap,
};

const brand: Record<string, SimpleIcon> = {
  siAngular,
  siApachekafka,
  siApachemaven,
  siCss,
  siDocker,
  siGithubactions,
  siGradle,
  siGraphql,
  siHibernate,
  siHtml5,
  siJavascript,
  siJenkins,
  siJest,
  siJsonwebtokens,
  siJunit5,
  siKubernetes,
  siMysql,
  siOpenjdk,
  siPostgresql,
  siRabbitmq,
  siReact,
  siReactivex,
  siRedis,
  siRedux,
  siSpring,
  siSpringboot,
  siSpringsecurity,
  siSwagger,
  siTerraform,
  siTypescript,
};

/** Resolve an icon key from content/skills.json: "siXxx" = brand glyph, otherwise a Lucide icon. */
export function SkillIcon({ name, className }: { name: string; className?: string }) {
  const b = brand[name];
  if (b) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d={b.path} />
      </svg>
    );
  }
  const L = lucide[name] ?? Code2;
  return <L aria-hidden="true" className={className} />;
}

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d={siGithub.path} />
    </svg>
  );
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
