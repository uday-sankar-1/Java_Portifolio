import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

const bodySchema = contactSchema.extend({ turnstileToken: z.string().optional() });

// Best-effort per-instance rate limit (serverless instances are ephemeral; Turnstile is the real gate).
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile not configured: the honeypot is the only bot check.
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const json = (await res.json()) as { success?: boolean };
  return !!json.success;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip))
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 },
    );

  const raw = await req.text();
  if (raw.length > 10_000)
    return NextResponse.json({ error: "Message too large." }, { status: 413 });

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json({ error: "Please check the form fields." }, { status: 422 });

  const { name, email, message, company, turnstileToken } = parsed.data;
  if (company) return NextResponse.json({ ok: true }); // honeypot tripped: pretend success

  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ error: "Bot check failed. Please try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to)
    return NextResponse.json({ error: "The contact form is not configured yet." }, { status: 503 });

  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `Portfolio message from ${name.replace(/[\r\n]/g, " ")}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
  if (error)
    return NextResponse.json({ error: "Could not send your message right now." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
