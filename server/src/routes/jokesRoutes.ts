import { Router } from "express";
import { getJoke } from "../controllers/jokesController";

const router = Router();

router.get("/", getJoke);

export default router;