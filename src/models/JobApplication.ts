import mongoose, { Document, Model, Schema } from "mongoose";

export type ApplicationStatus = "new" | "reviewed" | "shortlisted" | "rejected" | "hired";
export type ExperienceBracket = "0-1" | "2-3" | "4-5" | "5+";

export interface IJobApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  jobTitleSnapshot: string;
  applicantName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter: string;
  linkedIn?: string;
  portfolio?: string;
  experience: ExperienceBracket;
  status: ApplicationStatus;
  createdAt: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    jobTitleSnapshot: { type: String, required: true },
    applicantName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    resumeUrl: { type: String, required: true },
    coverLetter: { type: String, default: "" },
    linkedIn: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    experience: {
      type: String,
      enum: ["0-1", "2-3", "4-5", "5+"],
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "reviewed", "shortlisted", "rejected", "hired"],
      default: "new",
    },
  },
  { timestamps: true }
);

const JobApplication: Model<IJobApplication> =
  mongoose.models.JobApplication ||
  mongoose.model<IJobApplication>("JobApplication", JobApplicationSchema);

export default JobApplication;
