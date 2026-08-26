import mongoose, { Document, Model, Schema } from "mongoose";

export type BlogStatus = "draft" | "published";

export interface IBlogAuthor {
  name: string;
  profileImage: string;
  role: string;
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  featuredImage: string;
  author: IBlogAuthor;
  publishedAt?: Date;
  category: string;
  subcategory?: string;
  readTime: string;
  status: BlogStatus;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String, default: "" },
    author: {
      name: { type: String, required: true },
      profileImage: { type: String, default: "" },
      role: { type: String, default: "" },
    },
    publishedAt: { type: Date },
    category: { type: String, required: true, trim: true },
    subcategory: { type: String, default: "" },
    readTime: { type: String, default: "5 min read" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

// Unique index on slug
BlogSchema.index({ slug: 1 }, { unique: true });

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
export default Blog;
