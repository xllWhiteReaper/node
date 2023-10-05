import { IDiceRoll } from "./idice-roll.interface";

export interface IGame {
  _id: number;
  total: number;
  won: number;
  winRate: number;
  history: IDiceRoll[];
}
