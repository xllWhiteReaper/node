import { IUser } from "../interfaces/iuser.interface";
import { NotFoundException } from "../models/errors/not-found-exception";
import { UpdateUserPayload } from "../models/update-user-payload.interface";
import { User } from "../schemas/user.schema";

export class UserHelper {
  constructor(private _id: String) {}

  static async getAllUsers() {
    return (await User.find({})).map((user) => {
      return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        wonRate: user.games.winRate,
      };
    });
  }

  async getSingleUser() {
    try {
      const user = await User.findById({ _id: this._id });
      return {
        firstName: user?.firstName,
        lastName: user?.lastName,
        gamesHistory: user?.games.history,
      };
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }

  async deleteUser() {
    return await User.findByIdAndDelete({ _id: this._id });
  }

  async updateUser(
    updateUserPayload: UpdateUserPayload
  ): Promise<IUser | null> {
    try {
      const updatedUser: IUser | null = await User.findOneAndUpdate(
        { _id: this._id },
        updateUserPayload
      );
      return updatedUser;
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }

  id(id: string) {
    this._id = id;
    return this;
  }
}
