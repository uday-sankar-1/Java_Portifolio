"use client";

import { Loader2, Send } from "lucide-react";
import Script from "next/script";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { contactSchema } from "@/lib/contact-schema";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
declare global {
  interface Window {
    turnstile?: { reset: () => void };
  }
}

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverMsg, setServerMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = contactSchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
      company: fd.get("company") ?? "",
    });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Errors;
        next[k] ??= issue.message;
      }
      setErrors(next);
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          turnstileToken: fd.get("cf-turnstile-response") ?? undefined,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setServerMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
      window.turnstile?.reset();
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="card p-6">
        <p className="text-lg font-semibold">Message sent. Thank you!</p>
        <p className="mt-2 text-muted">I will reply to the email address you provided.</p>
        <Button variant="secondary" className="mt-4" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-fg placeholder:text-muted/70 focus:border-accent aria-[invalid=true]:border-danger";
  return (
    <form onSubmit={onSubmit} noValidate className="card space-y-5 p-6">
      {(["name", "email"] as const).map((n) => (
        <div key={n}>
          <label htmlFor={`${id}-${n}`} className="mb-1.5 block text-sm font-medium">
            {n === "name" ? "Name" : "Email"}
          </label>
          <input
            id={`${id}-${n}`}
            name={n}
            type={n === "email" ? "email" : "text"}
            autoComplete={n}
            aria-invalid={!!errors[n]}
            aria-describedby={errors[n] ? `${id}-${n}-err` : undefined}
            className={field}
            required
          />
          {errors[n] ? (
            <p id={`${id}-${n}-err`} className="mt-1.5 text-sm text-danger">
              {errors[n]}
            </p>
          ) : null}
        </div>
      ))}
      <div>
        <label htmlFor={`${id}-message`} className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${id}-message-err` : undefined}
          className={field}
          required
        />
        {errors.message ? (
          <p id={`${id}-message-err`} className="mt-1.5 text-sm text-danger">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {turnstileKey ? (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="lazyOnload"
          />
          <div className="cf-turnstile" data-sitekey={turnstileKey} data-theme="auto" />
        </>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
        <p role="status" aria-live="polite" className="text-sm text-danger">
          {status === "error" ? (
            <>
              {serverMsg} You can also email{" "}
              <a className="underline" href={`mailto:${fallbackEmail}`}>
                {fallbackEmail}
              </a>
              .
            </>
          ) : null}
        </p>
      </div>
    </form>
  );
}
