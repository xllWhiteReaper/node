import { Router } from "express";
import { test } from "../controllers/test.controller";

const router = Router();

router.route("/").get(test);

export default router;
