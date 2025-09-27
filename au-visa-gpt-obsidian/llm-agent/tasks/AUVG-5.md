---
id: AUVG-5
tags: [task, roadmap/next]
status: todo
---
# Task: OCR pipeline (trigger + persist)

TL;DR:
- Use Python runner to OCR uploaded documents, capture output, persist `ocr_results`, and update job status with basic retries.

Background:
- We already have a Python CLI stub; this wires it into the app and DB without RAG.

Acceptance criteria:
- API at `web/src/app/api/ocr/route.ts` (POST) triggers OCR for a document ID.
- `web/src/server/python.ts` executes OCR, captures stdout/stderr, and returns JSON.
- `ingestion_jobs` status transitions: pending → running → completed/failed; retries capped.
- `ocr_results` rows contain text and basic metadata (pages, confidence if available).

BDD (Given / When / Then):
- Given a document in Pending OCR
- When I trigger OCR
- Then a job runs, results are stored, and the document status becomes OCR Complete

Test plan (AAA):
- // Arrange - insert a document and a pending job; mock Python runner
- // Act - call the OCR API; simulate success and failure
- // Assert - job status transitions correctly; `ocr_results` contains text; retries stop at limit

Risks/Flags:
- Long-running processes and memory for large PDFs; normalize Python errors.

Links: [[../roadmap/next]], [[../adr/ADR-node-python-split]]


