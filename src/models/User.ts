import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: "admin";
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: true }
);

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
