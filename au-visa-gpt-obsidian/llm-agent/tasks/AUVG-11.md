---
id: AUVG-11
tags: [task, roadmap/next]
status: todo
---
# Task: Minimal application profile form (Profile tab)

TL;DR:

- Collect core applicant info to feed the chat: age, occupation, location, and key eligibility answers.

Background:

- The assistant needs structured inputs beyond OCR text to evaluate eligibility.

Acceptance criteria:

- UI form lives in `web/src/app/applications/[id]/page.tsx` under the "Profile" tab. Fields: fullName, email, nationality, dateOfBirth, visaCode.
- Validation via Zod + `@hookform/resolvers`; inline errors.
- API to update the `applications` record: `PATCH /api/applications/[id]` persists `profile` JSON and `visaCode`.
- Chat API reads the latest application profile.

BDD (Given / When / Then):

- Given I fill the application form
- When I save
- Then the profile persists and subsequent chats include the profile context

Test plan (AAA):

- // Arrange - render Profile tab; mock `PATCH /api/applications/1`
- // Act - submit valid values; submit invalid email
- // Assert - on valid, DB row updated; on invalid, inline error shows; chat consumes profile

Risks/Flags:

- Scope creep; keep fields minimal for MVP.

Links: [[../roadmap/next]], [[AUVG-7]]
