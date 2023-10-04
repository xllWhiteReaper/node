import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete", deleteUser);

export default router;
