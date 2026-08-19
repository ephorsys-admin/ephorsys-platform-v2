import mongoose, { Document, Model, Schema } from "mongoose";

export interface IHeroStat extends Document {
  value: string;
  label: string;
  order: number;
}

const HeroStatSchema = new Schema<IHeroStat>(
  {
    value: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const HeroStat: Model<IHeroStat> = mongoose.models.HeroStat || mongoose.model<IHeroStat>("HeroStat", HeroStatSchema);
export default HeroStat;
