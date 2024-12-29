import express from "express";
const router = express.Router();
import watchlists from '../data/watchlists.js'
import asyncHandler from '../middleware/asyncHandler.js'
import watchlistModel from "../models/watchlistModel.js";
router.get('/', asyncHandler(async(req, res) => {
    res.json(watchlists);
}))


router.get('/:id', asyncHandler(async(req, res) => {
    const { id } = req.params;
    const watchlist = watchlists.find((watchlist) => watchlist.id === id);
    if (watchlist) {
        res.json(watchlist);
    } else {
        res.status(404).json({ error: 'Watchlist not found' });
    }
}))

export default router;