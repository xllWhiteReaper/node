import { Request, Response } from "express";

export class Test {
  resolve(req: Request, res: Response) {
    return res.status(200).send("Hello, first endpoint");
  }
}
