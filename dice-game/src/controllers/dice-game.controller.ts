import { Request, Response } from "express";
import { GameHelper } from "../helpers/game-helper";
import { handleError } from "../helpers/handle-error";
import { BadRequestException } from "../models/errors/bad-request-exception";

const gameHelper = new GameHelper("");

export const userRollsDice = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Id: ", id);

    if (!id) {
      return handleError(new BadRequestException(), res);
    }

    const response = await gameHelper.id(id).userRollDice();
    res.status(201).json(response);
  } catch (error) {
    console.log("errortrrr");
    console.log(error);
    return handleError(error as Error, res);
  }
};

export const getGeneralRanking = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const getBestPlayer = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const getWorstPlayer = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const getGames = (req: Request, res: Response) => {
  try {
    console.log("getting games");
  } catch (error) {}
};

export const deleteGame = (req: Request, res: Response) => {
  try {
    console.log("getting games");
  } catch (error) {}
};
