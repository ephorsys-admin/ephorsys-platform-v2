import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITestimonial extends Document {
  clientPhoto: string;
  feedbackText: string;
  clientName: string;
  isActive: boolean;
  order: number;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientPhoto: { type: String, default: "" },
    feedbackText: { type: String, required: true },
    clientName: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
