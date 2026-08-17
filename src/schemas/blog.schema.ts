import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens only"),
  shortDescription: z.string().min(10, "Short description required"),
  content: z.string().min(20, "Content is required"),
  featuredImage: z.string().default(""),
  author: z.object({
    name: z.string().min(1, "Author name required"),
    profileImage: z.string().default(""),
    role: z.string().default(""),
  }),
  publishedAt: z.string().optional(),
  category: z.string().min(1, "Category required"),
  subcategory: z.string().default(""),
  readTime: z.string().default("5 min read"),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const updateBlogSchema = createBlogSchema.partial();

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
