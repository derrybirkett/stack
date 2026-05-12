# Lite Starter

Next.js 16 (App Router) + Supabase + Tailwind + shadcn/ui. The default bloom starting point for new products.

## What's included

- **Next.js 16** — App Router, Server Components, `proxy.ts` session guard
- **Supabase** — email/password auth via `@supabase/ssr`, server + browser clients
- **Tailwind v4** + **shadcn/ui v4** — monochrome zinc palette, five base components (Button, Input, Card, Badge, Alert)
- **Three required surfaces** — marketing (`/`), auth (`/login`, `/signup`, `/reset-password`), dashboard (`/dashboard`)
- **Playwright** — core-flow e2e covering landing → signup → dashboard → logout
- **Vitest** — unit test config, no tests written (add as needed)
- **pnpm** scripts: `dev`, `build`, `typecheck`, `lint`, `test`, `test:e2e`

## Get started

```bash
# 1. Copy this directory into your product
cp -r .bloom/stack/templates/lite ./src   # or wherever you want it

# 2. Install dependencies
pnpm install

# 3. Set env vars (copy .env.example → .env.local, fill in Supabase keys)
cp .env.example .env.local

# 4. Run
pnpm dev
```

The app will be at `http://localhost:3000`. Sign up creates a Supabase user; the dashboard is auth-gated via `proxy.ts`.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy **Project URL** and **anon key** from Settings → API into `.env.local`
3. Enable **Email** provider in Authentication → Providers

## Deploy to Vercel

```bash
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel --prod
```

## Activating optional integrations

The `.env.example` has commented entries for Stripe, Resend, PostHog, and Sentry. Each requires:
1. Uncomment the env vars in `.env.example` and `.env.local`
2. Install the provider's SDK
3. Wire up the integration point (payments route, email function, analytics provider)

## Deviating from this starter

Record any deviation from [`../../stack.yaml`](../../stack.yaml) as an ADR in your product's `decisions/` directory.
