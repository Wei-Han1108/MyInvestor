import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'

import watchlistRoutes from './routes/watchlistRoutes.js'   
import storageRoutes from './routes/storageRoutes.js'
import detailRoutes from './routes/detailRoutes.js'
import historyRoutes from './routes/historyRoutes.js'

const port = process.env.PORT || 5000
connectDB()
const app = express()
app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/watchlists',watchlistRoutes)
app.use('/api/storages',storageRoutes)
app.use('/api/details', detailRoutes)
// app.use('/api/saveStockHistory', historyRoutes)
app.use(express.json()); // 解析 JSON 请求体

// 登录接口
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // 比对密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    // 登录成功
    return res.status(200).json({ success: true, message: "Login successful" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})