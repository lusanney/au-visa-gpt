import { z } from "zod";

export const DocumentCategorySchema = z.enum([
  "identity",
  "financial",
  "employment",
  "form",
  "police",
  "education",
  "residential",
  "health",
  "other",
  "unclassified",
]);
export type DocumentCategory = z.infer<typeof DocumentCategorySchema>;

export const DocumentDtoSchema = z.object({
  id: z.number().int().positive(),
  applicationId: z.number().int().positive(),
  originalFilename: z.string(),
  mimeType: z.string(),
  byteSize: z.number().nonnegative(),
  sha256: z.string(),
  storageKey: z.string(),
  status: z.string(),
  category: DocumentCategorySchema,
  typeCode: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type DocumentDto = z.infer<typeof DocumentDtoSchema>;
