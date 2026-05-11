# ADR-0001: Lite profile default is Vercel + Supabase + single Next.js app

Date: 2026-05-07
Status: Accepted

## Context

The previous bloom-system iteration carried four conflicting "what is the default stack" definitions across `prefs/prefs.yaml`, `stack/docs/stacks/vercel-stack.md`, `skills/CLAUDE.md`, and `skills/skills/vercel-saas-stack/spec.yaml`. They disagreed on package manager (npm vs pnpm), auth + db provider (Supabase vs Clerk + Neon), and monorepo strategy (Nx vs single Next app). New products bootstrapped from "bloom" got incompatible answers depending on which file was read first.

A canonical default must be picked and documented in exactly one place.

## Decision

The lite profile, defined in [`stack.yaml`](../stack.yaml), uses:

- Framework: Next.js (App Router) + TypeScript on Vercel.
- Package manager: pnpm.
- Auth + database: Supabase (via `@supabase/ssr`).
- UI: Tailwind + shadcn/ui (copied into project), monochrome zinc palette.
- Testing: Vitest (unit) + Playwright (e2e), Chromium-only by default.
- Payments: Stripe (Checkout + Customer Portal).
- Email: Resend.
- Analytics: PostHog + Vercel Analytics + Sentry.

A second profile, `full`, is preserved at [`profiles/full.yaml`](../profiles/full.yaml) for products that need ownership/portability (Nx + NestJS + Postgres-in-Docker + custom JWT). Default is lite.

## Consequences

**Positive**:
- Time-to-first-deploy under an hour for the common case.
- Single managed-services vendor for auth + db + storage (Supabase) reduces integration surface.
- shadcn copied-in pattern means no runtime UI dependency.
- pnpm gives strict dep resolution and disk efficiency across many side projects.
- The `full` profile preserves the heavyweight thesis for the rare product that needs it, without forcing it on every bootstrap.

**Negative**:
- Vendor lock-in on Vercel + Supabase + Stripe. Acceptable for validation-stage products; the full profile is the escape hatch when not.
- Single Next.js app is harder to split into multiple deployables if a product grows. Acceptable; that's the graduation signal for full.
- pnpm installation is a one-time tax on a fresh machine.

## Alternatives considered

**Clerk + Neon for auth + db**: Best-in-class auth UX, but adds a second vendor and SSO/B2B-org features that the user does not yet need. Documented as the alternative path when those needs emerge.

**Nx + 3-app monorepo as default**: Solves portability and team-scale problems the user does not have yet. Adds operational complexity (multiple servers, more CI surface) for negligible gain at validation stage. Preserved as the `full` profile.

**npm as the package manager**: Lower mental overhead, every tutorial assumes it. But pnpm's strict resolution and disk savings compound across many side projects; Vercel's docs increasingly default to pnpm. Documented npm as the acceptable fallback when consuming external starters that hard-assume it.

**Drizzle + Neon instead of Supabase native**: Drizzle is a fine ORM but pairs more naturally with Neon. With Supabase, the native client + RLS pattern is the better fit and removes one moving part.
