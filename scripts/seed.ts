/**
 * Seed script — run once to create the initial admin user.
 * Usage: npx tsx scripts/seed.ts
 *
 * Reads ADMIN_EMAIL and ADMIN_PASSWORD from .env.local
 */

import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

// Load .env.local manually
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("❌  Missing MONGODB_URI, ADMIN_EMAIL, or ADMIN_PASSWORD in .env.local");
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: "admin" },
});

async function seed() {
  await mongoose.connect(MONGODB_URI as string);
  console.log("✅  Connected to MongoDB");

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log(`ℹ️   Admin user ${ADMIN_EMAIL} already exists. Skipping.`);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD as string, 12);
  await User.create({ email: ADMIN_EMAIL, passwordHash, role: "admin" });

  console.log(`✅  Admin user created: ${ADMIN_EMAIL}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});
