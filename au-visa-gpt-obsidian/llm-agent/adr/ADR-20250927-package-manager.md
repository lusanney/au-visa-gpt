---
id: ADR-20250927-package-manager
tags: [adr]
status: accepted
---
# Package manager: pnpm (vs npm, yarn)

TL;DR:
- Use pnpm for installs/workspaces: faster, disk‑efficient (content‑addressed store), stricter dependency resolution.

Context:
- Monorepo‑friendly, quick local iteration, and reliable CI are priorities.
- Yarn v1 is legacy; Yarn PnP can add friction with some tooling; npm works but is slower/heavier at scale.

Options:
- pnpm — fast, deduped store, strong workspaces (chosen)
- npm — baseline compatibility, slower installs
- yarn — v1 legacy; PnP friction

Decision:
- Standardize on pnpm across dev/CI.
- Pin via package.json: `"packageManager": "pnpm@<version>"` and enable Corepack.

Consequences:
- Faster, consistent installs; smaller disk footprint.
- Contributors need pnpm/Corepack enabled (documented in README).

CI & usage notes:
- CI: `pnpm fetch && pnpm install --frozen-lockfile`
- Cache: pnpm store directory
- Migration: if an npm/yarn lock exists, `pnpm import`, commit `pnpm-lock.yaml`.

Links: [[../../index]], [[../roadmap/now]]
