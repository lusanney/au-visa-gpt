---
id: AUVG-6
tags: [task, roadmap/next]
status: todo
---
# Task: Eligibility and required-docs checklist definitions

TL;DR:
- Define a typed checklist model and seed for target visas (start with Subclass 191); expose read API.

Background:
- The checklist drives the assistant to propose action items and missing documents for MVP.

Acceptance criteria:
- Typed schema defined (DB-backed or typed JSON in `web/src/shared/types/checklists.ts`).
- Seed for Subclass 191 with eligibility criteria and required documents, including document categories and type codes that match `documents` classification.
- API `web/src/app/api/checklists/[visa]/route.ts` returns the structured checklist.
- Docs explaining how to update and extend checklists.

BDD (Given / When / Then):
- Given the checklist exists for visa 191
- When a client requests it
- Then the API returns a typed structure with eligibility rules and document list

Test plan (AAA):
- // Arrange - seed checklist; spin up API route
- // Act - GET the checklist for 191
- // Assert - response validates against schema; includes eligibility and docs required with `category` and `typeCode` hints that align with DB classification

Risks/Flags:
- Criteria modeling complexity; keep MVP schema simple and evolvable.

Links: [[../roadmap/next]], [[../business/visa-191]]


