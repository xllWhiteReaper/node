import { CustomResponse } from "../models/custom-response";
import { NotFoundException } from "../models/errors/not-found-exception";
import { User } from "../schemas/user.schema";
import { roundDecimal } from "../utils/round-decimal";
import { rollDices } from "./dices";

export class GameHelper {
  constructor(private _id: string) {}

  async userRollDice() {
    const game = rollDices();

    const user = await User.findById({ _id: this._id });
    console.log(`Searching id: ${this._id}`);
    console.log("user");
    console.log(user);
    if (user) {
      console.log("User found");

      user.games.total++;
      if (game.verdict === "win") {
        user.games.won++;
      }
      user.games.history.push(game);
      user.games.winRate = roundDecimal(user.games.won / user.games.total);

      console.log("Before saving user");
      await user.save();

      const successfulGame: CustomResponse = {
        msg: "User rolled the dices",
        success: true,
        data: {
          game,
          id: this._id,
        },
      };
      console.log("After saving user");
      return successfulGame;
    }
    console.log("An error ocurred");
    throw new NotFoundException(`User with id: ${this._id} not found`);
  }
  id(id: string) {
    this._id = id;
    return this;
  }
}
