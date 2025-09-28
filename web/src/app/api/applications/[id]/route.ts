import { NextRequest } from "next/server";

import ApplicationsMapper from "@/server/services/applications/applications.mapper";
import ApplicationsService from "@/server/services/applications/applications.service";
import { UpdateApplicationRequestSchema } from "@/shared/types/application";

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await context.params;
  const id = Number(idStr);
  if (Number.isNaN(id)) {
    return Response.json({ error: "Invalid id" }, { status: 400 });
  }
  const app = await ApplicationsService.getById(id);
  if (!app) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json(ApplicationsMapper.toDto(app));
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await context.params;
  const id = Number(idStr);
  if (Number.isNaN(id)) {
    return Response.json({ error: "Invalid id" }, { status: 400 });
  }
  const body = await req.json();
  const parsed = UpdateApplicationRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const updated = await ApplicationsService.update(id, parsed.data);
  if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(ApplicationsMapper.toDto(updated));
}
