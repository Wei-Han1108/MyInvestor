import express from "express";
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js'
import User from "../models/userModel.js";

router.get('/', asyncHandler(async(req, res) => {
    const users = await User.find({});
    res.json(users);
}))


router.get('/:id', asyncHandler(async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
}))

export default router;