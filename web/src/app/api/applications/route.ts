import { NextRequest } from "next/server";
import { z } from "zod";

import { env } from "@/server/env";
import ApplicationsMapper from "@/server/services/applications/applications.mapper";
import ApplicationsService from "@/server/services/applications/applications.service";
import { NewApplicationRequestSchema } from "@/shared/types/application";

const QuerySchema = z.object({ limit: z.coerce.number().int().min(1).max(100).optional() });

export async function GET(req: NextRequest) {
  const userId = Number(env.DEFAULT_USER_ID || 1);
  const { searchParams } = new URL(req.url);
  const parsed = QuerySchema.safeParse(Object.fromEntries(searchParams.entries()));
  const limit = parsed.success && parsed.data.limit ? parsed.data.limit : 50;
  const rows = await ApplicationsService.listByUser(userId, limit);
  return Response.json(ApplicationsMapper.toDtos(rows));
}

export async function POST(req: NextRequest) {
  const userId = Number(env.DEFAULT_USER_ID || 1);
  const body = await req.json();
  const parsed = NewApplicationRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const created = await ApplicationsService.create({
    userId,
    visaCode: parsed.data.visaCode,
    profile: parsed.data.profile,
  });
  return Response.json(ApplicationsMapper.toDto(created), { status: 201 });
}
