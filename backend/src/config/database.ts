import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri: string = process.env.MONGO_URI!;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ MongoDB connection error:", errorMessage);
    process.exit(1);
  }
};