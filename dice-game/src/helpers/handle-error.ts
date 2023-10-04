import { CustomResponse } from "../models/custom-response";
import { BadRequestException } from "../models/errors/bad-request-exception";
import { NotFoundException } from "../models/errors/not-found-exception";
import { statusMap } from "../utils/status.map";
import { Response } from "express";

export const handleError = (error: Error, res: Response) => {
  let status: number = 500;
  if (error instanceof NotFoundException) {
    status = 404;
  } else if (error instanceof BadRequestException) {
    status = 400;
  }
  const errorResponse: CustomResponse = {
    msg: statusMap[status] ?? "",
    success: false,
  };
  return res.status(status).json(errorResponse);
};
