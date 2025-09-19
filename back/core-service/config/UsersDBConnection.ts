import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("❌ MONGO_URI is not defined in .env");
}
export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Connection error:", err);
    process.exit(1); // exit process if db connection fails
  }
};