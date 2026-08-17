import { z } from "zod";

export const createApplicationSchema = z.object({
  applicantName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
  coverLetter: z.string().default(""),
  linkedIn: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  portfolio: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  experience: z.enum(["0-1", "2-3", "4-5", "5+"]),
  // resumeUrl comes from Cloudinary upload, validated separately
  resumeUrl: z.string().min(1, "Resume is required"),
  resumeFile: z.any().optional(),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;

