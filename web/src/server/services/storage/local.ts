import { createHash, randomUUID } from "crypto";
import { createReadStream, createWriteStream, existsSync, mkdirSync, statSync } from "fs";
import { join } from "path";

import { env, maxUploadBytes } from "@/server/env";

export interface SavedFileInfo {
  storageKey: string;
  sha256: string;
  byteSize: number;
  mimeType: string;
  originalFilename: string;
}

export interface StorageAdapter {
  save(file: File): Promise<SavedFileInfo>;
  getStream(storageKey: string): NodeJS.ReadableStream;
  delete(storageKey: string): Promise<void>;
}

export class LocalDiskStorage implements StorageAdapter {
  private baseDir: string;

  constructor(baseDir = env.UPLOAD_DIR) {
    this.baseDir = baseDir;
    if (!existsSync(this.baseDir)) {
      mkdirSync(this.baseDir, { recursive: true });
    }
  }

  async save(file: File): Promise<SavedFileInfo> {
    if (file.type !== "application/pdf") {
      throw new Error("Only PDF files are allowed");
    }
    if (file.size > maxUploadBytes) {
      throw new Error("File too large");
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const sha256 = createHash("sha256").update(buffer).digest("hex");
    const storageKey = `${randomUUID()}.pdf`;
    const fullPath = join(this.baseDir, storageKey);
    await new Promise<void>((resolve, reject) => {
      const out = createWriteStream(fullPath);
      out.on("finish", () => resolve());
      out.on("error", (err) => reject(err));
      out.write(buffer);
      out.end();
    });
    const st = statSync(fullPath);
    return {
      storageKey,
      sha256,
      byteSize: st.size,
      mimeType: file.type,
      originalFilename: (file as any).name || "document.pdf",
    };
  }

  getStream(storageKey: string) {
    const fullPath = join(this.baseDir, storageKey);
    return createReadStream(fullPath);
  }

  async delete(storageKey: string) {
    // no-op for MVP
    return;
  }
}

export const storage = new LocalDiskStorage();
