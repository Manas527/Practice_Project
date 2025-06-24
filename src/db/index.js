import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`Connected to MongoDB !! DB NAME: ${DB_NAME}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process with failure
  }
}

export default connectDB;