import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import WatchListData from './data/WatchListData.js'
const port = process.env.PORT || 5000
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/api/watchlist', (req, res) => {
    res.json(WatchListData[req.params.id]);
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})