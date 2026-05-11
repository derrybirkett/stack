# Stack

Tech defaults, configs, and working starters for products built within the [bloom](https://github.com/derrybirkett/bloom) system.

Stack is the answer to "what do I default to when I want to ship quickly without re-deciding the same basics every time."

## Two profiles

Stack exposes two profiles. A product picks one at bootstrap.

| Profile | Thesis | Stage fit |
|---|---|---|
| **lite** (default) | Vercel + Supabase + single Next.js app | Discovery, MVP, validation, single-team |
| **full** | Nx monorepo + NestJS API + Postgres-in-Docker + custom auth | Post-validation, regulated, on-prem, portability needs |

The default contract is in [`stack.yaml`](stack.yaml) — that file IS the lite profile. The full profile lives in [`profiles/full.yaml`](profiles/full.yaml).

Default to lite. Most products will never graduate to full; that's a feature.

## What's in stack

```
stack/
  README.md
  stack.yaml                    # the lite contract (canonical default)
  profiles/
    full.yaml                   # the full contract (heavyweight thesis from retired hatch)
  configs/                      # portable config fragments
    typescript/tsconfig.base.json
    eslint/eslint.config.js
    prettier/.prettierrc
    github/ci.yml
    git/hooks/pre-commit-no-main
  templates/
    lite/                       # working Next.js + Supabase starter (Phase 4)
    full/                       # working Nx + NestJS starter (Phase 4, from hatch salvage)
  docs/
    ui-baseline.md              # the 5-component baseline
  decisions/
    0001-vercel-supabase-default.md
```

## How to consume

Three valid modes.

**Reference**: read `stack.yaml`, copy the bits you need into your product manually. Best for products with custom constraints.

**Submodule**: mount stack under `.bloom/stack/` and reference configs by path. Best for normal use — get versioned reuse without copying.

```bash
git submodule add https://github.com/derrybirkett/stack .bloom/stack
ln -s .bloom/stack/configs/typescript/tsconfig.base.json tsconfig.base.json
```

**Selective copy**: bootstrap from a starter template under `templates/`, then diverge. Best when speed matters most.

## When to deviate

A product may deviate from the contract. When it does, record the deviation in the product's own `decisions/NNNN-deviate-from-stack.md` ADR with rationale. Three or more products deviating on the same concern is a signal to update the stack contract — open an ADR here.

## Versioning

Patch bumps for clarifications and config fragment updates. Minor for additions (new profile, new config fragment). Major for breaking semantic changes (changing a default vendor in the lite profile).

## License

MIT
