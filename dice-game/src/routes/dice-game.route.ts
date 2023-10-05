import { Router } from "express";
import {
  deleteGame,
  getBestPlayer,
  getGeneralRanking,
  getWorstPlayer,
  userRollsDice,
} from "../controllers/dice-game.controller";

const router = Router();
router.post("/roll-dice/:id", userRollsDice);
router.get("/ranking", getGeneralRanking);
router.get("/best-player", getBestPlayer);
router.get("/worst-player", getWorstPlayer);
router.delete("/delete/:id", deleteGame);

export default router;
