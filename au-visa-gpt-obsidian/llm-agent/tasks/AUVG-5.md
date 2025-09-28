---
id: AUVG-5
tags: [task, roadmap/next]
status: todo
---

# Task: OCR pipeline (app-scoped, sync trigger + persist)

TL;DR:

- Trigger OCR synchronously via an application-scoped API; capture output, persist `ocr_results`, and update a simple document/job status. No queue/worker in MVP.

Background:

- We already have a Python CLI stub; this wires it into the app and DB without RAG.

Acceptance criteria:

- API at `web/src/app/api/applications/[id]/documents/[documentId]/ocr/route.ts` (POST) triggers OCR for that document.
- Validate the `documentId` belongs to `application [id]`.
- `web/src/server/python.ts` executes OCR, captures stdout/stderr, returns JSON.
- Status transitions (minimal): pending → running → completed/failed. Retries optional or capped at 1.
- `ocr_results` rows contain text and basic metadata (pages, confidence if available).

BDD (Given / When / Then):

- Given a document in Pending OCR for application 1
- When I POST to `/api/applications/1/documents/123/ocr`
- Then the OCR runs, results are stored, and the document status becomes Completed (or Failed on errors)

Test plan (AAA):

- // Arrange - insert a document (pending); mock Python runner for success/failure
- // Act - call the OCR API endpoint
- // Assert - status transitions correctly; `ocr_results` saved on success; failure sets status Failed

Risks/Flags:

- Long-running processes and memory for large PDFs; normalize Python errors.

Links: [[../roadmap/next]], [[../adr/ADR-node-python-split]]
