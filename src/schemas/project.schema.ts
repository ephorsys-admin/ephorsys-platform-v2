import { z } from "zod";

export const projectCategorySchema = z.enum(["web_dev", "app_dev", "seo", "marketing", "branding"]);
export const projectStatusSchema = z.enum(["completed", "ongoing", "live"]);

export const testimonialSchema = z.object({
  text: z.string().optional().default(""),
  clientName: z.string().optional().default(""),
  clientTitle: z.string().optional().default(""),
  clientPhoto: z.string().optional().default(""),
});

export const createProjectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  category: projectCategorySchema,
  clientName: z.string().min(2, "Client name is required"),
  clientIndustry: z.string().min(2, "Client industry is required"),
  thumbnailImage: z.string().min(1, "Thumbnail image is required"),
  tagline: z.string().min(5, "Tagline must be at least 5 characters"),
  overview: z.string().min(10, "Overview must be at least 10 characters"),
  solution: z.string().min(10, "Solution must be at least 10 characters"),
  role: z.string().min(2, "Role is required"),
  teamSize: z.coerce.number().min(1, "Team size must be at least 1"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  durationText: z.string().min(1, "Duration description is required"),
  status: projectStatusSchema,
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  liveUrl: z.string().optional().default(""),
  testimonial: testimonialSchema.optional(),
  technologies: z.array(z.string()).default([]),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
