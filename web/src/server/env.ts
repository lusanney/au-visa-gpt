import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DEFAULT_USER_ID: z.coerce.number().int().positive().optional(),
  DEFAULT_APPLICATION_ID: z.coerce.number().int().positive().optional(),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = (() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid environment variables: ${parsed.error.message}`);
  }
  return parsed.data;
})();


