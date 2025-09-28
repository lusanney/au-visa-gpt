import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DEFAULT_USER_ID: z.coerce.number().int().positive().optional(),
  DEFAULT_APPLICATION_ID: z.coerce.number().int().positive().optional(),
  // Upload-related (MVP defaults)
  MAX_UPLOAD_MB: z.coerce.number().int().positive().default(60),
  UPLOAD_DIR: z.string().min(1).default(".uploads"),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = (() => {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid environment variables: ${parsed.error.message}`);
  }
  return parsed.data;
})();

export const maxUploadBytes: number = env.MAX_UPLOAD_MB * 1024 * 1024;
