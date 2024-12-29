import React, { useState, useEffect } from "react";
import { Card, Table, Spinner } from "flowbite-react";
import axios from "axios";

const API_KEY = 'LGN314BMZQPOI8TL';
const BASE_URL = 'https://www.alphavantage.co/query';

// 主组件
const Recommend = () => {
  const [watchListData, setWatchListData] = useState([]);
  const [portfolioRecommendations, setPortfolioRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  // 获取watchlist中的股票
  useEffect(() => {
    const fetchWatchList = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/watchlists");
        setWatchListData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching watchlist data:", error);
        setWatchListData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchList();
  }, []);

  // 获取股票的历史数据
  const fetchStockHistory = async (ticker) => {
    try {
      const { data } = await axios.get(`${BASE_URL}?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${API_KEY}`);
      const timeSeries = data["Time Series (Daily)"];
      if (!timeSeries) return [];
      return Object.entries(timeSeries).map(([date, values]) => ({
        date,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseInt(values['6. volume'], 10),
      }));
    } catch (error) {
      console.error(`Error fetching data for ${ticker}:`, error);
      return [];
    }
  };

  // 使用Kelly公式计算最佳投资比例
  const calculateKellyCriterion = (winProbability, winLossRatio) => {
    return (winProbability - (1 - winProbability) / winLossRatio);
  };

  // 计算技术指标（例如移动平均线）
  const calculateTechnicalIndicators = (historicalData) => {
    // 计算10天和50天的移动平均线
    const calculateMovingAverage = (data, windowSize) => {
      return data.map((_, idx, arr) => {
        if (idx < windowSize - 1) return null;
        const windowData = arr.slice(idx - windowSize + 1, idx + 1);
        const sum = windowData.reduce((acc, entry) => acc + entry.close, 0);
        return sum / windowSize;
      });
    };

    const shortTermMA = calculateMovingAverage(historicalData, 10);
    const longTermMA = calculateMovingAverage(historicalData, 50);

    return { shortTermMA, longTermMA };
  };

  // 生成投资组合建议
  const generateRecommendations = async () => {
    try {
      setLoading(true);
      const allStockData = await Promise.all(
        watchListData.map(async (stock) => {
          const history = await fetchStockHistory(stock.ticker);
          if (!history.length) return null;

          const { shortTermMA, longTermMA } = calculateTechnicalIndicators(history);
          const winProbability = 0.55; // 假设胜率55%
          const winLossRatio = 2; // 假设盈亏比2:1
          const kellyRatio = calculateKellyCriterion(winProbability, winLossRatio);

          return {
            ticker: stock.ticker,
            history,
            shortTermMA,
            longTermMA,
            kellyRatio,
          };
        })
      );

      // 过滤掉为空的数据
      const validStockData = allStockData.filter(stock => stock !== null);

      // 排序和优化投资组合（假设每年挑选3只股票）
      const oneYearPortfolio = optimizePortfolio(validStockData, 1);
      const twoYearPortfolio = optimizePortfolio(validStockData, 2);
      const fiveYearPortfolio = optimizePortfolio(validStockData, 5);

      setPortfolioRecommendations([
        { period: '1 Year', stocks: oneYearPortfolio },
        { period: '2 Years', stocks: twoYearPortfolio },
        { period: '5 Years', stocks: fiveYearPortfolio },
      ]);
    } catch (error) {
      console.error("Error generating recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  // 优化投资组合（示例算法，基于Kelly比率排序）
  const optimizePortfolio = (stockData, years) => {
    return stockData
      .sort((a, b) => b.kellyRatio - a.kellyRatio) // 根据Kelly比率从高到低排序
      .slice(0, 3) // 取前三个股票
      .map(stock => ({
        ticker: stock.ticker,
        kellyRatio: stock.kellyRatio.toFixed(2),
        shortTermMA: stock.shortTermMA.slice(-1)[0]?.toFixed(2),
        longTermMA: stock.longTermMA.slice(-1)[0]?.toFixed(2),
      }));
  };

  // 页面加载时生成推荐
  useEffect(() => {
    if (watchListData.length > 0) {
      watchListData.forEach((stock) => {
        console.log(`111Fetching data for ${stock.name}`);
      })
      generateRecommendations();
    }
  }, [watchListData]);

  return (
    <Card className="h-auto w-full">
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner aria-label="Loading spinner" size="xl" />
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">推荐投资组合</h2>
          {portfolioRecommendations.map(({ period, stocks }, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold">{period} 组合</h3>
              <Table>
                <Table.Head>
                  <Table.HeadCell>股票代码</Table.HeadCell>
                  <Table.HeadCell>Kelly 比率</Table.HeadCell>
                  <Table.HeadCell>短期MA(10天)</Table.HeadCell>
                  <Table.HeadCell>长期MA(50天)</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {stocks.map((stock, idx) => (
                    <Table.Row key={idx}>
                      <Table.Cell>{stock.ticker}</Table.Cell>
                      <Table.Cell>{stock.kellyRatio}</Table.Cell>
                      <Table.Cell>{stock.shortTermMA}</Table.Cell>
                      <Table.Cell>{stock.longTermMA}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          ))}
        </>
      )}
    </Card>
  );
};

export default Recommend;
