import express, { Application } from "express";
import configuration from "../config";
import diceGameRouter from "../routes/dice-game.route";

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
  }

  start() {
    this.app.listen(this.port, () =>
      console.log(`Application started on port ${this.port}`)
    );
  }

  private useRoutes() {
    this.app.use(this.routes.games, diceGameRouter);
  }
}
