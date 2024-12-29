import mongoose from "mongoose";

const storageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, unique: true },
    shareAmount: { type: Number, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

const Storage = mongoose.model("Storage", storageSchema);
export default Storage
