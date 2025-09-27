---
id: ADR-20250927-repo-structure
tags: [adr]
status: accepted
---
# Repository structure: Monorepo (single git repo)

TL;DR:
- Use a monorepo. All app components (frontend, scripts, infra, future workers) live in this repo; no separate repositories.

Context:
- Solo/private project, tight coupling across UI, orchestration, ingestion/OCR, and infra. Shared tooling (pnpm, Compose) and docs (Obsidian) benefit from a single repo.

Decision:
- Keep everything in this repo:
  - `web/` (Next.js + Mantine)
  - `scripts/` (Python CLI OCR and helpers)
  - `compose.yml` (Postgres, Qdrant)
  - `au-visa-gpt-obsidian/` (docs/vault)
  - future: `workers/` if/when needed
- Version and release from the monorepo; no split repos.

Consequences:
- Simple local dev and atomic PRs across components.
- Single CI pipeline; requires basic workspace management if more packages are added.

Links: [[../../index]], [[../roadmap/now]]
