import { User } from "../schemas/user.schema";
import { sign } from "jsonwebtoken";
import config from "../config";
import { WrongCredentialsException } from "../models/errors/wrong-credentials-exception";

export class Auth {
  private firstName: string;
  private lastName: string;
  private date!: Date;
  constructor(
    private email: string,
    private password: string,
    firstName?: string,
    lastName?: string,
    date?: Date
  ) {
    this.firstName = firstName ?? "";
    this.lastName = lastName ?? "";
    this.date = date ?? new Date();
  }

  async register() {
    const encryptedPassword = await User.encryptPassword(this.password);
    const user = new User({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      date: this.date,
      password: encryptedPassword,
    });

    const savedUser = await user.save();

    const jwt = sign({ id: user.id }, config.jwtSignKey as string, {
      expiresIn: "4h",
    });
    console.log("Registering");
    return jwt;
  }
  async login() {
    const userDB = await User.findOne({ email: this.email });
    const isPasswordValid = User.comparePassword(
      this.password,
      userDB?.password ?? ""
    );

    if (!userDB || !isPasswordValid) {
      throw new WrongCredentialsException(
        "Wrong credentials, please try again"
      );
    }

    const jwt = sign({ id: userDB.id }, config.jwtSignKey as string, {
      expiresIn: "4h",
    });

    return jwt;
  }
}
