# Deploy: GitHub → Vercel → custom domain

## 1. Push to GitHub

1. Create an empty repository on GitHub (no README, no .gitignore), for example `portfolio`.
2. In the project folder:

```bash
git init -b main
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

3. Open the **Actions** tab. The `CI` workflow (format check, lint, typecheck, build) should go green.
   In **Settings → Branches** you can add a rule requiring the `verify` check before merging to `main`.

## 2. Connect Vercel

1. Go to <https://vercel.com/new> and **Import** the GitHub repository (install the Vercel GitHub app if asked).
2. Framework preset is detected as **Next.js**. Leave build settings as they are.
3. Add **Environment Variables** (Production, and Preview if you want the form to work there):

| Name                             | Value                                                           |
| -------------------------------- | --------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | Your final URL, e.g. `https://udaysankar.dev` (no trailing `/`) |
| `RESEND_API_KEY`                 | From <https://resend.com/api-keys>                              |
| `CONTACT_TO_EMAIL`               | `udaysankarobbu@gmail.com` (where messages are delivered)       |
| `CONTACT_FROM_EMAIL`             | `Portfolio <contact@your-domain.com>` (verified Resend domain)  |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional. From Cloudflare dashboard → Turnstile → add a widget  |
| `TURNSTILE_SECRET_KEY`           | Optional. The matching secret                                   |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`   | Optional. Only if you use Plausible                             |

4. Click **Deploy**.

**Preview deploys** are automatic: every branch and pull request gets its own URL, posted on the PR.
Until your domain is live, set `NEXT_PUBLIC_SITE_URL` to the `*.vercel.app` URL, then update it later.

**Resend sender**: until you verify a domain, use `CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>`.
Resend only delivers that sender to the email address on your Resend account, so use that address for
`CONTACT_TO_EMAIL` while testing. To use your own domain: Resend → Domains → Add domain → create the DNS records it shows.

**Turnstile**: add your domain (and `localhost` for dev) to the widget's hostnames. With both keys set, the
form shows the challenge and the API verifies tokens server-side.

**Analytics**: in Vercel → your project → **Analytics** → Enable. (Cookieless, no consent banner needed.)

## 3. Add a custom domain

1. Buy a domain (any registrar), or use one you own.
2. Vercel → your project → **Settings → Domains** → **Add** → enter `your-domain.com`.
3. Vercel shows the DNS records. Typical setup at your registrar:
   - Apex domain (`your-domain.com`): **A** record → `76.76.21.21`
   - `www`: **CNAME** → `cname.vercel-dns.com`

   (Use exactly the values Vercel displays, they can differ. Or switch nameservers to Vercel's.)

4. Wait for DNS to propagate (minutes to a few hours). Vercel issues the HTTPS certificate automatically.
5. Choose which hostname is primary (apex or `www`). Vercel redirects the other one to it.
6. Update `NEXT_PUBLIC_SITE_URL` to the final URL and **redeploy** (Deployments → ⋯ → Redeploy), so canonical
   URLs, the sitemap, JSON-LD and the OG image use the new domain.

## 4. After going live

- Visit `/sitemap.xml`, `/robots.txt` and `/opengraph-image`. Paste the URL into LinkedIn's Post Inspector
  (<https://www.linkedin.com/post-inspector/>) to refresh the link preview.
- Submit the sitemap in Google Search Console.
- Send yourself a test message through the contact form.
- Run Lighthouse on the production URL (Chrome DevTools → Lighthouse, mobile) and check Vercel Speed Insights/Analytics.
