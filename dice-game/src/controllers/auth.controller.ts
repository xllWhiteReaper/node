import { Request, Response } from "express";
import { WrongCredentialsException } from "../models/wrong-credentials-exception";
import { Auth } from "../helpers/auth";

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const date = new Date();
    const userAuthentication = new Auth(
      email,
      password,
      firstName,
      lastName,
      date
    );

    const jwt = await userAuthentication.register();

    res.status(201).json({
      success: true,
      email,
      firstName,
      lastName,
      date,
      jwt,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server Error, please try again later.",
    });
  }
};

export const login = (req: Request, res: Response) => {
  try {
  } catch (error) {
    if (error instanceof WrongCredentialsException) {
      return res.status(403).json({
        msg: error.message,
      });
    }
  }
};
