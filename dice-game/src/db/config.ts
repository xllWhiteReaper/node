import { connect } from "mongoose";
import config from "../config";

export const connectDB = async () => {
  try {
    await connect(config.mongoDBURI ?? "");
  } catch (error) {
    console.log(error);
  }
};
