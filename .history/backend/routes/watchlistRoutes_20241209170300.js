import express from "express";
const router = express.Router();
import watchlists from '../data/watchlists.js'
router.get('/', (req, res) => {
    res.json(watchlists);
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const watchlist = watchlists.find((watchlist) => watchlist.id === id);
    if (watchlist) {
        res.json(watchlist);
    } else {
        res.status(404).json({ error: 'Watchlist not found' });
    }
})
export default router;