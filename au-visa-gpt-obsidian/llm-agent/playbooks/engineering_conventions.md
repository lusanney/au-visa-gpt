# Engineering Conventions

- Imports: never use fully qualified package paths; always import modules.
- Tests: defer until after initial implementation unless change is risky; tests must include AAA comments and purpose.
- Docs: write human-first TL;DR; short sections; cross-link notes; keep one purpose per note.
- RAG: answers must include citation (section + effective date) and last indexed; abstain on low confidence.
- IDs: Tasks `T-YYYYMMDD-slug-xxxx`, ADRs `ADR-YYYYMMDD-slug`, Sessions `S-YYYYMM-NN`.
- Obsidian: commit Markdown + community-plugins.json; ignore workspace.json and .obsidian/plugins/.
- BDD verification: after each task, verify the BDD steps (Given/When/Then) either via automated test or manual script; note verification in the task or session log.
- Kanban hygiene: when starting a task, set its status to in_progress and move it to Kanban In Progress; when finishing, set status done and move to Done.

## Layering and boundaries (Endpoint → Service → Repository)

- Endpoints (Next.js `route.ts`) handle HTTP concerns only: parse/validate input, call a service, shape HTTP response. They must NOT call the database or repositories directly.
- Services encapsulate business logic and orchestrate multiple repositories/adapters. Services may call repositories and infrastructure adapters (e.g., storage). Prefer services to return DTOs or domain rows mapped by a mapper when needed.
- Repositories are the only layer that talks to the database driver/ORM (Drizzle). Repos expose CRUD/query methods and return typed rows.
- Mappers convert repo rows ↔ DTOs; keep mapping out of route handlers.
- Validation: use Zod on the edge (routes) and at service boundaries when helpful.

### Example

```ts
// route.ts (endpoint): parse → service → HTTP
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const form = await req.formData();
  const file = form.get("file");
  // validate...
  const doc = await documentsService.upload(Number(id), file as File, {
    category: "unclassified",
  });
  return Response.json(doc, { status: 201 });
}

// documents.service.ts (service): business logic → repo/storage
export class DocumentsService {
  constructor(private readonly repo: DocumentsRepository) {}
  async upload(appId: number, file: File, params: { category: string }) {
    /* ... */
  }
}

// documents.repository.ts (repository): DB-only
export class DrizzleDocumentsRepository {
  /* db.query.documents... */
}
```

### Next.js dynamic route params

- Always `await` `params` in App Router handlers: `const { id } = await params;` to avoid the Next.js error about sync dynamic APIs.

### Application scoping

- Documents and related endpoints/services are always application-scoped: `/api/applications/[id]/documents/*`.
- Never introduce global documents endpoints or services; always validate association with the `applicationId`.
