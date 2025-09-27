import "server-only";
import { runPythonJson } from "@/server/python";
import type { HelloRequest, HelloResponse } from "@/shared/types/hello";

export async function helloService(req: HelloRequest): Promise<HelloResponse> {
  const data = await runPythonJson<HelloResponse>("scripts/hello.py", ["--name", req.name]);
  return data;
}
