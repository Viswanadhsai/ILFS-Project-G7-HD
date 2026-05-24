import mongoose from "mongoose";

const LostItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    date: { type: String, required: true },
    studentId: { type: String, required: true },
    status: { type: String, default: "pending" }
});

export default mongoose.model("LostItem", LostItemSchema);
