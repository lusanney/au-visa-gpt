---
id: AUVG-11
tags: [task, roadmap/next]
status: todo
---
# Task: Minimal application profile form

TL;DR:
- Collect core applicant info to feed the chat: age, occupation, location, and key eligibility answers.

Background:
- The assistant needs structured inputs beyond OCR text to evaluate eligibility.

Acceptance criteria:
- UI form under `web/src/app/settings/page.tsx` or `web/src/app/application/page.tsx` (MVP choice) to capture structured fields.
- API to create/update an `applications` record.
- Chat API reads the latest application profile.

BDD (Given / When / Then):
- Given I fill the application form
- When I save
- Then the profile persists and subsequent chats include the profile context

Test plan (AAA):
- // Arrange - render form; mock save API
- // Act - fill fields and submit
- // Assert - server receives payload; DB row updated; chat reads profile

Risks/Flags:
- Scope creep; keep fields minimal for MVP.

Links: [[../roadmap/next]], [[AUVG-7]]


