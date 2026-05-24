import { getLostItems } from "../services/lostItem.service.js";
import { getFoundItems } from "../services/foundItem.service.js";
import { matchItems } from "../services/matching.service.js";
import User from "../models/user.model.js";

// GET MATCHES
export const getMatches = async (req, res) => {
    try {
        const lost = await getLostItems();
        const found = await getFoundItems();

        // IMPORTANT:
        // matchItems() MUST return studentId inside each match object.
        // Example match object:
        // {
        //   lostId,
        //   foundId,
        //   studentId,   <-- REQUIRED
        //   email,       <-- OPTIONAL
        //   name,
        //   category,
        //   lostLocation,
        //   foundLocation,
        //   lostDate,
        //   foundDate,
        //   score
        // }

        const matches = matchItems(lost, found);

        res.json(matches);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// NOTIFY STUDENT
export const notifyStudent = async (req, res) => {
    try {
        const { studentId, message } = req.body;

        if (!studentId || !message) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const user = await User.findOne({ studentId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // For now, just log the notification
        console.log(`NOTIFY → ${user.email}: ${message}`);

        res.json({ message: "Notification sent (console log only)" });

    } catch (err) {
        console.error("NOTIFY ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
};
