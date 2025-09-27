# Reader Guide

Start here to understand the project:

- What this is: AU Visa GPT assistant (private, personal use initially)
  - Goal: high-reasoning assistance for Australian visas (e.g., visa 191), including legislation-aware Q&A, application preparation, and document checks.
  - Scope: personal-use MVP first; potential public release later (not legal advice).
  - Principles: human-first docs, citations + abstention, local-first dev.
  - Problem we solve: applicants are not familiar with law/process and want confidence of success without always hiring a migration agent.
  - Approach: act from a case officer perspective — check eligibility, highlight inconsistencies, identify missing proofs, and recommend specific documents to strengthen the application.
- Read these first:
  - Key decisions: [[ADR-frontend-stack]], [[ADR-node-python-split]], [[ADR-data-stores]], [[ADR-infra-compose]]
  - Business context: [[business/visa-191]]
  - Glossary: [[glossary]]
- How it works (high level):
  - RAG: retrieval-augmented generation over Migration Act 1958/1994 and procedural guidelines; prioritize citations, show last indexed dates, abstain when unsure.
  - Document understanding: start with text PDFs; add OCR (Python sidecar) for scans; extract tables and structured fields for checks.
  - Background tasks: legislation/news/YT channel monitoring to keep content fresh (indexing jobs run locally via scripts initially).
  - Architecture: Next.js frontend (Mantine), Node 24 server (API, orchestration), Python sidecar for CPU-heavy tasks, Postgres + Qdrant via Compose.
- Where to go next:
  - RAG policy: [[../llm-agent/rag/policy]]
  - Ingestion sources: [[../llm-agent/rag/ingestion]]
  - Current roadmap: [[../llm-agent/roadmap/now]]

Roadmap overview
- Now: baseline app running; API→Python→UI roundtrip; theme and structure set (Visa 191 focus).
- Next: choose DB library (Drizzle/Prisma), add `src/server/db`, repositories, and validated env; scaffold initial domains (documents, jobs).
- Later: ingestion jobs (legislation/news/YT), OCR improvements, evals, and public-ready hardening; expand to high-impact visas (e.g., tourist visa) with tailored checklists.
