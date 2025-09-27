---
id: AUVG-2
tags: [task, roadmap/now]
status: in_progress
---
# Task: Simple API → Python hello → UI roundtrip

TL;DR:
- Add `/api/hello` in Next.js that spawns `scripts/hello.py` and returns JSON to the UI; add a button on `/` to call it.

Acceptance criteria:
- `GET /api/hello?name=...` returns `{ message: "hello, <name> from python" }`
- Home page button calls API and renders message

BDD:
- Given the app is running
- When I click “Call Python”
- Then I see a greeting message from Python

Test plan (AAA):
- Smoke: click button and verify message appears

Links: [[../roadmap/now]]
