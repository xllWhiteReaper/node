const dotenv = require("dotenv");

try {
  dotenv.config();
} catch (error) {
  throw new Error("Env file not found");
}

module.exports = {
  mongoUri: process.env.MONGO_DB_URI,
  apiPort: process.env.API_PORT,
};
