---
id: AUVG-13
tags: [task, roadmap/now]
status: done
---

# Task: Applications MVP (list, create, details with tabs)

TL;DR:

- Provide Applications listing with Manage CTA, creation form with validation, and a details page using tabs (Profile, Documents). Add global breadcrumbs.

Background:

- This establishes the primary user flow before document uploads (AUVG-4) and AI features.

Acceptance criteria:

- List page at `web/src/app/applications/page.tsx` shows table of applications with ID, Visa, Created, and a subtle "Manage" button. Row ID is linkable. Uses React Query and global breadcrumbs.
- New application page at `web/src/app/applications/new/page.tsx` collects `visaCode` and basic applicant profile (fullName, email, nationality, dateOfBirth). Uses Zod + `@hookform/resolvers` validation. On success, redirects to list.
- API route at `web/src/app/api/applications/route.ts` implements `GET` (list) and `POST` (create). Validates payload and returns created entity.
- Service layer at `web/src/server/services/applications.ts` provides `listApplications` and `createApplication` using Drizzle.
- Details page at `web/src/app/applications/[id]/page.tsx` renders `ApplicationDetailsClient` with Mantine Tabs: "Profile" (renders visa, created, profile JSON) and "Documents" (placeholder). No runtime errors from mixing server/client.
- Documents are application-scoped. The upload/management entrypoint is nested: `web/src/app/applications/[id]/documents/upload` (wired in CTA), not a global `/documents/*` route.
- Global Breadcrumbs component at `web/src/app/components/BreadcrumbsBar.tsx` shows capitalized path segments (e.g., `Applications › 1`). Integrated in `ClientLayout`.

BDD (Given / When / Then):

- Given the Applications list
- When I click Manage on an application
- Then I land on the details page with the Profile tab selected and breadcrumbs `Applications › <id>`

Test plan (AAA):

- // Arrange - seed 1 application; render list page; mock API
- // Act - click Manage on the first row
- // Assert - navigates to `/applications/<id>`; tabs render; breadcrumbs show `Applications › <id>`

- // Arrange - render New Application form; mock `POST /api/applications`
- // Act - submit valid values; submit invalid email
- // Assert - on valid, redirect to list and row appears; on invalid, inline error shows

Risks/Flags:

- Profile shape is open (`jsonb`); tighten schema as fields stabilize. Add pagination later.

Links: [[AUVG-4]], [[AUVG-3]], [[../adr/ADR-frontend-stack]]
