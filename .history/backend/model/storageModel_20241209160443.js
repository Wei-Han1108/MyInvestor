import mongoose from "mongoose";

const storageSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    shareAmount: { type: Number, required: true },
    price: { type: Number, required: true },
    change: { type: Number, required: true },
    currentValue: { type: Number, required: true },
    percentChange: { type: Number, required: true },
});

const Storage = mongoose.model("Storage", storageSchema);
export default Storage
