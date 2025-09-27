---
id: AUVG-7
tags: [task, roadmap/next]
status: todo
---
# Task: GPT application assistant API (no retrieval)

TL;DR:
- Implement `web/src/app/api/chat/route.ts` that composes a prompt from application profile, OCR text, and visa checklist; call default GPT reasoning model and stream response.

Background:
- For MVP we rely on default GPT reasoning, not RAG. Inputs come from uploaded/ocr’d docs and a visa-specific checklist.

Acceptance criteria:
- POST `/api/chat` accepts: `applicationId`, `documentIds[]`, `visaCode` (e.g., 191), optional user question.
- Server assembles prompt with safety/formatting guardrails and streams tokens.
- Handles long inputs via summarization or truncation rules; logs token usage locally (dev).
- Returns base message plus a structured `meta` envelope (ready for AUVG-8 enrichment).

BDD (Given / When / Then):
- Given an application with OCR’d docs and a checklist
- When I call the chat API with a question
- Then I receive a streamed answer without retrieval, and the request gracefully handles long inputs

Test plan (AAA):
- // Arrange - seed application, docs, and checklist; mock provider
- // Act - POST to `/api/chat` with realistic payload; stream collect
- // Assert - response matches schema; stream completes; truncation rules applied when inputs are large

Risks/Flags:
- Prompt size constraints; ensure predictable truncation and summarization.

Links: [[../roadmap/next]], [[../sessions/2025-09]], [[../llm-agent/README]]


