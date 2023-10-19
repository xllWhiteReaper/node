import { IDiceRoll } from "./idice-roll.interface";

export interface IGame {
  total: number;
  won: number;
  winRate: number;
  history: IDiceRoll[];
}
