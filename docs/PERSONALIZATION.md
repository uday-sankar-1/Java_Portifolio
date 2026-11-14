# Personalization checklist

Tick these off before sharing the site.

## Required

- [ ] **GitHub link**: set `links.github` in `content/site.json` (the button appears once it is set).
- [ ] **Cal.com booking link**: create a free event type at <https://cal.com>, then set `links.booking`
      (for example `https://cal.com/your-handle/intro`). The "Book a call" button appears once it is set.
- [ ] **Resume PDF**: confirm `public/Uday-Sankar-Obbu-Resume.pdf` is the version you want to share.
      (It is a copy of the file you supplied.) Replace it whenever your resume changes.
- [ ] **Custom domain**: follow `docs/DEPLOYMENT.md` and set `NEXT_PUBLIC_SITE_URL`.
- [ ] **Contact form**: set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` in Vercel and send a test.
- [ ] **Turnstile (recommended)**: add both Turnstile keys to cut spam beyond the honeypot.

## Strongly recommended

- [ ] **Profile photo**: add a square image (at least 400×400) to `/public`, set `photo` in `site.json`.
      It appears in the About card.
- [ ] **Project screenshots or diagrams**: the case studies currently use the interactive architecture diagram
      (DMX) and a layered list (iVIEW). If your employer allows it, export sanitized architecture diagrams or UI
      screenshots to `/public/work/` and show them in `src/app/work/[slug]/page.tsx` with `next/image`.
      Do not publish confidential material from Light & Wonder.
- [ ] **Review case study wording**: the _problem_ and _outcome_ sentences are written from the bullets on your
      resume and do not contain invented metrics. If you can share real numbers (latency, throughput, adoption)
      and they are cleared for publication, add them to `content/projects.json`.
- [ ] **Verify the architecture diagram**: it is labelled "simplified, illustrative". Adjust nodes and steps in
      `content/event-flow.json` so it matches what you are comfortable describing publicly.
- [ ] **LinkedIn URL**: confirm `https://www.linkedin.com/in/udaysankarobbu` is correct (taken from your resume).

## Optional

- [ ] **Accent colour**: change `--accent` (dark) and `--accent` under `:root.light` in `src/app/globals.css`.
      Keep text/background contrast at 4.5:1 or better.
- [ ] **Favicon**: replace `src/app/icon.svg`.
- [ ] **Open Graph image**: edit `src/app/opengraph-image.tsx`.
- [ ] **Phone number**: change `phoneEncoded` (see README) or delete the `PhoneReveal` line in
      `src/components/sections/contact.tsx` if you no longer want it listed.
- [ ] **Status badge**: when your notice period ends, update `status` in `site.json`, the hero badge and
      Open Graph image read it from there.
