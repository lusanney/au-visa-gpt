---
id: AUVG-1
tags: [task, roadmap/now]
status: in_progress
---
# Task: Init project barebones

TL;DR:
- Scaffold Next.js app (TS, App Router) with pnpm; add Mantine provider; add Python CLI OCR stub; add Compose for Postgres+Qdrant; add .env.example, .gitignore, and README. No business logic yet.

Background:
- Establish a clean, runnable baseline matching our ADRs and working agreements.

Acceptance criteria:
- `web/` Next.js app created; `pnpm dev` runs with Turbopack
- Mantine provider wired; Button renders on `/`
- Python `scripts/ocr.py` prints JSON given a file path
- `compose.yml` with Postgres + Qdrant (ARM64) and named volumes
- `.env.example`, `.gitignore`, and README with local steps

BDD (Given / When / Then):
- Given a fresh clone
- When I follow the README steps
- Then the app and infra start locally without errors

Test plan (AAA):
- Use smoke checks only for this milestone (no formal tests):
  - // Arrange - install deps, start compose
  - // Act - run dev server, execute ocr script
  - // Assert - home renders; script outputs JSON; DBs reachable

Risks/Flags:
- Network/certs could block scaffolding or image pulls; fallback paths documented

Links: [[../roadmap/now]], [[../adr/ADR-20250927-frontend-bundler]], [[../adr/ADR-20250927-backend-runtime]], [[../adr/ADR-20250927-package-manager]], [[../adr/ADR-data-stores]]
