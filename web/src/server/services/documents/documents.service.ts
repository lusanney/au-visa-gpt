import * as schema from "@/server/db/schema";
import { storage } from "@/server/services/storage/local";
import DocumentsRepo, { DocumentsRepository } from "./documents.repository";

export class DocumentsService {
  constructor(private readonly repo: DocumentsRepository = DocumentsRepo) {}

  async list(applicationId: number, category?: string) {
    return this.repo.list(applicationId, category);
  }

  async get(applicationId: number, documentId: number) {
    return this.repo.findByIdForApp(applicationId, documentId);
  }

  async upload(applicationId: number, file: File, params: { category: string; typeCode?: string; title?: string }) {
    const saved = await storage.save(file);
    const existing = await this.repo.findBySha(applicationId, saved.sha256);
    if (existing) return existing;
    const row = await this.repo.create({
      applicationId,
      originalFilename: saved.originalFilename,
      mimeType: saved.mimeType,
      byteSize: saved.byteSize,
      sha256: saved.sha256,
      storageKey: saved.storageKey,
      status: "uploaded",
      category: params.category as any,
      typeCode: params.typeCode,
      title: params.title,
      source: "upload",
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    } satisfies typeof schema.documents.$inferInsert);
    // AUVG-5 will enqueue OCR and update statuses; upload returns the created row as-is
    return row;
  }
}

const documentsService = new DocumentsService();
export default documentsService;
