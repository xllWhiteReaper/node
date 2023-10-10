import { Schema } from "mongoose";
import { IGame } from "../interfaces/igame.interface";
import { DiceRollSchema } from "./dice-roll.schema";

export const GameSchema: Schema<IGame> = new Schema<IGame>(
  {
    total: {
      type: Number,
      default: 0,
    },
    won: {
      type: Number,
      default: 0,
    },
    winRate: {
      type: Number,
      default: 0,
    },
    history: [DiceRollSchema],
  },
  { _id: false }
);
