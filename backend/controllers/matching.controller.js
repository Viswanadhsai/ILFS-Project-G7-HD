import { getLostItems } from "../services/lostItem.service.js";
import { getFoundItems } from "../services/foundItem.service.js";
import { matchItems } from "../services/matching.service.js";
import LostItem from "../models/lost.model.js";

export const getMatches = async (req, res) => {
    try {
        const lost = await getLostItems();
        const found = await getFoundItems();
        const matches = matchItems(lost, found);

        res.json(matches);
    } catch (err) {
        console.error("MATCHING ERROR:", err);
        res.status(500).json({ message: err.message });
    }
};

export const notifyStudent = async (req, res) => {
    try {
        const { lostId } = req.params;
        const { message } = req.body;

        if (!lostId || !message) {
            return res.status(400).json({ message: "lostId and message are required" });
        }

        const lostItem = await LostItem.findById(lostId);
        if (!lostItem) {
            return res.status(404).json({ message: "Lost item not found" });
        }

        const notifiedUser = lostItem.studentId && lostItem.studentId !== "UNKNOWN"
            ? lostItem.studentId
            : null;

        console.log("NOTIFY USER:", {
            studentId: lostItem.studentId || "<missing>",
            item: lostItem.name,
            message
        });

        const responseMessage = notifiedUser
            ? `Notification queued for user ${notifiedUser}`
            : "Notification queued for user.";

        res.json({ message: responseMessage });
    } catch (err) {
        console.error("NOTIFY ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
};
