import { Request, Response } from "express";
import { UserHelper } from "../helpers/user-helper";
import { CustomResponse } from "../models/custom-response";

// const userHelper = new UserHelper("");

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserHelper.getAllUsers();
    const usersResponse: CustomResponse = {
      msg: "Users retrieved successfully",
      success: true,
      data: users,
    };
    res.status(200).json(usersResponse);
  } catch (error) {}
};

export const getUserById = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const updateUserName = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const deleteUser = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
