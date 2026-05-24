import mongoose from "mongoose";

const FoundItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    date: { type: String, required: true },
    foundBy: { type: String, required: true },   // ⭐ who reported the item
    status: { type: String, default: "pending" } // ⭐ correct status flow
});

export default mongoose.model("FoundItem", FoundItemSchema);
