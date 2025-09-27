---
id: ADR-20250927-data-stores
tags: [adr]
status: accepted
---
# Data stores: Postgres (Docker) + Qdrant (vectors)

TL;DR:
- Postgres for operational data; Qdrant for embeddings. No PAM3 or non-public sources.

Context:
- Need SQL joins/indexes and a fast vector store.

Options:
- SQLite + Qdrant
- Postgres + pgvector only
- Postgres + Qdrant (chosen)

Decision:
- Run Postgres and Qdrant via Podman/Compose locally; named volumes; nightly dumps.

Consequences:
- Simple, reliable local setup; easy path to cloud later.

Links: [[llm-agent/README]], [[now]]

