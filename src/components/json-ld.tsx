import { sameAs, siteContent as site, skillsContent } from "@/lib/content";
import { siteUrl } from "@/lib/utils";

/** JSON-LD Person schema. Email and phone are intentionally left out to limit scraping. */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: siteUrl,
    address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
    worksFor: { "@type": "Organization", name: "Light & Wonder" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Prathyusha Engineering College" },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "AWS Certified Developer – Associate (DVA-C02)",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "AWS Certified DevOps Engineer – Professional (DOP-C02)",
      },
    ],
    knowsAbout: skillsContent.flatMap((g) => g.items.map((i) => i.name)),
    ...(sameAs.length ? { sameAs } : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
