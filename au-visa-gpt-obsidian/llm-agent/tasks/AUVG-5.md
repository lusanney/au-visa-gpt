---
id: AUVG-5
tags: [task, roadmap/next]
status: todo
---

# Task: OCR pipeline (app-scoped, enqueue + persist, reprocess)

TL;DR:

- Enqueue OCR via an application-scoped API; worker/job execution will come later. Persist `ocr_results` when processed and update a simple document/job status. Include a reprocess endpoint to enqueue again.

Background:

- We already have a Python CLI stub; this wires it into the app and DB without RAG.

Acceptance criteria:

- Enqueue OCR automatically on upload (AUVG-4). No user/HTTP CTA to trigger OCR.
- Validate the `documentId` belongs to `application [id]` when creating jobs in service code.
- `ingestion_jobs` entry is created with `type=ocr`, `status=pending` and attempt counters updated on each enqueue; reprocess will be a system action (not user-initiated).
- Status transitions (when worker exists): pending → running → completed/failed. Retries optional or capped at 1.
- `ocr_results` rows contain text and basic metadata (pages, confidence if available) when a job completes (handled by worker later).

BDD (Given / When / Then):

- Given a document for application 1
- When it is uploaded successfully
- Then an ingestion job is created with status Pending

- Given a completed OCR exists
- When a system reprocess is scheduled (future)
- Then a new pending job is created (enqueued)

Test plan (AAA):

- // Arrange - insert a document; clear jobs
- // Act - call the OCR enqueue endpoint
- // Assert - a pending job is created; calling again creates another pending job (reprocess)

Risks/Flags:

- Long-running processes and memory for large PDFs; normalize Python errors.

Links: [[../roadmap/next]], [[../adr/ADR-node-python-split]]
