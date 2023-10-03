import { NotFoundException } from "../models/errors/not-found-exception";
import { User } from "../models/user.model";

export class UserHelper {
  constructor(private id: String) {}

  static async getAllUsers() {
    return (await User.find({})).map((user) => {
      return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        wonRate: user.games.won,
      };
    });
  }

  async getSinglePlayer() {
    const user = await User.findById({ _id: this.id });

    if (!user?.id) {
      throw new NotFoundException("User not found");
    }

    return {
      firstName: user?.firstName,
      lastName: user?.firstName,
      gamesHistory: user?.games.history,
    };
  }

  async deletePlayer() {
    return await User.findByIdAndDelete({ _id: this.id });
  }
}
