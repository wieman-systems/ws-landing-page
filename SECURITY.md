# Security Policy — Wieman Systems

This repository hosts the marketing website for Wieman Systems LLC
(wiemansystems.com), a static/SSG site with a single serverless contact endpoint.

## Reporting a vulnerability

Email **caleb@wiemansystems.com** with details and steps to reproduce. Please do
not open public issues for security reports. We aim to acknowledge within 72 hours.

A machine-readable contact is published at
`/.well-known/security.txt`.

## Posture

- **Transport & headers:** HSTS, a strict Content-Security-Policy, `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and a locked `Permissions-Policy`
  are set in `vercel.json`. CORS is scoped to the site's own origin — never `*`.
- **Secrets:** any API keys (e.g. the contact-form mailer) live only in the host
  environment (Vercel env vars), never in the repo. `.env*` is gitignored.
- **Surface:** the only dynamic endpoint is `POST /api/contact`; it validates
  input, escapes output, and uses a honeypot to deter bots. It does not read or
  expose data — it only relays a message to our own inbox.

## Scope

This policy covers www.wiemansystems.com. Other Wieman Systems properties on their
own subdomains carry their own security.txt at that subdomain.

## Known limitations

**The contact-form rate limiter is not a real spend control.**
`app/api/contact/route.ts` throttles 5 sends / 10 min / IP using an in-memory
`Map`. That map lives in a single warm serverless instance; Vercel runs many
instances concurrently and recycles cold ones, so the limit is effectively *per
instance*, not per IP. Parallel requests, or simply waiting out a cold start,
each get a fresh budget.

It is weaker still because the IP is taken from the leftmost `x-forwarded-for`
entry, which the caller controls and can rotate. (The sibling
`personal_brand_page` repo uses `x-real-ip`, which the Vercel edge sets and the
caller cannot spoof — the correct source. Not changed here, because it would
only harden a counter that is unenforceable across instances regardless.)

Enforcing this properly requires a store shared across invocations (Vercel KV,
Upstash Redis, or Supabase). This project has no such store — its only
environment variables are `RESEND_API_KEY` and `CONTACT_FROM` — so the fix is a
new dependency and a new recurring cost, not a code change, and has deliberately
not been taken.

Accepted residual risk: an attacker who spoofs an allowed `Origin` header from a
non-browser client can burn Resend send quota and flood
`caleb@wiemansystems.com`. Impact is bounded — the endpoint reads no data and
exposes nothing; the worst case is inbox noise and a consumed sending quota. If
quota burn is ever observed, add the shared store rather than tightening the
in-memory counter, which cannot be made correct.

**Dependency advisories that survive `next@16.2.12`.** The bump from `16.2.9`
cleared all nine direct Next.js advisories, including the image-optimization
DoS (GHSA for SVG handling) that applies here because `components/Header.tsx`
renders `next/image`. `npm audit` still reports five HIGH entries, all of them
build-time only and none reachable at runtime:

| Package | Why it persists | Why it is not exploitable here |
|---|---|---|
| `postcss` 8.4.31 | pinned exactly by `next@16.2.12` | processes only author-controlled CSS at build time |
| `sharp` 0.34.5 | `next` declares `^0.34.5`; fix needs `>=0.35` | image optimization is served by Vercel's platform, not app `sharp` |
| `brace-expansion`, `js-yaml` | ESLint toolchain | dev dependencies; never in the deployed bundle |
| `next` (meta-entry) | flagged solely *via* `postcss` + `sharp` | no remaining direct Next advisory |

Do not "fix" these with `npm audit fix --force` — it downgrades to `next@9`.
Overriding `postcss`/`sharp` above what Next pins is unvalidated against this
build and is not worth the regression risk for build-time-only findings. Revisit
when Next ships a release that raises the pins.
