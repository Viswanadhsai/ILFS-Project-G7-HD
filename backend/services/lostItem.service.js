import LostItem from "../models/lost.model.js";

export const createLostItem = (data) => LostItem.create(data);

export const getLostItems = () => LostItem.find();

export const markLostAsReturned = (id) =>
    LostItem.findByIdAndUpdate(id, { status: "returned" }, { new: true });
