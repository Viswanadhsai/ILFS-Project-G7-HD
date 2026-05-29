import express from "express";
import { addLost, listLost, returnLostItem } from "../controllers/lost.controller.js";

const router = express.Router();

router.post("/", addLost);
router.get("/", listLost);

router.patch("/:id/return", returnLostItem);

export default router;
