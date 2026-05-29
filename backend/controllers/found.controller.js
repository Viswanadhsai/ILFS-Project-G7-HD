import { createFoundItem, getFoundItems, markFoundAsReturned } from "../services/foundItem.service.js";

export const addFound = async (req, res) => {
    try {
        console.log("FOUND BODY:", req.body);

        const { name, category, location, foundBy, date } = req.body;

        // VALIDATION
        if (!name || !category || !location || !foundBy || !date) {
            return res.status(400).json({
                message: "name, category, location, foundBy and date are required"
            });
        }

        const item = await createFoundItem(req.body);
        res.json(item);

    } catch (err) {
        console.error("FOUND ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
};

export const listFound = async (req, res) => {
    try {
        const items = await getFoundItems();
        res.json(items);
    } catch (err) {
        console.error("LIST FOUND ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
};

export const returnFoundItem = async (req, res) => {
    try {
        const updated = await markFoundAsReturned(req.params.id);
        res.json(updated);
    } catch (err) {
        console.error("RETURN FOUND ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
};
