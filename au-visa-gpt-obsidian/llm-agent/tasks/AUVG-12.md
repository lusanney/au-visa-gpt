---
id: AUVG-12
tags: [task, roadmap/next]
status: todo
---
# Task: Tests and manual test pass for MVP slice

TL;DR:
- Add unit/integration tests for upload, OCR trigger, chat API; write a manual test pass doc for the happy path.

Background:
- Ensure the MVP flow is reliable before adding RAG or fine-tuning.

Acceptance criteria:
- Vitest + RTL tests cover upload UI interactions and API preflight.
- Integration tests for OCR trigger and chat API (provider mocked) with AAA comments.
- Playwright e2e for upload → OCR → chat happy path.
- Manual test pass updated in `llm-agent/playbooks/test_pass.md`.

BDD (Given / When / Then):
- Given the app is running
- When I perform the MVP flow
- Then automated and manual checks confirm expected results across steps

Test plan (AAA):
- // Arrange - spin up dev server and mocks
- // Act - run unit/integration/e2e suites
- // Assert - all pass; coverage threshold met; manual pass doc completed

Risks/Flags:
- Flaky streaming tests; isolate transport and assert on event sequences.

Links: [[../roadmap/next]], [[AUVG-4]], [[AUVG-5]], [[AUVG-7]], [[AUVG-8]], [[AUVG-9]]


