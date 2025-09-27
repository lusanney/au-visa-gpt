---
id: AUVG-3
tags: [task, roadmap/next]
status: in_progress
---

# Task: Frontend foundations (shell, theme, HTTP hooks)

TL;DR:

- Build app shell/nav, wire theme tokens and light/dark, and add typed HTTP hooks with React Query and error boundaries.

Background:

- A consistent UI frame and data layer improves reliability and speed for subsequent features (upload, chat, dashboard).

Acceptance criteria:

- `web/src/app/layout.tsx` provides app shell with header/nav and metadata.
- Theme tokens from `web/src/theme/palette.ts` applied; light/dark toggle and `prefers-color-scheme` respected.
- `web/src/lib/http.ts` enhanced; `web/src/client/` exposes typed hooks using React Query.
- Error boundary and loading/empty-state patterns established.

BDD (Given / When / Then):

- Given the app is running
- When I navigate between Chat, Documents, and Settings
- Then the shell and theme persist, and requests use typed hooks with retry policy

Test plan (AAA):

- // Arrange - render `layout` and sample pages with providers
- // Act - navigate and trigger a sample fetch via a test hook
- // Assert - header/nav render; dark mode toggles; hook returns typed data or error state

Risks/Flags:

- Theming clashes with component libs; ensure accessible contrast and focus outlines.

Links: [[../roadmap/next]], [[../adr/ADR-frontend-stack]], [[../adr/ADR-20250927-frontend-bundler]]
