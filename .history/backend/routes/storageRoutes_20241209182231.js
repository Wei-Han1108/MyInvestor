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

export default router;