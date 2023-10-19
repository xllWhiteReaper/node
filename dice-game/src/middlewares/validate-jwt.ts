import { Request, Response, NextFunction } from "express";
import { handleError } from "../helpers/handle-error";
import jwt from "jsonwebtoken";
import config from "../config";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken: any =
      req.header("Authorization") || req.query.accessToken;

    if (!accessToken) {
      throw new Error();
    }

    jwt.verify(accessToken, config.jwtSignKey as string);
  } catch (error) {
    return handleError(error as Error, res, 401);
  }
  next();
};
