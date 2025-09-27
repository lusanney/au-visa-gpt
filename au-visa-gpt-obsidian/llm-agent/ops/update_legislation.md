# Playbook — Update Legislation

Steps:
1) Fetch latest Act/Regs (official register); record versions/effective dates.
2) Parse → chunk (preserve headings/sections) → embed → upsert to Qdrant.
3) Tag each chunk with source URL, section ref, effective date, last indexed.
4) Update session log and source index; spot‑check citations.

Notes:
- Avoid non‑public policy content.
- Keep a small eval set to verify citations after updates.
