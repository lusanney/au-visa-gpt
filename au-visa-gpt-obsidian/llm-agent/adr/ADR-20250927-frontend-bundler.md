---
id: ADR-20250927-frontend-bundler
tags: [adr]
status: accepted
---
# Frontend bundler/runtime: Next.js dev with Turbopack (no Vite for app)

TL;DR:
- Use Next.js (App Router) with Turbopack for dev preview; fall back to webpack if needed.
- Do not use Vite for the main app. If desired, use Storybook with Vite builder for component states.

Context:
- We need fast local preview, SSR/streaming support, API routes, uploads, and minimal plumbing with Mantine.

Options:
- Next.js + Turbopack (chosen) — fast HMR, integrated routing/API/SSR.
- Next.js + webpack — stable fallback when a plugin isn’t turbo-compatible.
- Vite SPA — great speed but would reimplement SSR, routing, streaming, and infra glue.

Decision:
- Keep the main app on Next.js; run `next dev --turbo` in development.
- Optional: add Storybook (Vite builder) for isolated component iteration.

Consequences:
- Minimal configuration; fast preview; full-stack features out of the box.
- No extra bundler complexity for the app.

Notes:
- For snappier DX: run type-check and lint in parallel processes, not blocking dev HMR.

Links: [[../../index]], [[../roadmap/now]]
