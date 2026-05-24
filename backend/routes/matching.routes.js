import express from "express";
import { getMatches, notifyStudent } from "../controllers/matching.controller.js";

const router = express.Router();

router.get("/", getMatches);

// ⭐ NEW — Notify student about a matched found item
router.post("/notify/:lostId", notifyStudent);

export default router;
