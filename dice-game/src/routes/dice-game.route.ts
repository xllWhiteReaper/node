import { Router } from "express";
import {
  deleteGame,
  getBestPlayers,
  getGeneralRanking,
  getWorstPlayers,
  userRollsDice,
} from "../controllers/dice-game.controller";

const router = Router();
router.post("/roll-dice/:id", userRollsDice);
router.get("/ranking", getGeneralRanking);
router.get("/best-players", getBestPlayers);
router.get("/worst-players", getWorstPlayers);
router.delete("/delete-by-user-id/:id", deleteGame);

export default router;
