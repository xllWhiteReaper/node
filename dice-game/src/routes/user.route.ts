import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUserName,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/update-username", updateUserName);
router.delete("/delete", deleteUser);

export default router;
