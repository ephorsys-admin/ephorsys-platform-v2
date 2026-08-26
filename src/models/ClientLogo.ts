import mongoose, { Document, Model, Schema } from "mongoose";

export interface IClientLogo extends Document {
  logoImage: string;
  clientName: string;
  liveUrl?: string;
  order: number;
}

const ClientLogoSchema = new Schema<IClientLogo>(
  {
    logoImage: { type: String, required: true },
    clientName: { type: String, required: true, trim: true },
    liveUrl: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ClientLogo: Model<IClientLogo> =
  mongoose.models.ClientLogo ||
  mongoose.model<IClientLogo>("ClientLogo", ClientLogoSchema);

export default ClientLogo;
