import mongoose, { Document, Model, Schema } from "mongoose";

export type ConsultancyStatus = "new" | "contacted" | "in-progress" | "closed";

export interface IConsultancySubmission extends Document {
  fullName: string;
  phone: string;
  email?: string;
  companyName?: string;
  city?: string;
  country: string;
  service: string;
  budgetRange?: string;
  timeline?: string;
  requirements?: string;
  status: ConsultancyStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ConsultancySubmissionSchema = new Schema<IConsultancySubmission>(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    companyName: { type: String, trim: true },
    city: { type: String, trim: true },
    country: { type: String, required: true, trim: true, default: "India" },
    service: { type: String, required: true },
    budgetRange: { type: String },
    timeline: { type: String },
    requirements: { type: String, trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "in-progress", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

const ConsultancySubmission: Model<IConsultancySubmission> =
  mongoose.models.ConsultancySubmission ||
  mongoose.model<IConsultancySubmission>("ConsultancySubmission", ConsultancySubmissionSchema);

export default ConsultancySubmission;
