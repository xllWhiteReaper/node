const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");
const config = require("./config/config.js");

const app = express();
app.use(cors());

app.listen(config.apiPort, () => {
  console.log(`App listening on port ${config.apiPort}`);
});
