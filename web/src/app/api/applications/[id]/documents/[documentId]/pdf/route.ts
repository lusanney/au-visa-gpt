import DocumentsService from "@/server/services/documents/documents.service";
import { storage } from "@/server/services/storage/local";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string; documentId: string }> }) {
  const { id: idStr, documentId: docStr } = await context.params;
  const id = Number(idStr);
  const documentId = Number(docStr);
  if (!Number.isFinite(id) || !Number.isFinite(documentId)) return new Response("Invalid id", { status: 400 });
  const row = await DocumentsService.get(id, documentId);
  if (!row) return new Response("Not found", { status: 404 });
  const stream = storage.getStream(row.storageKey);
  return new Response(stream as any, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${row.originalFilename}"`,
    },
  });
}

export async function HEAD(_req: NextRequest, context: { params: Promise<{ id: string; documentId: string }> }) {
  const { id: idStr, documentId: docStr } = await context.params;
  const id = Number(idStr);
  const documentId = Number(docStr);
  if (!Number.isFinite(id) || !Number.isFinite(documentId)) return new Response(null, { status: 400 });
  const row = await DocumentsService.get(id, documentId);
  if (!row) return new Response(null, { status: 404 });
  return new Response(null, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${row.originalFilename}"`,
    },
  });
}
