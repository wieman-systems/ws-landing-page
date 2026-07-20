# Wieman Systems — agency landing page

The marketing storefront for Wieman Systems, live at
[www.wiemansystems.com](https://www.wiemansystems.com).

- **Stack:** Next.js (App Router) + TypeScript, GSAP for motion, `simple-icons`.
  Fonts: Space Grotesk / Space Mono.
- **Contact form:** `POST /api/contact` relays a lead to Caleb via Resend
  (origin-pinned + rate-limited). Requires `RESEND_API_KEY` and `CONTACT_FROM`
  in the Vercel project env; missing config fails loud (500), never silent.
- **Security:** strict CSP + security headers in `vercel.json`; SPF/DKIM/DMARC on
  the sending domain. See `SECURITY.md` and `public/.well-known/security.txt`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Deploy

Push to `main` → Vercel (Wieman Systems team) auto-deploys production.
