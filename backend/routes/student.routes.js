import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        name: "Viswanadh",
        studentId: "S226051707"
    });
});

export default router;
