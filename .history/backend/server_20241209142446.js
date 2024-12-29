import express from 'express'
import WatchListData from './data/WatchListData'
const port = 5000
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/watchlist', (req, res) => {
    res.json(WatchListData)
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})