import { Request, Response } from "express";

export const test = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Successful",
    type: "test",
    date: Date.now().toString(),
  });
};
