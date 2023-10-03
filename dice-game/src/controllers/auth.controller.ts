import { Request, Response } from "express";
import { WrongCredentialsException } from "../models/errors/wrong-credentials-exception";
import { Auth } from "../helpers/auth";
import { CustomResponse } from "../models/custom-response";

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

    const resp: CustomResponse = {
      success: true,
      msg: "Registration complete",
      data: {
        success: true,
        email,
        firstName,
        lastName,
        date,
        jwt,
      },
    };

    res.status(201).json(resp);
  } catch (error) {
    console.log(error);
    const errorResponse: CustomResponse = {
      msg: "Internal server Error, please try again later.",
      success: false,
    };
    return res.status(500).json(errorResponse);
  }
};

export const login = (req: Request, res: Response) => {
  try {
  } catch (error) {
    if (error instanceof WrongCredentialsException) {
      const errorResponse: CustomResponse = {
        msg: error.message,
        success: false,
      };
      return res.status(403).json(errorResponse);
    }
  }
};
