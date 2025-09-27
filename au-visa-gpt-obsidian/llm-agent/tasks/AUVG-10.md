---
id: AUVG-10
tags: [task, roadmap/next]
status: todo
---
# Task: Documents dashboard and details

TL;DR:
- Implement documents list and detail pages to monitor upload and OCR lifecycle and allow reprocess.

Background:
- Users need visibility into ingestion and a way to preview OCR results.

Acceptance criteria:
- `web/src/app/documents/page.tsx`: table with filters, status chips, pagination.
- `web/src/app/documents/[id]/page.tsx`: metadata, OCR text preview, reprocess button.
- API endpoints to fetch lists and details; reprocess routes call OCR trigger.

BDD (Given / When / Then):
- Given uploaded documents
- When I open Documents
- Then I can see status for each and open details with OCR preview

Test plan (AAA):
- // Arrange - seed a few documents and OCR results
- // Act - navigate list → details; click reprocess
- // Assert - correct rows display; detail view renders text; reprocess enqueues OCR

Risks/Flags:
- Long OCR text rendering performance; consider collapsible/virtualized content.

Links: [[../roadmap/next]], [[AUVG-4]], [[AUVG-5]]


