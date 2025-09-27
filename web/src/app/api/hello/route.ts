import { NextRequest } from "next/server";
import type { HelloRequest } from "@/shared/types/hello";
import { helloService } from "@/server/services/hello";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = (searchParams.get("name") || "world") as HelloRequest["name"];
  try {
    const data = await helloService({ name });
    return Response.json(data, { status: 200 });
  } catch (e: any) {
    return Response.json({ error: e?.message || "unknown_error" }, { status: 500 });
  }
}
