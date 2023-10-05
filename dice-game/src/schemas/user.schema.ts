import { Model, Schema, model, Types } from "mongoose";
import { IUser } from "../interfaces/iuser.interface";
import { IUserModel } from "../interfaces/iuser.method.interface";
import bcryptjs from "bcryptjs";
import { GameSchema } from "./game.schema";

const ENCRYPTING_CYCLES = 10;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "** Email is invalid **"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    date: String,
    games: GameSchema,
  },
  { versionKey: false }
);
UserSchema.static("encryptPassword", async (password: string) => {
  const salt = await bcryptjs.genSalt(ENCRYPTING_CYCLES);
  return await bcryptjs.hash(password, salt);
});
UserSchema.static(
  "comparePassword",
  async (password: string, receivedPassword: string) => {
    return await bcryptjs.compare(password, receivedPassword);
  }
);

export const User = model<IUser, IUserModel>("User", UserSchema);
