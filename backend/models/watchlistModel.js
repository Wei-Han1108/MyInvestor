import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    percentChange: { type: Number, required: true },
}, { timestamps: true });

const Watchlist = mongoose.model("Watchlist", watchlistSchema);
export default Watchlist