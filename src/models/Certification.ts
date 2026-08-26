import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICertification extends Document {
  name: string;
  imageUrl: string;
  order: number;
}

const CertificationSchema = new Schema<ICertification>(
  {
    name: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

if (mongoose.models.Certification) {
  delete (mongoose.models as any).Certification;
}

const Certification: Model<ICertification> =
  mongoose.model<ICertification>("Certification", CertificationSchema);

export default Certification;
