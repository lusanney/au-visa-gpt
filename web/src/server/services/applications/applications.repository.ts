import type { ApplicationProfile } from "@/shared/types/application";
import { desc, eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

import { db } from "../../db/client";
import * as schema from "../../db/schema";

export type ApplicationRow = typeof schema.applications.$inferSelect;

export interface ApplicationsRepository {
  findManyByUserId(userId: number, limit?: number): Promise<ApplicationRow[]>;
  findById(id: number): Promise<ApplicationRow | undefined>;
  create(params: { userId: number; visaCode: string; profile: Record<string, unknown> }): Promise<ApplicationRow>;
  update(
    id: number,
    changes: { visaCode?: string; profile?: Record<string, unknown> },
  ): Promise<ApplicationRow | undefined>;
}

export class DrizzleApplicationsRepository implements ApplicationsRepository {
  constructor(private readonly db: NodePgDatabase<typeof schema>) {}

  async findManyByUserId(userId: number, limit = 50): Promise<ApplicationRow[]> {
    return this.db.query.applications.findMany({
      where: eq(schema.applications.userId, userId),
      orderBy: desc(schema.applications.id),
      limit,
    });
  }

  async findById(id: number): Promise<ApplicationRow | undefined> {
    return this.db.query.applications.findFirst({ where: eq(schema.applications.id, id) });
  }

  async create(params: { userId: number; visaCode: string; profile: ApplicationProfile }): Promise<ApplicationRow> {
    const [row] = await this.db
      .insert(schema.applications)
      .values({ userId: params.userId, visaCode: params.visaCode, profile: params.profile })
      .returning();
    return row;
  }

  async update(
    id: number,
    changes: { visaCode?: string; profile?: ApplicationProfile },
  ): Promise<ApplicationRow | undefined> {
    const toSet: Partial<typeof schema.applications.$inferInsert> = {};
    if (typeof changes.visaCode !== "undefined") {
      toSet.visaCode = changes.visaCode;
    }
    if (typeof changes.profile !== "undefined") {
      toSet.profile = changes.profile;
    }
    if (Object.keys(toSet).length === 0) {
      return this.findById(id);
    }
    // Touch updatedAt
    toSet.updatedAt = new Date();
    const [row] = await this.db
      .update(schema.applications)
      .set(toSet)
      .where(eq(schema.applications.id, id))
      .returning();
    return row;
  }
}

export default new DrizzleApplicationsRepository(db);
