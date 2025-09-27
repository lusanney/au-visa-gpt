---
id: AUVG-8
tags: [task, roadmap/next]
status: todo
---
# Task: Confidence, action items, and missing-doc suggestions

TL;DR:
- Extend chat result to include `confidenceScore`, `actionItems[]`, and `missingDocuments[]`; persist a snapshot to `applications`.

Background:
- The assistant should produce a concise, structured summary of eligibility confidence and next steps for the user.

Acceptance criteria:
- Chat API response includes `meta: { confidenceScore: number, actionItems: ActionItem[], missingDocuments: string[] }`.
- Server validates shape; `applications` stores latest snapshot with timestamp.
- UI consumers can render the structured fields reliably.

BDD (Given / When / Then):
- Given a chat completion
- When the API finalizes the response
- Then the meta fields are present and persisted alongside the latest conversation snapshot

Test plan (AAA):
- // Arrange - mock provider to return structured fields; seed application
- // Act - call chat API and await completion
- // Assert - response shape matches; DB snapshot exists with fields populated

Risks/Flags:
- Model output variance; use system and JSON schema hints to stabilize.

Links: [[../roadmap/next]], [[AUVG-7]]


