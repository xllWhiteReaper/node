import { IDiceRoll } from "../interfaces/idice-roll.interface";
import { IUser } from "../interfaces/iuser.interface";
import { CustomResponse } from "../models/custom-response";
import { NotFoundException } from "../models/errors/not-found-exception";
import { User } from "../schemas/user.schema";
import { roundDecimal } from "../utils/round-decimal";
import { rollDices } from "./dices";

export class GameHelper {
  constructor(private _id: string) {}

  async userRollDice(): Promise<CustomResponse> {
    const game = rollDices();

    const user = await User.findById({ _id: this._id });

    if (user) {
      user.games.total++;
      if (game.verdict === "win") {
        user.games.won++;
      }
      user.games.history.push(game);
      user.games.winRate = roundDecimal(user.games.won / user.games.total);
      await user.save();
      const successfulGame: CustomResponse = {
        msg: "User rolled the dices",
        success: true,
        data: {
          game,
        },
      };
      return successfulGame;
    }
    throw new NotFoundException(`User with id: ${this._id} not found`);
  }

  static async getGeneralRanking(): Promise<CustomResponse> {
    const sortedUsers = (await User.find({}).sort({ "games.won": -1 })).map(
      (user) => {
        return {
          userId: user._id,
          firstName: user.firstName,
          numberOfWins: user.games.won,
        };
      }
    );

    return {
      msg: "",
      success: true,
      data: sortedUsers,
    };
  }

  static async getBestPlayers(): Promise<
    {
      userId: string;
      firstName: string;
      numberOfWins: number;
    }[]
  > {
    const users: IUser[] = await User.find({});
    let maxWon = 0;
    const filteredUsers = users
      .map((user) => {
        const userWon = user.games.won;
        userWon > maxWon ? (maxWon = userWon) : null;
        return {
          userId: user._id,
          firstName: user.firstName,
          numberOfWins: user.games.won,
        };
      })
      .filter((user) => user.numberOfWins === maxWon);
    return filteredUsers;
  }

  static async getWorstPlayers(): Promise<
    {
      userId: string;
      firstName: string;
      numberOfWins: number;
    }[]
  > {
    const users: IUser[] = await User.find({});
    let minWon = Infinity;
    const filteredUsers = users
      .map((user) => {
        const userWon = user.games.won;
        userWon < minWon ? (minWon = userWon) : null;
        return {
          userId: user._id,
          firstName: user.firstName,
          numberOfWins: user.games.won,
        };
      })
      .filter((user) => user.numberOfWins === minWon);
    return filteredUsers;
  }

  async deleteGame(gameId: string) {
    const user = await User.findById({ _id: this._id });

    if (user) {
      const game = user.games.history.find(
        (userGame) => `${userGame._id}` === gameId
      );

      if (!game) {
        throw new NotFoundException(`Game with id: ${gameId} not found`);
      }

      user.games.history = user.games.history.filter(
        (userGame) => userGame._id !== game._id
      );

      user.games.total--;

      if (game.verdict === "win") {
        user.games.won--;
      }

      user.games.winRate = roundDecimal(user.games.won / user.games.total);

      await user.save();

      const successfulGameDeletion: CustomResponse = {
        msg: "Game deleted successfully",
        success: true,
      };
      return successfulGameDeletion;
    }
    throw new NotFoundException(`User with id: ${this._id} not found`);
  }

  id(id: string) {
    this._id = id;
    return this;
  }
}
