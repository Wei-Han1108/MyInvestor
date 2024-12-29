import express from "express";
const router = express.Router();


router.get('/api/storages', (req, res) => {
    res.json(StockStorageData);
})
export default router;