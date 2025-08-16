import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
  throw new Error("DATABASE_URL is not defined in .env");
}

export default async function dbConnect() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return mongoose.connection;
    }

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");
    return mongoose.connection;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}
