import { IGame } from "./igame.interface";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  date: string;
  games: IGame;
}
