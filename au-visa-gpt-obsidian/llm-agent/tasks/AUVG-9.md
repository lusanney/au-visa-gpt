---
id: AUVG-9
tags: [task, roadmap/next]
status: todo
---

# Task: Chat UI with streaming and structured results

TL;DR:

- Build chat page at `web/src/app/chat/page.tsx` with streaming messages and side panels for Confidence, Action Items, and Missing Docs.

Background:

- The UI must clearly surface structured results in addition to free-form assistant output.

Acceptance criteria:

- Streaming chat with markdown rendering and basic formatting.
- Allow the user to select an `applicationId` (or default to the active application) and optionally select `documentIds[]` to include.
- Calls the app-scoped endpoint `POST /api/applications/[id]/chat` (see AUVG-7) with `{ documentIds[], visaCode, question }`.
- Right/left panel displays structured meta from the last answer; copy/share support.
- Error/empty/loading states included; mobile-friendly layout.

BDD (Given / When / Then):

- Given the chat page
- When I select an application and ask a question
- Then I see tokens stream, and the structured panels populate upon completion

Test plan (AAA):

- // Arrange - render chat page; mock app-scoped chat API stream
- // Act - send a prompt with an application selected and collect stream
- // Assert - messages render incrementally; panels show meta; errors render friendly states

Risks/Flags:

- Streaming robustness and mobile ergonomics.

Links: [[../roadmap/next]], [[AUVG-7]], [[AUVG-8]], [[AUVG-4]], [[AUVG-5]]
