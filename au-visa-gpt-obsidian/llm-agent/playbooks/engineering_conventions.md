# Engineering Conventions

- Imports: never use fully qualified package paths; always import modules.
- Tests: defer until after initial implementation unless change is risky; tests must include AAA comments and purpose.
- Docs: write human-first TL;DR; short sections; cross-link notes; keep one purpose per note.
- RAG: answers must include citation (section + effective date) and last indexed; abstain on low confidence.
- IDs: Tasks `T-YYYYMMDD-slug-xxxx`, ADRs `ADR-YYYYMMDD-slug`, Sessions `S-YYYYMM-NN`.
- Obsidian: commit Markdown + community-plugins.json; ignore workspace.json and .obsidian/plugins/.
