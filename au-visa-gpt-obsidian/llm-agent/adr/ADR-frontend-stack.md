---
id: ADR-20250927-frontend-stack
tags: [adr]
status: accepted
---
# Frontend stack: Next.js + Mantine

TL;DR:
- Next.js for app + API routes; Mantine for CSS-in-JS components.

Context:
- Need elegant UI without maintaining CSS files or headless primitives.

Options:
- Next.js + Mantine (chosen)
- Next.js + Chakra
- Vite SPA + separate API

Decision:
- Use Next.js App Router with Mantine components. Prefer client components for UI logic; keep server work in API routes.

Consequences:
- Low maintenance, modern look, SSR-ready if needed. No standalone .css in repo.

Links: [[llm-agent/README]], [[now]]

