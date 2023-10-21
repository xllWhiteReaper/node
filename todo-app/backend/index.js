const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");
const config = require("./config/config.js");
const DatabaseConnectionError = require("./models/error/database-connection-error.js");
const upload = multer();

const app = express();
app.use(cors());
app.use(express.json());

const DATABASE_NAME = "todoapp";
let database;
let collection;

async function startApp() {
  try {
    await connectDatabase();
    await connectCollection();
    app.listen(config.apiPort, () => {
      console.log(`App listening on port ${config.apiPort}`);
    });
    useRoutes();
  } catch (error) {
    if (error instanceof DatabaseConnectionError) {
      console.log("Database connection unsuccessful");
    }
  }
}

async function connectDatabase() {
  try {
    const client = await MongoClient.connect(config.mongoUri);
    database = client.db();
  } catch (error) {
    throw new DatabaseConnectionError(error);
  }
}

async function connectCollection() {
  collection = await database.collection("todos");
}

function useRoutes() {
  app.get("/api/notes", async (req, res) => {
    const notes = await collection
      .find({}, { projection: { _id: 0 } })
      .toArray();
    res.status(200).json(notes);
  });

  app.post("/api/notes", async (req, res) => {
    const description = req.body.newNoteDescription;

    if (!description) {
      return res.status(400).json({
        error: "The newNoteDescription field is required",
      });
    }

    const databaseMaxIdInformation = await collection
      .aggregate([
        {
          $group: {
            _id: null,
            maxId: { $max: "$id" },
          },
        },
      ])
      .toArray();
    const highestIdInDatabase =
      databaseMaxIdInformation.length === 0
        ? 0
        : parseInt(databaseMaxIdInformation[0].maxId);

    if (isNaN(highestIdInDatabase)) {
      return res.status(500).json({
        error: "The note could not be created, please try again later",
      });
    }

    const insertedUser = await collection.insertOne({
      id: `${highestIdInDatabase + 1}`,
      description,
    });

    return insertedUser
      ? res.status(201).json({
          msg: "Success",
        })
      : res.status(500).json({
          error: "The note could not be created, please try again later",
        });
  });

  app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        error: "The id is required as a param",
      });
    }

    try {
      await collection.deleteOne({ id });
    } catch (error) {
      return res.status(500).json({
        error: "Error deleting the note",
      });
    }
    return res.status(204).send();
  });
}

startApp();
