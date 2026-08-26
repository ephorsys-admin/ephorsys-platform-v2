import mongoose, { Document, Model, Schema } from "mongoose";

export type JobType = "full-time" | "internship";
export type EmploymentMode = "onsite" | "remote" | "hybrid";

export interface IJob extends Document {
  title: string;
  department: string;
  location: string;
  employmentMode: EmploymentMode;
  type: JobType;
  description: string;
  responsibilities: string[];
  experienceRequired: string;
  isActive: boolean;
  postedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    employmentMode: { type: String, enum: ["onsite", "remote", "hybrid"], required: true },
    type: { type: String, enum: ["full-time", "internship"], required: true },
    description: { type: String, required: true },
    responsibilities: [{ type: String }],
    experienceRequired: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    postedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Job: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
export default Job;
