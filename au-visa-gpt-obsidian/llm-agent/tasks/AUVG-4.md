---
id: AUVG-4
tags: [task, roadmap/next]
status: todo
---
# Task: Document upload (UI + API)

TL;DR:
- Implement drag & drop upload UI and POST API with validation; persist document metadata and create an ingestion job.

Background:
- Upload is the entrypoint to OCR and later analysis; we need progress, cancel, and validation.

Acceptance criteria:
- UI at `web/src/app/documents/upload/page.tsx` with drag & drop, progress, and cancel.
- API at `web/src/app/api/documents/route.ts` (POST) accepts PDF/images up to a configured size.
- Storage adapter (local dev) abstracts future S3 switch.
- DB row created in `documents`; initial `ingestion_jobs` row in `pending`.
- Basic content-type and size preflight on client and server.

BDD (Given / When / Then):
- Given the upload page
- When I drop a valid PDF
- Then I see progress and, upon completion, a new document appears in the dashboard with status Pending OCR

Test plan (AAA):
- // Arrange - render upload component; mock server endpoint
- // Act - simulate drop of a valid file and an oversized file
- // Assert - progress and success/error toasts show; server receives metadata; DB rows created

Risks/Flags:
- Large file handling and abort/cancel edge cases; MIME spoofing.

Links: [[../roadmap/next]], [[../llm-agent/README]]


