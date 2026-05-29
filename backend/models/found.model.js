import mongoose from "mongoose";

const FoundItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    date: { type: String, required: true },
    foundBy: { type: String, required: true },
    status: { type: String, default: "pending" }
});

export default mongoose.model("FoundItem", FoundItemSchema);
