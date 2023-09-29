import express, { Application } from "express";
import configuration from "../config";

import diceGameRouter from "../routes/dice-game.route";

import { connectDB } from "../db/config";

export default class Server {
  private app: Application;
  private port: String;
  private routes = {
    games: "/api/games",
  };

  constructor() {
    this.app = express();
    this.port = `${configuration.port}`;
    this.useRoutes();
    this.dbConnect();
  }

  start(): void {
    this.app.listen(this.port, () =>
      console.log(`Application started on port ${this.port}`)
    );
  }

  private useRoutes(): void {
    this.app.use(this.routes.games, diceGameRouter);
  }

  async dbConnect(): Promise<void> {
    await connectDB();
  }
}
