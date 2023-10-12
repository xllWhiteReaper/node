import { Schema } from "mongoose";
import { IDiceRoll } from "../interfaces/idice-roll.interface";

export const DiceRollSchema: Schema<IDiceRoll> = new Schema<IDiceRoll>({
  dice1: Number,
  dice2: Number,
  result: Number,
  verdict: String,
});
