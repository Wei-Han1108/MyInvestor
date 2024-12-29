const mongoose = require('mongoose');

const stockDaySchema = new mongoose.Schema({
  date: { type: String, required: true }, // 每个交易日的日期 (YYYY-MM-DD)
  open: { type: Number, required: true }, // 开盘价
  close: { type: Number, required: true }, // 收盘价
  high: { type: Number, required: true }, // 最高价
  low: { type: Number, required: true }, // 最低价
  volume: { type: Number, required: true }, // 交易量
});

const stockHistorySchema = new mongoose.Schema({
  ticker: { 
    type: String, 
    required: true, 
    unique: true // 确保 ticker 在数据库中唯一
  },
  history: [stockDaySchema], // 包含许多交易日的记录
  createdAt: { 
    type: Date, 
    default: Date.now // 自动为每条记录加上时间戳
  }
});

module.exports = mongoose.model('StockHistory', stockHistorySchema);
