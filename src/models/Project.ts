import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProject extends Document {
  id: string; // UUID
  title: string;
  slug: string;
  category: "web_dev" | "app_dev" | "seo" | "marketing" | "branding";
  clientName: string;
  clientIndustry: string;
  thumbnailImage: string;
  tagline: string;
  overview: string;
  solution: string;
  role: string;
  teamSize: number;
  startDate: Date;
  endDate: Date;
  durationText: string;
  status: "completed" | "ongoing" | "live";
  isFeatured: boolean;
  isPublished: boolean;
  liveUrl?: string;
  testimonial?: {
    text: string;
    clientName: string;
    clientTitle: string;
    clientPhoto?: string;
  };
  technologies: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      enum: ["web_dev", "app_dev", "seo", "marketing", "branding"],
      required: true,
    },
    clientName: { type: String, required: true },
    clientIndustry: { type: String, required: true },
    thumbnailImage: { type: String, required: true },
    tagline: { type: String, required: true },
    overview: { type: String, required: true },
    solution: { type: String, required: true },
    role: { type: String, required: true },
    teamSize: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    durationText: { type: String, required: true },
    status: {
      type: String,
      enum: ["completed", "ongoing", "live"],
      required: true,
    },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    liveUrl: { type: String },
    testimonial: {
      text: { type: String },
      clientName: { type: String },
      clientTitle: { type: String },
      clientPhoto: { type: String },
    },
    technologies: { type: [String], default: [] },
  },
  { timestamps: true }
);

const ProjectModel: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default ProjectModel;
