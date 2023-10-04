import { Request, Response } from "express";
import { UserHelper } from "../helpers/user-helper";
import { CustomResponse } from "../models/custom-response";
import { NotFoundException } from "../models/errors/not-found-exception";
import { UpdateUserPayload } from "../models/update-user-payload.interface";
import { IUser } from "../interfaces/iuser.interface";
import { statusMap } from "../utils/status.map";
import { handleError } from "../helpers/handle-error";
import { BadRequestException } from "../models/errors/bad-request-exception";

const userHelper = new UserHelper("");

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

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    userHelper.id = id;
    const foundUser = await userHelper.getSingleUser();
    const successResponse: CustomResponse = {
      msg: `User found`,
      success: true,
      data: foundUser,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    return handleError(error as Error, res);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
      return handleError(new BadRequestException(), res);
    }
    const payload: UpdateUserPayload = {
      firstName,
      lastName,
    };
    userHelper.id = id;
    const updatedUser = await userHelper.updateUser(payload);
    let response = {};
    if (updatedUser) {
      response = {
        ...payload,
        wonRate: updatedUser.games.won,
      };
    }
    const successResponse: CustomResponse = {
      msg: "User updated",
      success: true,
      data: response,
    };
    return res.status(201).json(successResponse);
  } catch (error) {
    return handleError(error as Error, res);
  }
};

export const deleteUser = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
