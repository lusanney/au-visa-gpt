---
id: AUVG-4
tags: [task, roadmap/next]
status: done
---

# Task: Document upload and management (UI + API)

TL;DR:

- Implement application-scoped drag & drop upload UI and API with validation; persist document metadata and create an ingestion job. Add Documents tab to manage the list with status, inline preview, and Reprocess. Display documents grouped by `category` (accordion/sections). PDF-only for MVP; no editing, read-only preview.

Background:

- Upload is the entrypoint to OCR and later analysis; we need progress, cancel, and validation.
- Documents are application-scoped. All routes and services must operate under an `applicationId` context.

Acceptance criteria:

- Upload UI at `web/src/app/applications/[id]/documents/upload/page.tsx` with drag & drop, progress, and cancel.
  - PDF-only: client preflight restricts to `application/pdf`; non-PDF shows an error.
  - Includes classification controls: `category` select (enum from schema; default `unclassified`) and optional `typeCode`.
- API at `web/src/app/api/applications/[id]/documents/route.ts`:
  - `POST` (multipart/form-data) accepts PDF only (`Content-Type: application/pdf`), and accepts `category` and optional `typeCode`.
  - `GET` returns the application's documents with classification fields (at minimum `category`), for the Documents tab.
  - Optional `?category=<category>` filter supported for list requests.
- Documents management inside `web/src/app/applications/[id]/page.tsx` → "Documents" tab:
  - Accordion or sectioned layout grouped by `category` (identity, financial, employment, form, police, education, residential, health, other, unclassified).
  - Each section shows a table with status chips, pagination, and a read-only PDF preview (drawer/modal or embedded viewer) with zoom/page navigation. No edit/annotate UI.
  - Section headers display counts per category; a total documents count is shown at the top.
- Documents tab is deep-linkable and selected via the query param: `/applications/[id]?tab=documents`. When no `tab` is provided, the page ensures a default `?tab=profile` is present in the URL.
- No user CTA to trigger OCR. OCR is enqueued automatically on upload (see AUVG-5). Rows display status chips only (e.g., Received, Pending, Processing, Processed, Failed).
- Storage adapter interface with a local disk implementation for dev; returns `storageKey`.
- DB rows: create `documents` (scoped via `application_id`) and an `ingestion_jobs` row with status `pending`.
- Dedupe policy: unique on `(application_id, sha256)`; repeat uploads return 200 with existing `DocumentDto`.
- Client and server preflight validation for content-type and size.
- Env: add `MAX_UPLOAD_MB` and `UPLOAD_DIR` (dev defaults) and enforce server-side limits.

BDD (Given / When / Then):

- Given the application documents upload page `/applications/1/documents/upload`
- When I drop a valid PDF within size limits and select `category = financial`
- Then I see progress and, upon completion, a new document appears in the application's Documents tab under the Financial section with status Pending OCR

- Given the application documents upload page
- When I drop a non-PDF (e.g., JPG)
- Then I see a validation error and the file is not uploaded

- Given an application details page
- When I visit `/applications/1?tab=documents`
- Then the Documents tab is active and the documents list renders grouped by category with counts

- Given documents exist for multiple categories
- When I expand the Financial section (or filter `?category=financial`)
- Then only financial documents are listed, and other sections remain collapsed

- Given a PDF document exists
- When I open Preview
- Then I see a read-only PDF viewer with page navigation and zoom but no editing controls

- Given documents exist for an application
- When I open the Documents tab
- Then I see status chips reflecting current processing state; opening Preview shows the PDF as read-only

Test plan (AAA):

- // Arrange - render upload component (scoped to application 1); mock/spy `POST /api/applications/1/documents`
- // Act - simulate drop of a valid PDF and an oversized file; select a category; click cancel to abort
- // Assert - progress and success/error toasts show; server receives metadata including `category`; DB rows created (`documents`, `ingestion_jobs` pending)

- // Arrange - render upload component
- // Act - drop a non-PDF (e.g., PNG)
- // Assert - client shows validation error; server POST is not called

- // Arrange - navigate to `/applications/1?tab=documents`
- // Act - load the page
- // Assert - Documents tab is selected; sections render with correct counts

- // Arrange - seed documents across categories; render Documents tab
- // Act - expand Financial section (or call GET with `?category=financial`)
- // Assert - only financial documents render in that section; others are collapsed

- // Arrange - seed a PDF document; open Preview
- // Act - interact with viewer controls (zoom/page)
- // Assert - PDF renders read-only; no edit/annotate controls are present

- // Arrange - seed documents with various statuses; render Documents tab
- // Act - open Preview for a Processed document
- // Assert - status chips render correctly; preview continues to show PDF read-only

Risks/Flags:

- Large file handling and abort/cancel edge cases; MIME spoofing.
- Ensure all routes/services are application-scoped; no global documents endpoints.
- Future S3 migration via storage adapter boundary.

Links: [[../roadmap/next]], [[../llm-agent/README]], [[../adr/ADR-data-stores]], [[AUVG-5]], [[AUVG-13]], [[AUVG-2]]
