import mongoose, { Document, Model, Schema } from "mongoose";

export interface ILifeAtPhoto extends Document {
  imageUrl: string;
  caption?: string;
  order: number;
}

const LifeAtPhotoSchema = new Schema<ILifeAtPhoto>(
  {
    imageUrl: { type: String, required: true },
    caption: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const LifeAtPhoto: Model<ILifeAtPhoto> =
  mongoose.models.LifeAtPhoto ||
  mongoose.model<ILifeAtPhoto>("LifeAtPhoto", LifeAtPhotoSchema);

export default LifeAtPhoto;
