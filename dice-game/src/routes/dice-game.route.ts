import { Router } from "express";
import {
  deleteGame,
  getBestPlayers,
  getGeneralRanking,
  getWorstPlayers,
  userRollsDice,
} from "../controllers/dice-game.controller";
import { validateToken } from "../middlewares/validate-jwt";

const router = Router();
router.post("/roll-dice/:id", validateToken, userRollsDice);
router.get("/ranking", validateToken, getGeneralRanking);
router.get("/best-players", validateToken, getBestPlayers);
router.get("/worst-players", validateToken, getWorstPlayers);
router.delete("/delete-by-user-id/:id", validateToken, deleteGame);

export default router;
