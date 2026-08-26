import mongoose, { Document, Model, Schema } from "mongoose";

export interface IStat extends Document {
  value: string;
  label: string;
  order: number;
}

const StatSchema = new Schema<IStat>(
  {
    value: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Stat: Model<IStat> = mongoose.models.Stat || mongoose.model<IStat>("Stat", StatSchema);
export default Stat;
