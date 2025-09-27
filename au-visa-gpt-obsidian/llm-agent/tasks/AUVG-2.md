---
id: AUVG-2
tags: [task, roadmap/next]
status: done
---
# Task: Platform foundation (DB, migrations, env)

TL;DR:
- Choose DB toolkit (Drizzle or Prisma), scaffold `web/src/server/db`, add minimal migrations, and a validated env loader. Design schema multi-tenant ready with a seeded default user. Documents belong to applications (not users directly). Add document classification fields.

Background:
- We need a minimal persistence layer and configuration loader to support upload → OCR → chat without RAG.

Acceptance criteria:
- Decision recorded (Drizzle vs Prisma) and reflected in dependencies.
- `web/src/server/db/` contains client setup and migration runner scripts.
- Minimal tables exist: `users`, `documents`, `ingestion_jobs`, `ocr_results`, `applications`.
- `users` table seeded with a default user (me) using a stable UUID (from env or constant). All operations run as this user until auth exists.
- Tenancy model:
  - `applications` includes `user_id` FK to `users(id)`
  - `documents` includes `application_id` FK to `applications(id)` (documents are scoped to an application)
  - `ingestion_jobs` and `ocr_results` reference `document_id` and derive application/user via joins
  - Indexes support per-application filtering (e.g., `documents(application_id)`) and efficient joins for per-user queries
- Seed a default application for the default user (name: "My Application"), and use it as default when none is specified in MVP flows.
- `documents` includes classification fields:
  - `category` (enum): identity | financial | employment | form | police | education | residential | health | other | unclassified (default: unclassified)
  - `type_code` (text, optional): fine-grained code such as `bank_statement`, `pay_slip`, `passport`, `form_80`, `police_check_national`
  - `tags` (text[] or jsonb, optional): free-form labels for future refinement
 - `documents` includes UX/management fields:
   - `source` (text, default: `upload`): origin of the file (upload | youtube | crawler)
   - `title` (text, optional): human-friendly label for UI
   - `deleted_at` (timestamptz, nullable): soft-delete timestamp
   - `metadata` (jsonb, default `{}`): extensible hints (e.g., language, initial page count)
- `web/src/server/env.ts` validates required vars (database URL, model keys) and exports typed config.
- Local README updated with commands for migrate up/down.

BDD (Given / When / Then):
- Given a fresh environment with Postgres running
- When I run the migration command
- Then the five minimal tables exist and the app can connect using the env loader
- And a default user exists
- And a default application exists for that user
- And newly created documents are associated to the default application when none is provided
- And a newly inserted document defaults to `category = unclassified` with null `type_code`
 - And a newly inserted document defaults to `source = upload` and `metadata = {}`
- And updating a document to `category = financial` and `type_code = bank_statement` succeeds
 - And soft-deleting a document sets `deleted_at` without removing the row

Test plan (AAA):
- // Arrange - start Postgres via compose; set `.env` with DB URL
- // Act - run migration up; instantiate DB client in a smoke script
- // Assert - tables exist; default user row exists; default application row exists for that user; inserting a `documents` row without `application_id` associates it to the default application; document defaults to `unclassified`, `source = upload`, and `metadata = {}`; updating classification persists; soft delete sets `deleted_at`; `env.ts` throws on missing values

Risks/Flags:
- Toolkit choice implications (type-safety, migration ergonomics) and Apple Silicon container differences.
- Future auth/tenancy model may require backfill of `user_id` defaults and/or introduction of organizations/workspaces; keep schema evolvable.
- Classification taxonomy will evolve; using `type_code` + `tags` reduces churn compared to hard-coding many enums.

Links: [[../roadmap/next]], [[../adr/ADR-data-stores]], [[../adr/ADR-20250927-backend-runtime]], [[../adr/ADR-node-python-split]]


