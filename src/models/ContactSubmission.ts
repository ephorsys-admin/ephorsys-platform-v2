import mongoose, { Document, Model, Schema } from "mongoose";

export type ContactStatus = "new" | "responded" | "closed";

export interface IContactSubmission extends Document {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  projectDetails: string;
  status: ContactStatus;
  createdAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true },
    projectDetails: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "responded", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

const ContactSubmission: Model<IContactSubmission> =
  mongoose.models.ContactSubmission ||
  mongoose.model<IContactSubmission>("ContactSubmission", ContactSubmissionSchema);

export default ContactSubmission;
