import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    stock: { type: String, required: true },
    price: { type: Number, required: true },
    percentChange: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);
export default Watchlist