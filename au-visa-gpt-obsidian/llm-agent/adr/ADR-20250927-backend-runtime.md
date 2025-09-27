---
id: ADR-20250927-backend-runtime
tags: [adr]
status: accepted
---
# Backend runtime: Node.js 24 (Current) (vs Deno, Bun)

TL;DR:
- Choose Node.js 24 (Current) for the API runtime now for performance gains; we accept the maturity risk and will monitor deps/APM.
- Keep code portable (ESM, Web APIs), avoid native add-ons where possible.
- Reassess stability monthly; fall back to 22 LTS if blocking issues arise.

Context:
- We use Next.js and many Node-focused SDKs (pg, Qdrant, LLM clients).
- We want low-friction local ops on Podman/Compose (ARM64 images), and care about perf.

Options:
- Node.js 22 LTS — maximal ecosystem stability today.
- Node.js 24 Current — newer V8, perf/features; some libs/APM may lag.
- Deno — TS-first, secure permissions; npm/native add-on friction remains.
- Bun — very fast tooling; runtime compat and ops maturity still evolving.

Decision:
- Use Node.js 24 (Current) for the backend/API runtime.
- Write ESM-only; prefer Web APIs (`fetch`, Web Crypto); isolate Node-specific modules behind small adapters.
- Trial Bun as a test runner on CI later; keep runtime on Node 24.

Consequences:
- Performance wins; potential compatibility edges we’ll watch in CI and lock versions if needed.
- Easy path to evolve: edge/serverless endpoints later if needed; Bun for tooling possible soon.

Links: [[../../index]], [[../roadmap/now]]
