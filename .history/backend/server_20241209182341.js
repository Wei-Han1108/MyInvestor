import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'

import watchlistRoutes from './routes/watchlistRoutes.js'   
import storageRoutes from './routes/storageRoutes.js'
import detailRoutes from './routes/detailRoutes.js'

const port = process.env.PORT || 5000
connectDB()
const app = express()
app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/watchlists',watchlistRoutes)
app.use('/api/storages',storageRoutes)
app.use('/api/details', detailRoutes)
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})