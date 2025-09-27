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
- Right/left panel displays structured meta from the last answer; copy/share support.
- Error/empty/loading states included; mobile-friendly layout.

BDD (Given / When / Then):
- Given the chat page
- When I ask a question
- Then I see tokens stream, and the structured panels populate upon completion

Test plan (AAA):
- // Arrange - render chat page; mock chat API stream
- // Act - send a prompt and collect stream
- // Assert - messages render incrementally; panels show meta; errors render friendly states

Risks/Flags:
- Streaming robustness and mobile ergonomics.

Links: [[../roadmap/next]], [[AUVG-7]], [[AUVG-8]]


