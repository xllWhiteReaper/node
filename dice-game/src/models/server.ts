import express, { Application } from "express";
import cors from "cors";
import configuration from "../config";

import diceGameRouter from "../routes/dice-game.route";
import error404Router from "../routes/error404.route";
import testRouter from "../routes/test.route";

import { connectDB } from "../db/config";

export default class Server {
  private app: Application;
  private port: String;
  private routes = {
    test: "/api/test",
    games: "/api/games",
    auth: "/api/auth",
    users: "/api/users",
    error404: "*",
  };

  constructor() {
    this.app = express();
    this.port = `${configuration.port}`;
    this.useMiddlewares();
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
    this.app.use(this.routes.test, testRouter);
    this.app.use(this.routes.error404, error404Router);
  }

  private useMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  async dbConnect(): Promise<void> {
    await connectDB();
  }
}
