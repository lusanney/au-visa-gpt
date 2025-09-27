"use client";
import { http } from "@/lib/http";
import type { HelloRequest, HelloResponse } from "@/shared/types/hello";

export async function helloApi(req: HelloRequest): Promise<HelloResponse> {
  const { data } = await http.get<HelloResponse>("/api/hello", { params: { name: req.name } });
  return data;
}


