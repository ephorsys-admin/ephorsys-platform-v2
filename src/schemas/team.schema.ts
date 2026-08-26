import { z } from "zod";

export const teamMemberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  position: z.string().min(2, "Position is required"),
  photo: z.string().default(""),
  linkedIn: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  category: z.enum(["leader", "core", "core-developer", "core-digital-marketing", "core-business-development-executive"]),
  order: z.number().int().default(0),
});

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
