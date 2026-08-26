import { z } from "zod";

export const statSchema = z.object({
  value: z.string().min(1, "Value is required (e.g. '500+' or '98%')"),
  label: z.string().min(1, "Label is required"),
  order: z.number().int().default(0),
});

export type StatInput = z.infer<typeof statSchema>;
