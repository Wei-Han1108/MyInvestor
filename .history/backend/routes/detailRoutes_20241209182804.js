import express from "express";
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js'
import Storage from "../models/storageModel.js";
import Watchlist from "../models/watchlistModel.js";
router.get('/', asyncHandler(async(req, res) => {
    const storages = await Storage.find({});
    res.json(storages);
}))


router.get('/:source/:id', async (req, res) => {
    const { source, id } = req.params;
  console.log('Received source:', source, 'id:', id);

    try {
      let stock;
      if (source === 'watchlists') {
        stock = await Watchlist.findById(id);
      } else if (source === 'storages') {
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