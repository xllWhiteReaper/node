import { Request, Response } from "express";
import { GameHelper } from "../helpers/game-helper";
import { handleError } from "../helpers/handle-error";
import { BadRequestException } from "../models/errors/bad-request-exception";
import { CustomResponse } from "../models/custom-response";
import { UserHelper } from "../helpers/user-helper";

const gameHelper = new GameHelper("");

export const userRollsDice = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      return handleError(new BadRequestException(), res);
    }

    const response = await gameHelper.id(id).userRollDice();
    res.status(201).json(response);
  } catch (error) {
    return handleError(error as Error, res);
  }
};

export const getGeneralRanking = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await GameHelper.getGeneralRanking());
  } catch (error) {
    return handleError(error as Error, res);
  }
};

export const getBestPlayers = async (req: Request, res: Response) => {
  try {
    const bestPlayers = await GameHelper.getBestPlayers();
    const response: CustomResponse = {
      msg: "",
      success: true,
      data: bestPlayers,
    };

    return res.status(200).json(response);
  } catch (error) {
    handleError(error as Error, res);
  }
};

export const getWorstPlayers = async (req: Request, res: Response) => {
  try {
    const worstPlayers = await GameHelper.getWorstPlayers();
    const response: CustomResponse = {
      msg: "",
      success: true,
      data: worstPlayers,
    };

    return res.status(200).json(response);
  } catch (error) {
    handleError(error as Error, res);
  }
};

export const getGames = (req: Request, res: Response) => {
  try {
    console.log("getting games");
  } catch (error) {}
};

export const deleteGame = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.body;
    const userId = req.params.id;

    if (!gameId && !userId) {
      return handleError(new BadRequestException(), res);
    }
    return res.status(200).json(await gameHelper.id(userId).deleteGame(gameId));
  } catch (error) {
    return handleError(error as Error, res);
  }
};
