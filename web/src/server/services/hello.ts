import "server-only";
import type { HelloRequest, HelloResponse } from "@/shared/types/hello";
import { runPythonJson } from "@/server/python";

export async function helloService(req: HelloRequest): Promise<HelloResponse> {
  const data = await runPythonJson<HelloResponse>("scripts/hello.py", ["--name", req.name]);
  return data;
}


