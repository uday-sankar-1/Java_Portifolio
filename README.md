# Uday Sankar Obbu: portfolio

Personal portfolio for a Java Full Stack Developer (microservices, distributed systems, cloud).
Built with **Next.js 15 (App Router, Server Components)**, **TypeScript (strict)**, **Tailwind CSS v4**,
**Motion**, **Lenis**, **Radix UI**, **Zod** and **Resend**.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in values you need (all optional for local dev)
npm run dev                  # http://localhost:3000
```

Requires Node 20.9+ (Node 22 recommended).

| Script                 | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Dev server                                    |
| `npm run build`        | Production build (also validates all content) |
| `npm run lint`         | ESLint (Next.js core-web-vitals + TypeScript) |
| `npm run typecheck`    | `tsc --noEmit`                                |
| `npm run format`       | Prettier (with Tailwind class sorting)        |
| `npm run format:check` | Prettier check (used in CI)                   |

Husky runs `lint-staged` (Prettier + ESLint on staged files) on every commit. CI
(`.github/workflows/ci.yml`) runs format check, lint, typecheck and build on every push and PR.

## Editing content (no component changes needed)

Everything lives in [`/content`](./content) as JSON. It is validated with Zod in
[`src/lib/content.ts`](./src/lib/content.ts), so a typo fails `npm run build` with a clear error
instead of shipping a broken page.

| File               | Controls                                                                      |
| ------------------ | ----------------------------------------------------------------------------- |
| `site.json`        | Name, headline, status badge, about text, email, links, photo, resume path    |
| `highlights.json`  | The animated counters / bento tiles                                           |
| `experience.json`  | Timeline entries                                                              |
| `projects.json`    | Case studies (problem, approach, architecture, stack, outcome)                |
| `skills.json`      | Skill groups and chips. `icon`: `siXxx` = brand glyph, otherwise a Lucide key |
| `credentials.json` | Certifications, achievements, education                                       |
| `event-flow.json`  | Nodes, edges and steps of the interactive architecture diagram                |

Useful details:

- **GitHub / Cal.com**: `site.links.github` and `site.links.booking` are empty. The buttons stay hidden
  until you add a URL (for example `https://cal.com/your-handle`).
- **Profile photo**: put an image in `/public`, then set `site.photo` to `"/your-photo.jpg"`.
- **Phone number**: stored base64-encoded in `site.phoneEncoded` and only decoded after a click. To
  change it: `printf '%s' '+91 XXXXXXXXXX' | base64`.
- **New skill icon**: add the `siXxx` export to the map in [`src/lib/icons.tsx`](./src/lib/icons.tsx)
  (names come from the `simple-icons` package), or use a Lucide key already listed there.
- **Resume**: replace `public/Uday-Sankar-Obbu-Resume.pdf` (keep the filename or update `site.resume`).
- **Architecture diagram**: edit `event-flow.json`. Coordinates use the 850×310 viewBox in
  `src/components/diagram/event-flow-diagram.tsx`. Each step's `route` is a list of `[x, y]` points.

## Project structure

```
content/                 Typed JSON content (edit this)
public/                  Static files (resume PDF, images)
src/app/                 Routes: /, /work/[slug], /api/contact, sitemap, robots, OG image, icon
src/components/ui/       Reusable primitives (Button, Section, Reveal, SplitText, Counter, Magnetic)
src/components/layout/   Header, footer, theme toggle, cursor, Lenis, view-transition link, providers
src/components/sections/ One file per page section
src/components/diagram/  Interactive event-driven architecture diagram (lazy-loaded)
src/lib/                 Content loader + Zod schemas, contact schema, icon map, utils
```

## Design and motion notes

- **Tokens**: CSS variables in `src/app/globals.css` (`--bg`, `--fg`, `--accent`, ...) mapped into Tailwind v4's
  `@theme`. Dark is the default; the toggle adds a `.light` class. Change `--accent` to restyle the site.
- **Type**: Geist Sans and Geist Mono (self-hosted via the `geist` package and `next/font`) with a fluid type scale.
- **Motion** only animates `transform` and `opacity`. Scroll reveals use one shared IntersectionObserver
  and CSS transitions, the diagram and timeline use Motion (loaded lazily via `LazyMotion`).
- **Reduced motion**: Lenis and the custom cursor are not mounted, reveals and entrances are instant,
  View Transitions are skipped, and the diagram becomes a clickable step-by-step explainer.
- **Desktop only**: custom cursor and magnetic buttons require `(hover: hover) and (pointer: fine)`.
- **Mobile**: the SVG diagram is replaced by the numbered step list (which still highlights as it plays).
- **Page transitions**: `TransitionLink` wraps navigation in `document.startViewTransition` when supported.

## Contact form

`POST /api/contact` validates with the same Zod schema as the client, checks a hidden honeypot field,
optionally verifies a Cloudflare Turnstile token, applies a small per-instance rate limit, then sends
the email with Resend. Without `RESEND_API_KEY` it returns 503 and the form shows a `mailto:` fallback.

## Security, SEO, analytics

- Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) in `next.config.ts`.
  The CSP allows inline scripts because `next-themes` injects a tiny theme script. Secrets live only in
  environment variables, never in the repo.
- Metadata API, dynamic OG image (`/opengraph-image`), `sitemap.xml`, `robots.txt` and JSON-LD `Person`.
  The JSON-LD intentionally leaves out email and phone.
- Analytics: Vercel Web Analytics (cookieless). Optionally Plausible via `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.

## Deployment

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md). Personalization checklist: [docs/PERSONALIZATION.md](./docs/PERSONALIZATION.md).
