# Full Starter

Nx monorepo with three apps and three libs. The bloom full profile — choose this when you need owned auth/db, multi-team separation, or on-prem portability.

**Default for most products is the lite starter.** See [`../lite/`](../lite/) and [`../../profiles/full.yaml`](../../profiles/full.yaml) for the decision guide.

## What's included

- **Nx** workspace with `affected` commands for fast CI
- **apps/website** — Next.js 16 marketing site (public)
- **apps/dashboard** — React 18 + Vite SPA (authenticated)
- **apps/api** — NestJS 11 REST API with JWT + bcrypt auth
- **libs/ui** — shared component library (Button, Input, Card, Badge, Alert)
- **libs/auth** — auth context, protected route guard, useAuth/useUser hooks
- **libs/shared** — api client, shared types, utils, validation
- **docker-compose.yml** — Postgres 16 + Redis 7 + all three apps
- **Multi-stage Dockerfiles** for each app
- **Playwright e2e** for the core auth flow
- **pnpm** throughout

## Get started

```bash
# 1. Install
pnpm install

# 2. Set env vars
cp .env.example .env

# 3. Start infrastructure + apps
docker compose up
```

All three apps will be running:
- Website: http://localhost:4201
- Dashboard: http://localhost:4200
- API: http://localhost:4202

## Dev without Docker

```bash
# Start Postgres + Redis only
docker compose up postgres redis

# Then run all apps
pnpm dev

# Or individually
pnpm website:dev
pnpm dashboard:dev
pnpm api:dev
```

## Rename from my-app

Search-and-replace `my-app` and `my_app` throughout to rename the project. Key locations: `package.json`, `tsconfig.base.json`, `docker-compose.yml`, `.env.example`, lib path aliases.

## Deploy

See [`../../docs/deployment-options.md`](../../docs/deployment-options.md) for Vercel (website) + Railway (API) vs full Docker Hub patterns.

## Graduating from lite to full

Record the migration as an ADR in your product's `decisions/` directory explaining which graduation signal was met (see `../../profiles/full.yaml`).
