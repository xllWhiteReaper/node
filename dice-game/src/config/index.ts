import dotenv from "dotenv";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Env file not found");
}

export default {
  port: process.env.API_PORT || 3500,
  mongoDBURI: process.env.MONGODB_URI,
  jwtSignKey: process.env.JWT_SING_KEY,
};
