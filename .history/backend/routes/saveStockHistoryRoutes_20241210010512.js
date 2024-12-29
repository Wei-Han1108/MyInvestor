const express = require('express');
const router = express.Router();
const StockHistory = require('../models/StockHistory'); // 假设你有这个模型

// 保存股票历史数据
router.post('/saveStockHistory', async (req, res) => {
  try {
    const stockData = req.body; // 从前端获取数据
    for (const stock of stockData) {
      const { ticker, history } = stock;

      // 将每个股票的历史数据保存到数据库
      const newStockHistory = new StockHistory({ ticker, history });
      await newStockHistory.save();
    }

    res.status(200).send('Stock data saved successfully');
  } catch (error) {
    console.error('Error saving stock history:', error);
    res.status(500).send('Error saving stock data');
  }
});

module.exports = router;
