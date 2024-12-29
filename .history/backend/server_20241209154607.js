import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import WatchListData from './data/WatchListData.js'
import StockStorageData from './data/StockStorageData.js'
const port = process.env.PORT || 5000
connectDB()
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/api/watchlist', (req, res) => {
    res.json(WatchListData);
})
app.get('/api/stockstorage', (req, res) => {
    res.json(StockStorageData);
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})