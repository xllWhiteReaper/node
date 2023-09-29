import { connect } from "mongoose";
import config from "../config";

export const connectDB = async () => {
  try {
    await connect(config.mongoDBURI ?? "");
    console.log("Database connection successfully executed");
  } catch (error) {
    console.log("Error in connecting database");
  }
};
