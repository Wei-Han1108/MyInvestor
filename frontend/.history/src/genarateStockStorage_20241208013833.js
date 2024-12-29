const generateStockStorage = () => {
  const stocks = [];
  const stockNames = ["AAPL", "MSFT", "GOOG", "META", "ACN", "TSLA", "AMZN", "NVDA", "NFLX", "AMD", "INTC", "IBM", "ORCL", "SAP", "CRM", "CSCO", "ADBE", "PYPL", "ZM", "SNOW"];

  for (let i = 0; i < 20; i++) {
    const shareAmount = Math.floor(Math.random() * 10) + 1; // 随机生成 1~10 股
    const price = parseFloat((Math.random() * 500 + 50).toFixed(2)); // 随机生成价格 50~550
    const change = parseFloat((Math.random() * 10 - 5).toFixed(2)); // 随机涨跌幅 -5~5
    const currentValue = parseFloat((price + change).toFixed(2));
    const percentChange = parseFloat(((change / price) * 100).toFixed(2));

    stocks.push({
      _id: (i + 1).toString(),
      name: stockNames[i],
      shareAmount: shareAmount,
      price: price,
      change: change,
      currentValue: currentValue,
      percentChange: percentChange,
    });
  }

  return stocks;
};

export default generateStockStorage