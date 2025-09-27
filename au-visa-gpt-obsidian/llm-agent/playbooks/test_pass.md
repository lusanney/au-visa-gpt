# Test Pass Playbook

Purpose: add tests selectively for behaviour that matters (stories/features, bug fixes, regression-critical flows). Use smoke checks elsewhere for speed.

Flow:
1) Identify tasks that warrant tests (user-visible behaviour or regression risk).
2) For each, read BDD (Given/When/Then) and Acceptance criteria.
3) Write tests with AAA comments:
   - // Arrange - setup inputs, mocks, fixtures
   - // Act - perform the operation
   - // Assert - verify outcomes match BDD
4) Non-critical tasks: perform smoke checks (manual or simple scripts) instead of full tests.
5) Update task note with links to tests, mark status: tested (if applicable).

Roles:
- Primary implementer (me) triggers selective test pass.
- Test reviewer agent validates coverage when tests exist; I integrate fixes.

Exit criteria:
- Critical BDD scenarios covered; smoke checks for the rest; CI green when tests are present.
