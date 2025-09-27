### au-visa-gpt — AI assistant for Australian visa applications

This project is a focused assistant to help applicants prepare Australian visa applications faster and with greater confidence. It starts with default GPT reasoning (no RAG/fine‑tuning yet) and a lean feature set that guides users from document upload → OCR → actionable advice tailored to a target visa.

### Purpose
- Provide clear, personalized guidance on eligibility and required documents for a target visa (initially Subclass 191)
- Reduce confusion and back‑and‑forth by surfacing confidence, action items, and missing documents early
- Keep the experience simple and private for early users (local/dev only; no public release yet)

### What it offers (MVP)
- Document intake: upload PDFs/images; categorize (identity, financial, employment, forms, police, education, residential, health)
- OCR extraction: turn uploaded documents into text usable by the assistant (no retrieval layer yet)
- Visa checklist guidance: structured rules and required docs for Subclass 191, expandable later
- GPT assistance: default GPT‑5 reasoning generates advice without retrieval; streaming UI comes next
- Structured results: confidence score, action items, and missing‑document suggestions
- Application profile: capture applicant basics to contextualize advice
- Single maintainer, single user for now; data model can support multiple users and applications later

### Why this solves the pain
- Visa criteria are complex and scattered; applicants waste hours interpreting requirements
- Missing or mis‑categorized documents cause delays and rework
- A clear checklist with immediate feedback (confidence + next steps) reduces uncertainty
- Starting lean (no RAG/fine‑tuning) delivers practical value quickly, while keeping a path open for future retrieval and model adaptation

### Later (not in MVP)
- Retrieval‑augmented generation (chunking, embeddings, vector search)
- Fine‑tuning experiments and evaluation harness
- Public readiness (auth, rate limiting, observability) once the core experience is solid
