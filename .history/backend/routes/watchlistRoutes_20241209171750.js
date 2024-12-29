import express from "express";
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js'
import Watchlist from "../models/watchlistModel.js";

router.get('/', asyncHandler(async(req, res) => {
    const watchlists = await Watchlist.find({});
    res.json(watchlists);
}))


router.get('/:id', asyncHandler(async(req, res) => {
    const { id } = req.params;
    const watchlist = await Watchlist.findById(id);
    if (watchlist) {
        res.json(watchlist);
    } else {
        res.status(404).json({ error: 'Watchlist not found' });
    }
}))

export default router;