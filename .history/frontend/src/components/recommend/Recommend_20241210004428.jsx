import React, { useEffect, useState } from 'react';
import { getWatchlist } from '../services/mongo';
import { getStockHistory } from '../services/api';
import { calculateKellyRatio } from '../utils/kelly';
import { calculateTechnicalIndicators } from '../utils/technical';
import { optimizePortfolio } from '../utils/optimizer';

const Recommend = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [portfolio, setPortfolio] = useState({
    oneYear: [],
    twoYears: [],
    fiveYears: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: 从 MongoDB 获取 Watchlist
        const userWatchlist = await getWatchlist();
        setWatchlist(userWatchlist);
        
        // Step 2: 为每个股票从 API 获取历史数据
        const stockDataPromises = userWatchlist.map(ticker => 
          getStockHistory(ticker, 20) // 获取过去 20 年的股票数据
        );
        const stockData = await Promise.all(stockDataPromises);

        // Step 3: 计算 Kelly 比例和技术指标
        const analyzedData = stockData.map(data => ({
          ticker: data.ticker,
          history: data.history,
          kellyRatio: calculateKellyRatio(data.history),
          technicals: calculateTechnicalIndicators(data.history)
        }));

        // Step 4: 生成 1年、2年 和 5 年的投资组合
        const oneYearPortfolio = optimizePortfolio(analyzedData, 1);
        const twoYearPortfolio = optimizePortfolio(analyzedData, 2);
        const fiveYearPortfolio = optimizePortfolio(analyzedData, 5);

        setPortfolio({
          oneYear: oneYearPortfolio,
          twoYears: twoYearPortfolio,
          fiveYears: fiveYearPortfolio
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>投资推荐</h1>

      <h2>1 年投资组合</h2>
      {portfolio.oneYear.map(stock => (
        <div key={stock.ticker}>
          <strong>{stock.ticker}</strong>: 投资比例: {stock.weight}%
        </div>
      ))}

      <h2>2 年投资组合</h2>
      {portfolio.twoYears.map(stock => (
        <div key={stock.ticker}>
          <strong>{stock.ticker}</strong>: 投资比例: {stock.weight}%
        </div>
      ))}

      <h2>5 年投资组合</h2>
      {portfolio.fiveYears.map(stock => (
        <div key={stock.ticker}>
          <strong>{stock.ticker}</strong>: 投资比例: {stock.weight}%
        </div>
      ))}
    </div>
  );
};

export default Recommend;
