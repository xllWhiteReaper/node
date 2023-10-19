const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");
const config = require("./config/config.js");
const DatabaseConnectionError = require("./models/error/database-connection-error.js");

const app = express();
app.use(cors());

const DATABASE_NAME = "todoapp";
let database;

async function startApp() {
  try {
    await connectDatabase();
    app.listen(config.apiPort, () => {
      console.log(`App listening on port ${config.apiPort}`);
    });
  } catch (error) {
    if (error instanceof DatabaseConnectionError) {
      console.log("Database connection unsuccessful");
    }
  }
}

async function connectDatabase() {
  try {
    database = await MongoClient.connect(config.mongoUri);
  } catch (error) {
    throw new DatabaseConnectionError(error);
  }
}

startApp();
