import express from "express";
import { addFound, listFound, returnFoundItem } from "../controllers/found.controller.js";

const router = express.Router();

router.post("/", addFound);
router.get("/", listFound);

// ⭐ NEW — Mark Found Item as Returned
router.patch("/:id/return", returnFoundItem);

export default router;
