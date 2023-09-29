import { IGame } from "./igame.interface";

export interface IUser {
  _id: String;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  date: String;
  games: IGame;
}
