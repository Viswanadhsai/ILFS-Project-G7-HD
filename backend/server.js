import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import lostRoutes from "./routes/lost.routes.js";
import foundRoutes from "./routes/found.routes.js";
import studentRoutes from "./routes/student.routes.js";
import authRoutes from "./routes/auth.routes.js";
import matchingRoutes from "./routes/matching.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/lost", lostRoutes);
app.use("/found", foundRoutes);
app.use("/api/student", studentRoutes);
app.use("/auth", authRoutes);
app.use("/matching", matchingRoutes);

app.get("/", (req, res) => {
    res.json({ message: "ILFS backend running" });
});

app.use((err, req, res, next) => {
    console.error("Backend Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
