const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");
const config = require("./config/config.js");

const app = express();
app.use(cors());

const DATABASE_NAME = "todoapp";
let database;

app.listen(config.apiPort, () => {
  console.log("Before mongo");
  MongoClient.connect(config.mongoUri, (error, client) => {
    database = client.db();
    console.log("Mongo correctly connected");
    if (error) {
      console.log(error);
    }
  });
  console.log(`App listening on port ${config.apiPort}`);
});
