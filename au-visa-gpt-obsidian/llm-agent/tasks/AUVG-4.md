---
id: AUVG-4
tags: [task, roadmap/next]
status: todo
---

# Task: Document upload and management (UI + API)

TL;DR:

- Implement application-scoped drag & drop upload UI and API with validation; persist document metadata and create an ingestion job. Add Documents tab to manage the list with status, inline preview, and Reprocess.

Background:

- Upload is the entrypoint to OCR and later analysis; we need progress, cancel, and validation.
- Documents are application-scoped. All routes and services must operate under an `applicationId` context.

Acceptance criteria:

- Upload UI at `web/src/app/applications/[id]/documents/upload/page.tsx` with drag & drop, progress, and cancel.
- API at `web/src/app/api/applications/[id]/documents/route.ts`:
  - `POST` (multipart/form-data) accepts PDF and image/\* up to `MAX_UPLOAD_MB`.
  - `GET` returns the application's documents and statuses for the Documents tab.
- Documents management inside `web/src/app/applications/[id]/page.tsx` → "Documents" tab: table with status chips, pagination, and inline preview (drawer/modal) with OCR text snippet.
- Documents tab is deep-linkable and selected via the query param: `/applications/[id]?tab=documents`. When no `tab` is provided, the page ensures a default `?tab=profile` is present in the URL.
- Reprocess action per row calls OCR trigger from AUVG-5: `POST /api/applications/[id]/documents/[documentId]/ocr`.
- Storage adapter interface with a local disk implementation for dev; returns `storageKey`.
- DB rows: create `documents` (scoped via `application_id`) and an `ingestion_jobs` row with status `pending`.
- Dedupe policy: unique on `(application_id, sha256)`; repeat uploads return 200 with existing `DocumentDto`.
- Client and server preflight validation for content-type and size.
- Env: add `MAX_UPLOAD_MB` and `UPLOAD_DIR` (dev defaults) and enforce server-side limits.

BDD (Given / When / Then):

- Given the application documents upload page `/applications/1/documents/upload`
- When I drop a valid PDF within size limits
- Then I see progress and, upon completion, a new document appears in the application's Documents tab with status Pending OCR

- Given an application details page
- When I visit `/applications/1?tab=documents`
- Then the Documents tab is active and the documents list renders

- Given documents exist for an application
- When I open the Documents tab and click Reprocess on a row
- Then the OCR is triggered and the status updates accordingly; opening Preview shows OCR text

Test plan (AAA):

- // Arrange - render upload component (scoped to application 1); mock/spy `POST /api/applications/1/documents`
- // Act - simulate drop of a valid file and an oversized file; click cancel to abort
- // Assert - progress and success/error toasts show; server receives metadata; DB rows created (`documents`, `ingestion_jobs` pending)

- // Arrange - navigate to `/applications/1?tab=documents`
- // Act - load the page
- // Assert - Documents tab is selected and list renders

- // Arrange - navigate to `/applications/1` (no `tab`)
- // Act - load the page
- // Assert - URL updates to include `?tab=profile` and Profile tab is active

- // Arrange - seed documents and OCR results; render Documents tab
- // Act - click Reprocess on a row; open Preview
- // Assert - OCR API is called; status transitions; preview shows OCR text snippet

Risks/Flags:

- Large file handling and abort/cancel edge cases; MIME spoofing.
- Ensure all routes/services are application-scoped; no global documents endpoints.
- Future S3 migration via storage adapter boundary.

Links: [[../roadmap/next]], [[../llm-agent/README]], [[../adr/ADR-data-stores]], [[AUVG-5]], [[AUVG-13]]
