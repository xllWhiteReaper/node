import { Model } from "mongoose";
import { IUser } from "./iuser.interface";

export interface IUserModel extends Model<IUser> {
  encryptPassword(password: string): string;
  comparePassword(password: string): string;
}
