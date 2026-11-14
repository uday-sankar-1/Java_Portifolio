import { siteContent as site } from "@/lib/content";
import { Header } from "./header";

const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <Header
      name={site.name}
      nav={nav}
      resumeHref={site.resume.href}
      resumeName={site.resume.fileName}
    />
  );
}
