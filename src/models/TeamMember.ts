import mongoose, { Document, Model, Schema } from "mongoose";

export type TeamCategory = "leader" | "core";

export interface ITeamMember extends Document {
  name: string;
  position: string;
  photo: string;
  linkedIn?: string;
  category: TeamCategory;
  order: number;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    photo: { type: String, default: "" },
    linkedIn: { type: String, default: "" },
    category: { type: String, enum: ["leader", "core"], required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const TeamMember: Model<ITeamMember> =
  mongoose.models.TeamMember ||
  mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);

export default TeamMember;
