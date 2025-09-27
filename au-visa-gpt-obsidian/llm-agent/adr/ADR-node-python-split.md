---
id: ADR-20250927-node-python-split
tags: [adr]
status: accepted
---
# Node orchestrator + Python OCR/extraction sidecar

TL;DR:
- Node/TS owns UI, APIs, retrieval; Python FastAPI handles OCR/extraction only.

Context:
- Node is great at I/O and orchestration; Python has superior OCR/ML libs.

Options:
- All Node (Tesseract only)
- All Python (FastAPI + Celery)
- Split (chosen)

Decision:
- Keep Python localhost-only; exchange JSON; Python never touches the DB directly.

Consequences:
- Minimal complexity now; easy to scale Python later if OCR needs grow.

Links: [[llm-agent/README]], [[now]]

