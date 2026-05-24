import FoundItem from "../models/found.model.js";

export const createFoundItem = (data) => FoundItem.create(data);

export const getFoundItems = () => FoundItem.find();

// ⭐ NEW — update status to "returned"
export const markFoundAsReturned = (id) =>
    FoundItem.findByIdAndUpdate(id, { status: "returned" }, { new: true });
