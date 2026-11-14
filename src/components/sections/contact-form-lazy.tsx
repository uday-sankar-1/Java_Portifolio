"use client";

import dynamic from "next/dynamic";
import { useInView } from "motion/react";
import { useRef } from "react";

const ContactForm = dynamic(() => import("./contact-form").then((m) => m.ContactForm), {
  ssr: false,
  loading: () => <Placeholder />,
});

function Placeholder() {
  return <div aria-hidden className="card h-[34rem] animate-pulse" />;
}

/** The form (and its validation library) loads only when the contact section nears the viewport. */
export function ContactFormLazy({ fallbackEmail }: { fallbackEmail: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: "600px" });
  return (
    <div ref={ref} className="min-h-[34rem]">
      {near ? <ContactForm fallbackEmail={fallbackEmail} /> : <Placeholder />}
    </div>
  );
}
