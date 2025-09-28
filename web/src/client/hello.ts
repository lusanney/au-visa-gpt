"use client";

import { http } from "@/lib/http";
import type { HelloRequest, HelloResponse } from "@/shared/types/hello";
import { useQuery } from "@tanstack/react-query";

export async function helloApi(req: HelloRequest): Promise<HelloResponse> {
  const { data } = await http.get<HelloResponse>("/api/hello", {
    params: { name: req.name },
  });
  return data;
}

export function useHello(name: string) {
  return useQuery({
    queryKey: ["hello", name],
    queryFn: () => helloApi({ name }),
  });
}
