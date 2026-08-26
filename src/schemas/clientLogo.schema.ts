import { z } from "zod";

export const clientLogoSchema = z.object({
  logoImage: z.string().min(1, "Logo image is required"),
  clientName: z.string().min(1, "Client name is required"),
  liveUrl: z.string().trim().optional(),
  order: z.number().int().default(0),
});

export type ClientLogoInput = z.infer<typeof clientLogoSchema>;
