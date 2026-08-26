import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(2, "Title is required"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  employmentMode: z.enum(["onsite", "remote", "hybrid"]),
  type: z.enum(["full-time", "internship"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  responsibilities: z.array(z.string()).default([]),
  experienceRequired: z.string().default(""),
  isActive: z.boolean().default(true),
  postedAt: z.string().optional(),
});

export const updateJobSchema = createJobSchema.partial();

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
