import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        name: "Viswanadh",
        studentid: "S226051707"
    });
});

export default router;
