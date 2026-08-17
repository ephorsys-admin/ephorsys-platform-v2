import { z } from "zod";

export const testimonialSchema = z.object({
  clientPhoto: z.string().default(""),
  feedbackText: z.string().min(10, "Feedback text is required"),
  clientName: z.string().min(2, "Client name is required"),
  isActive: z.boolean().default(true),
  order: z.number().int().default(0),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
