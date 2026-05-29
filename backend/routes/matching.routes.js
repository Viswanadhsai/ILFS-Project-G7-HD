import express from "express";
import { getMatches, notifyStudent } from "../controllers/matching.controller.js";

const router = express.Router();

router.get("/", getMatches);
router.post("/notify/:lostId", notifyStudent);

export default router;
