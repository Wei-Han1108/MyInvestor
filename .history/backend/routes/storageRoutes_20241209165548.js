import express from "express";
const router = express.Router();


router.get('/', (req, res) => {
    res.json(StockStorageData);
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const storage = StockStorageData.find((storage) => storage.id === id);
    if (storage) {
        res.json(storage);
    } else {
        res.status(404).json({ error: 'Storage not found' });
    }
})
export default router;