import { createLostItem, getLostItems, markLostAsReturned } from "../services/lostItem.service.js";

export const addLost = async (req, res) => {
    try {
        console.log("LOST BODY:", req.body);

        const { name, category, location, date, studentId } = req.body;

        // VALIDATION
        if (!name || !category || !location || !date || !studentId) {
            return res.status(400).json({
                message: "name, category, location, date and studentId are required"
            });
        }

        const item = await createLostItem(req.body);
        res.json(item);

    } catch (err) {
        console.error("LOST ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
};

export const listLost = async (req, res) => {
    try {
        const items = await getLostItems();
        res.json(items);
    } catch (err) {
        console.error("LIST LOST ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
};

export const returnLostItem = async (req, res) => {
    try {
        const updated = await markLostAsReturned(req.params.id);
        res.json(updated);
    } catch (err) {
        console.error("RETURN LOST ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
};
