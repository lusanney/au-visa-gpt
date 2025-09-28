import { NextRequest } from "next/server";

import { maxUploadBytes } from "@/server/env";
import DocumentsMapper from "@/server/services/documents/documents.mapper";
import DocumentsService from "@/server/services/documents/documents.service";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await context.params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) return Response.json({ error: "Invalid id" }, { status: 400 });
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;
  const rows = await DocumentsService.list(id, category);
  return Response.json(DocumentsMapper.toDtos(rows));
}

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await context.params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) return Response.json({ error: "Invalid id" }, { status: 400 });
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return Response.json({ error: "Expected multipart/form-data" }, { status: 400 });
  }
  const form = await req.formData();
  const file = form.get("file");
  const category = String(form.get("category") || "unclassified");
  const typeCode = (form.get("typeCode") as string) || undefined;
  const title = (form.get("title") as string) || undefined;
  if (!(file instanceof File)) return Response.json({ error: "Missing file" }, { status: 400 });
  if (file.type !== "application/pdf") return Response.json({ error: "Only PDF allowed" }, { status: 400 });
  if (file.size > maxUploadBytes) return Response.json({ error: "File too large" }, { status: 413 });
  const row = await DocumentsService.upload(id, file, { category, typeCode, title });
  return Response.json(DocumentsMapper.toDto(row), { status: 201 });
}
