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
const StockStorageData = [
  {
    _id: '1',
    name: 'AAPL',
    shareAmount: 1,
    price: 444.03,
    change: 1.68,
    currentValue: 445.71,
    percentChange: 0.38
  },
  {
    _id: '2',
    name: 'MSFT',
    shareAmount: 4,
    price: 245.17,
    change: -2.39,
    currentValue: 242.78,
    percentChange: -0.97
  },
  {
    _id: '3',
    name: 'GOOG',
    shareAmount: 1,
    price: 366.84,
    change: -4.94,
    currentValue: 361.9,
    percentChange: -1.35
  },
  {
    _id: '4',
    name: 'META',
    shareAmount: 2,
    price: 396.2,
    change: 3.51,
    currentValue: 399.71,
    percentChange: 0.89
  },
  {
    _id: '5',
    name: 'ACN',
    shareAmount: 7,
    price: 390.19,
    change: 0.33,
    currentValue: 390.52,
    percentChange: 0.08
  },
  {
    _id: '6',
    name: 'TSLA',
    shareAmount: 1,
    price: 432.66,
    change: 1.47,
    currentValue: 434.13,
    percentChange: 0.34
  },
  {
    _id: '7',
    name: 'AMZN',
    shareAmount: 2,
    price: 162.09,
    change: 1.29,
    currentValue: 163.38,
    percentChange: 0.8
  },
  {
    _id: '8',
    name: 'NVDA',
    shareAmount: 10,
    price: 113.99,
    change: -0.76,
    currentValue: 113.23,
    percentChange: -0.67
  },
  {
    _id: '9',
    name: 'NFLX',
    shareAmount: 10,
    price: 509.61,
    change: -2.77,
    currentValue: 506.84,
    percentChange: -0.54
  },
  {
    _id: '10',
    name: 'AMD',
    shareAmount: 7,
    price: 339.08,
    change: -1.91,
    currentValue: 337.17,
    percentChange: -0.56
  },
  {
    _id: '11',
    name: 'INTC',
    shareAmount: 6,
    price: 101.24,
    change: -2.78,
    currentValue: 98.46,
    percentChange: -2.75
  },
  {
    _id: '12',
    name: 'IBM',
    shareAmount: 3,
    price: 154.33,
    change: -4.63,
    currentValue: 149.7,
    percentChange: -3
  },
  {
    _id: '13',
    name: 'ORCL',
    shareAmount: 8,
    price: 288.7,
    change: -4.28,
    currentValue: 284.42,
    percentChange: -1.48
  },
  {
    _id: '14',
    name: 'SAP',
    shareAmount: 10,
    price: 459.96,
    change: 2.27,
    currentValue: 462.23,
    percentChange: 0.49
  },
  {
    _id: '15',
    name: 'CRM',
    shareAmount: 10,
    price: 165.23,
    change: -3.3,
    currentValue: 161.93,
    percentChange: -2
  },
  {
    _id: '16',
    name: 'CSCO',
    shareAmount: 4,
    price: 541.35,
    change: 1.95,
    currentValue: 543.3,
    percentChange: 0.36
  },
  {
    _id: '17',
    name: 'ADBE',
    shareAmount: 5,
    price: 392.92,
    change: -0.25,
    currentValue: 392.67,
    percentChange: -0.06
  },
  {
    _id: '18',
    name: 'PYPL',
    shareAmount: 3,
    price: 344.31,
    change: -0.85,
    currentValue: 343.46,
    percentChange: -0.25
  },
  {
    _id: '19',
    name: 'ZM',
    shareAmount: 2,
    price: 115.78,
    change: 2.22,
    currentValue: 118,
    percentChange: 1.92
  },
  {
    _id: '20',
    name: 'SNOW',
    shareAmount: 6,
    price: 97.57,
    change: -4.58,
    currentValue: 92.99,
    percentChange: -4.69
  }
];
export default StockStorageData 