import { z } from "zod";

export const contactSubmissionSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name is required")
    .regex(/^[a-zA-Z\s'-]+$/, "Name cannot contain numbers"),
  email: z.string().email("Valid email required"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
  service: z.string().min(1, "Please select a service"),
  projectDetails: z.string().min(10, "Please describe your project"),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
