import express from 'express'
import WatchListData from './data/WatchListData.js'
const port = 5000
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/api/watchlist/:id', (req, res) => {
    res.json(WatchListData.find(item => item._id === req.params.id));
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})