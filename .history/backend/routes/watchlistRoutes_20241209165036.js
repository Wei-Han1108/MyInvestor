import express from "express";
const router = express.Router();

router.get('/api/watchlists', (req, res) => {
    res.json(WatchListData);
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const watchlist = WatchListData.find((watchlist) => watchlist.id === id);
    if (watchlist) {
        res.json(watchlist);
    } else {
        res.status(404).json({ error: 'Watchlist not found' });
    }
})
export default router;