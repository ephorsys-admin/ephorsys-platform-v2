import { z } from "zod";

export const heroStatSchema = z.object({
  value: z.string().min(1, "Value is required"),
  label: z.string().min(1, "Label is required"),
  order: z.number().int().default(0),
});

export type HeroStatInput = z.infer<typeof heroStatSchema>;
