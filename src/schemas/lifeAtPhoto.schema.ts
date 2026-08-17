import { z } from "zod";

export const lifeAtPhotoSchema = z.object({
  imageUrl: z.string().min(1, "Image URL is required"),
  caption: z.string().default(""),
  order: z.number().int().default(0),
});

export type LifeAtPhotoInput = z.infer<typeof lifeAtPhotoSchema>;
