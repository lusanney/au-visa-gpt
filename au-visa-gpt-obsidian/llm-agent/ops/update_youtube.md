# Playbook — Update YouTube Index

Steps:
1) Poll allowlisted channels for new videos; fetch metadata + transcripts.
2) Chunk transcripts by topic/paragraph; embed and upsert to Qdrant as commentary.
3) Record published date; mark lower retrieval weight than legislation.
4) Update session log; add links in source index.

Notes:
- Curate channels; avoid speculation; prefer factual commentary.
- If transcripts are missing/low quality, skip or flag for manual review.
