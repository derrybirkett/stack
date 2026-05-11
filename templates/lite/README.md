# Lite Starter (Placeholder)

This directory will hold the working lite starter — a deployable Next.js + Supabase + Tailwind + shadcn template. **It is not built yet.** Phase 4 of the bloom rollout addresses this.

## What it will be when built

A real, deployable Next.js 15 (App Router) + TypeScript starter with:

- pnpm
- Tailwind CSS + shadcn/ui (copied in, not imported)
- Supabase auth (email + password) wired via `@supabase/ssr`
- Three required surfaces: marketing, auth, dashboard
- Stripe checkout stub (commented for later activation)
- Resend transactional email stub
- PostHog + Vercel Analytics + Sentry integration seams
- One Playwright e2e test covering: landing → signup → dashboard → logout
- A `pnpm dev` / `pnpm build` / `pnpm test` / `pnpm test:e2e` script set
- Clean Vercel deploy out of the box

## Exit criterion

A fresh person can clone this starter, run `pnpm install && pnpm dev`, and see the auth flow work locally in under 5 minutes. `vercel --prod` deploys without further config beyond Supabase keys.

## Until then

Use the contract in [`../../stack.yaml`](../../stack.yaml) as the manual reference for what to set up. Or wait for Phase 4.

The full profile starter is in the sibling `../full/` directory and faces the same Phase 4 status.
