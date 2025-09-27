import "server-only";
import { spawn } from "child_process";
import { join } from "path";

type RunPythonOptions = {
  cwd?: string;
  env?: NodeJS.ProcessEnv;
};

export async function runPythonJson<T>(
  scriptRelativePath: string,
  args: string[] = [],
  options: RunPythonOptions = {},
): Promise<T> {
  const pythonBin = process.env.PYTHON_BIN || "python3";
  const defaultCwd = join(process.cwd(), "..");
  const workingDirectory = options.cwd ?? defaultCwd;

  return new Promise<T>((resolve, reject) => {
    const child = spawn(pythonBin, [scriptRelativePath, ...args], {
      cwd: workingDirectory,
      stdio: ["ignore", "pipe", "pipe"],
      env: options.env ?? process.env,
    });

    let stdoutBuffer = "";
    let stderrBuffer = "";

    child.stdout.on("data", (chunk: Buffer) => {
      stdoutBuffer += chunk.toString();
    });

    child.stderr.on("data", (chunk: Buffer) => {
      stderrBuffer += chunk.toString();
    });

    child.on("error", (err) => {
      reject(new Error(err.message || "spawn_error"));
    });

    child.on("close", (code) => {
      if (code === 0) {
        try {
          const parsed = JSON.parse(stdoutBuffer) as T;
          resolve(parsed);
        } catch {
          reject(new Error("invalid_json"));
        }
      } else {
        reject(new Error(stderrBuffer || `exit_${code}`));
      }
    });
  });
}
