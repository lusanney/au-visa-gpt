import type { DocumentDto } from "@/shared/types/document";
import type { DocumentRow } from "./documents.repository";

export class DocumentsMapper {
  toDto(row: DocumentRow): DocumentDto {
    return {
      id: row.id,
      applicationId: row.applicationId,
      originalFilename: row.originalFilename,
      mimeType: row.mimeType,
      byteSize: Number(row.byteSize),
      sha256: row.sha256,
      storageKey: row.storageKey,
      status: row.status,
      category: row.category as any,
      typeCode: row.typeCode || undefined,
      title: row.title || undefined,
      createdAt: row.createdAt?.toISOString?.() ?? String(row.createdAt),
      updatedAt: row.updatedAt?.toISOString?.() ?? String(row.updatedAt),
    };
  }

  toDtos(rows: DocumentRow[]): DocumentDto[] {
    return rows.map((r) => this.toDto(r));
  }
}

export default new DocumentsMapper();
