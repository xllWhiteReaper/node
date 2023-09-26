import { Router } from "express";
import { test } from "../controllers/dice-game.controller";

const router = Router();

router.get("/", test);

export default router;
