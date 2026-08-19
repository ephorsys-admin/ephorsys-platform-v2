import { z } from "zod";

export const certificationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  imageUrl: z.string().min(1, "Logo image is required"),
  order: z.number().int().default(0),
});

export type CertificationSchemaType = z.infer<typeof certificationSchema>;
