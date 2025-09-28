import type { ApplicationRow } from "@/server/services/applications/applications.repository";
import type { ApplicationDto } from "@/shared/types/application";
import { ApplicationProfileSchema } from "@/shared/types/application";

export class ApplicationsMapper {
  private normalizeProfile(raw: unknown): ApplicationDto["profile"] {
    const defaults = { fullName: "", email: "", nationality: "", dateOfBirth: "", phone: undefined } as const;
    const parsed = ApplicationProfileSchema.partial().safeParse(raw);
    return { ...defaults, ...(parsed.success ? parsed.data : {}) };
  }

  toDto(row: ApplicationRow): ApplicationDto {
    return {
      id: row.id,
      visaCode: row.visaCode,
      createdAt: row.createdAt?.toISOString?.() ?? String(row.createdAt),
      updatedAt: row.updatedAt?.toISOString?.() ?? String(row.updatedAt),
      profile: this.normalizeProfile(row.profile),
    };
  }

  toDtos(rows: ApplicationRow[]): ApplicationDto[] {
    return rows.map((r) => this.toDto(r));
  }
}

export default new ApplicationsMapper();
