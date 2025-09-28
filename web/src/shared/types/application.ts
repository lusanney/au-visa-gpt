import { z } from "zod";

export const ApplicationProfileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  nationality: z.string().min(2, "Nationality is required"),
  dateOfBirth: z.string().min(4, "Date of birth is required"),
  phone: z.string().min(6).optional(),
});
export type ApplicationProfile = z.infer<typeof ApplicationProfileSchema>;

export const NewApplicationRequestSchema = z.object({
  visaCode: z.string().min(1, "Visa code is required"),
  profile: ApplicationProfileSchema,
});

export const UpdateApplicationRequestSchema = z.object({
  visaCode: z.string().min(1).optional(),
  profile: ApplicationProfileSchema.partial().optional(),
});

export type NewApplicationRequest = z.infer<typeof NewApplicationRequestSchema>;
export type UpdateApplicationRequest = z.infer<typeof UpdateApplicationRequestSchema>;

export const ApplicationDtoSchema = z.object({
  id: z.number().int().positive(),
  visaCode: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  profile: ApplicationProfileSchema,
});

export type ApplicationDto = z.infer<typeof ApplicationDtoSchema>;
