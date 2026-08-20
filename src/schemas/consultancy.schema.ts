import { z } from "zod";

export const CONSULTANCY_SERVICES = [
  "Website",
  "E-commerce Website",
  "Social Media",
  "SEO",
  "Google Ads",
  "Meta Ads",
  "HRMS",
  "CRM",
  "Billing",
  "Fleet Management",
  "Custom Dashboard",
  "ERP",
  "Mobile App",
  "Offshore Development",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "₹25K – ₹50K",
  "₹50K – ₹1L",
  "₹1L – ₹2.5L",
  "₹2.5L – ₹5L",
  "₹5L – ₹10L",
  "₹10L+",
  "Monthly Retainer",
  "$3K – $5K",
  "$5K – $10K",
  "$10K – $25K",
  "$25K+",
] as const;

export const TIMELINES = [
  "Immediate",
  "Within 15 Days",
  "Within 1 Month",
  "Planning Stage",
] as const;

export const consultancySubmissionSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name is required")
    .regex(/^[a-zA-Z\s'-]+$/, "Name cannot contain numbers or special characters"),
  phone: z
    .string()
    .min(1, "Phone / WhatsApp is required")
    .regex(/^\+?\d{7,15}$/, "Enter a valid phone number"),
  email: z
    .string()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),
  companyName: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  country: z.string().min(1, "Country is required"),
  service: z.string().min(1, "Please select a service"),
  budgetRange: z.string().optional().or(z.literal("")),
  timeline: z.string().optional().or(z.literal("")),
  requirements: z.string().optional().or(z.literal("")),
});

export type ConsultancySubmissionInput = z.infer<typeof consultancySubmissionSchema>;
