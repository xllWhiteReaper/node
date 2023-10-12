import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller";
import { validateToken } from "../middlewares/validate-jwt";

const router = Router();

router.get("/", validateToken, getAllUsers);
router.get("/:id", validateToken, getUserById);
router.put("/update/:id", validateToken, updateUser);
router.delete("/delete", validateToken, deleteUser);

export default router;
