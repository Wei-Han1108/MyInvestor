import express from "express";
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js'
import Storage from "../models/storageModel.js";

router.get('/', asyncHandler(async(req, res) => {
    const storages = await Storage.find({});
    res.json(storages);
}))


router.get('/:id', asyncHandler(async(req, res) => {
    const { id } = req.params;
    const storage = await Storage.findById(id);
    if (storage) {
        res.json(storage);
    } else {
        res.status(404).json({ error: 'Storage not found' });
    }
}))
router.get('/details/:source/:id', async (req, res) => {
    const { source, id } = req.params;
  
    try {
      let stock;
      if (source === 'watchlist') {
        stock = await Watchlist.findById(id);
      } else if (source === 'storage') {
        stock = await Storage.findById(id);
      } else {
        return res.status(400).json({ message: 'Invalid source' });
      }
  
      if (!stock) {
        return res.status(404).json({ message: 'Stock not found' });
      }
  
      res.json(stock);
    } catch (error) {
      console.error('Error fetching stock:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
export default router;