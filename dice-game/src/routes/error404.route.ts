import { Router } from "express";
import { error404 } from "../controllers/error404.controller";

const router = Router();

router.route("*").all(error404);

export default router;
