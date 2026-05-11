# Full Starter (Placeholder)

This directory will hold the working full starter — a deployable Nx monorepo with three apps (Next.js website + React+Vite dashboard + NestJS API), three libs (ui, auth, shared), Postgres + Redis via docker-compose, and custom JWT auth. **It is not built yet.** Phase 4 of the bloom rollout addresses this, drawing on the existing hatch repo content as the starting point.

## What it will be when built

Salvaged from the retired [hatch](https://github.com/derrybirkett/hatch) repo, structured as a static template (not a generator). See [hatch/TOMBSTONE.md](https://github.com/derrybirkett/hatch) for the salvage map.

- pnpm + Nx workspace
- `apps/website` — Next.js 15 marketing site
- `apps/dashboard` — React 18 + Vite SPA
- `apps/api` — NestJS 11 REST API with JWT + bcrypt auth
- `libs/ui` — shared component library (Button, Input, Card, Badge, Alert)
- `libs/auth` — auth context, protected route guard
- `libs/shared` — api client, shared types
- `docker-compose.yml` with Postgres 16 + Redis 7
- Multi-stage Dockerfiles per app
- Playwright e2e covering the full auth flow across Chromium, Firefox, WebKit
- GitHub Actions CI (typecheck + lint + build + e2e + audit)
- Deployment paths for Vercel (website), Railway (api), Docker Hub (full stack)

## Exit criterion

A fresh person can clone this starter, run `pnpm install && docker-compose up`, and see all three apps running locally within 10 minutes. CI passes on a fresh PR.

## Until then

The contract is documented in [`../../profiles/full.yaml`](../../profiles/full.yaml). The existing hatch repo is the working reference until this template is built.
