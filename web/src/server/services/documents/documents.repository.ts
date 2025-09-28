import { and, desc, eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

import { db } from "@/server/db/client";
import * as schema from "@/server/db/schema";

export type DocumentRow = typeof schema.documents.$inferSelect;

export interface DocumentsRepository {
  list(applicationId: number, category?: string): Promise<DocumentRow[]>;
  findBySha(applicationId: number, sha256: string): Promise<DocumentRow | undefined>;
  findByIdForApp(applicationId: number, documentId: number): Promise<DocumentRow | undefined>;
  create(values: typeof schema.documents.$inferInsert): Promise<DocumentRow>;
}

export class DrizzleDocumentsRepository implements DocumentsRepository {
  constructor(private readonly db: NodePgDatabase<typeof schema>) {}

  async list(applicationId: number, category?: string): Promise<DocumentRow[]> {
    const where = category
      ? and(eq(schema.documents.applicationId, applicationId), eq(schema.documents.category, category as any))
      : eq(schema.documents.applicationId, applicationId);
    return this.db.query.documents.findMany({ where, orderBy: desc(schema.documents.id) });
  }

  async findBySha(applicationId: number, sha256: string): Promise<DocumentRow | undefined> {
    return this.db.query.documents.findFirst({
      where: and(eq(schema.documents.applicationId, applicationId), eq(schema.documents.sha256, sha256)),
    });
  }

  async findByIdForApp(applicationId: number, documentId: number): Promise<DocumentRow | undefined> {
    return this.db.query.documents.findFirst({
      where: and(eq(schema.documents.applicationId, applicationId), eq(schema.documents.id, documentId)),
    });
  }

  async create(values: typeof schema.documents.$inferInsert): Promise<DocumentRow> {
    const [row] = await this.db.insert(schema.documents).values(values).returning();
    return row;
  }
}

export default new DrizzleDocumentsRepository(db);
