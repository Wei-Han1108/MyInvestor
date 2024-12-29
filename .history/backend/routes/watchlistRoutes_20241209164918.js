import express from "express";
const router = express.Router();

router.get('/api/watchlists', (req, res) => {
    res.json(WatchListData);
})
router.get('/api/storages', (req, res) => {
    res.json(StockStorageData);
})
export default router;