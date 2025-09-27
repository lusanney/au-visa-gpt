# RAG Policy

TL;DR:
- Answer only with citations (section + effective date) and show "Last indexed".
- Abstain when retrieval confidence is low; ask clarifying questions.

Retrieval:
- Chunking: section/heading-preserving; keep references.
- Top‑k: start modest; tune later.

Answering:
- Quote relevant text where helpful; never fabricate.

Freshness:
- Reindex cadence (manual/weekly); record last indexed on each source.

Safety:
- No PAM3 or non‑public policy content.
