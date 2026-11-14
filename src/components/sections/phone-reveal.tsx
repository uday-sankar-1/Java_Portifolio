"use client";

import { Eye, Phone } from "lucide-react";
import { useState } from "react";

/**
 * The number ships base64-encoded and is only decoded after a click, so simple
 * scrapers reading the HTML or JSON never see it in plain text.
 */
export function PhoneReveal({ encoded }: { encoded: string }) {
  const [phone, setPhone] = useState<string | null>(null);
  if (phone) {
    return (
      <a
        href={`tel:${phone.replace(/\s/g, "")}`}
        className="inline-flex items-center gap-3 hover:text-accent"
      >
        <Phone className="size-4 text-accent" aria-hidden /> {phone}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPhone(atob(encoded))}
      className="inline-flex items-center gap-3 text-left hover:text-accent"
    >
      <Eye className="size-4 text-accent" aria-hidden /> Reveal phone number
    </button>
  );
}
