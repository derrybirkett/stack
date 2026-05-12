# Deployment Options

Three deployment paths for bloom-built products. Most products use Vercel only (lite profile). Railway and Docker Hub become relevant when the full profile's API or background workers need a home.

Salvaged from the retired hatch repo's deployment workflow patterns.

---

## Vercel (default — lite and full)

The default. Zero-config for Next.js. Preview deploys per PR are non-negotiable.

**What lives here:** Next.js app (marketing + dashboard in the lite profile; website in the full profile).

**Setup:**
```bash
pnpm dlx vercel link
pnpm dlx vercel env pull .env.local   # pull preview env vars
```

**CI:** The GitHub Actions workflow in `configs/github/ci.yml` handles typecheck + lint + build + e2e before Vercel deploys.

**Env vars:** Set via `vercel env add` or the Vercel dashboard. Never committed to the repo.

---

## Railway (full profile — API)

Used when the full profile's NestJS API needs a managed host that supports long-running processes, Postgres, and Redis.

**What lives here:** NestJS API (`apps/api`), Postgres database, Redis.

**Why not Vercel for the API:** Vercel functions have a 300s max execution limit and are stateless. A persistent NestJS server with WebSockets or long-running jobs needs Railway or a VPS.

**Setup:** Connect the GitHub repo in the Railway dashboard; Railway detects the Dockerfile in `apps/api/` automatically.

---

## Docker Hub (full profile — self-hosted / on-prem)

Used when a product needs to run fully on-prem or in a private cloud, or when the team wants reproducible deployment artifacts.

**What lives here:** Multi-stage Dockerfiles for each app (`apps/website`, `apps/dashboard`, `apps/api`) plus `docker-compose.yml` (Postgres 16 + Redis 7 + all apps).

**Build and push:**
```bash
docker compose build
docker compose push
```

**Run locally:**
```bash
docker compose up
```

The full starter at `templates/full/` includes all Dockerfiles and the docker-compose config. See `profiles/full.yaml` for the full deployment matrix.

---

## Decision guide

| Scenario | Deployment |
|---|---|
| Lite profile (single Next.js app) | Vercel only |
| Full profile, managed hosting OK | Vercel + Railway |
| Full profile, on-prem or regulated | Docker Hub + docker-compose |
| Background jobs, Inngest | Vercel (Inngest runs as Vercel Functions) |
