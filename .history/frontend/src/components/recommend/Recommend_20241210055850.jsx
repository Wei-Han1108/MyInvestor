import React, { useState, useEffect } from "react";
import { Card, Table, Spinner } from "flowbite-react";
import axios from "axios";
import math from 'mathjs'; // 用于协方差和矩阵运算

const API_KEY = 'LGN314BMZQPOI8TL';
const BASE_URL = 'https://www.alphavantage.co/query';

const Recommend = () => {
  const [watchListData, setWatchListData] = useState([]);
  const [portfolioRecommendations, setPortfolioRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  // 获取 watchlist 中的股票
  useEffect(() => {
    const fetchWatchList = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/watchlists");
        setWatchListData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching watchlist data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchList();
  }, []);

  // 获取股票的历史数据
  const fetchStockHistory = async (symbol) => {
    try {
      const { data } = await axios.get(`${BASE_URL}?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`);
      const timeSeries = data["Time Series (Daily)"];
      if (!timeSeries) return [];
      return Object.entries(timeSeries).map(([date, values]) => ({
        date,
        close: parseFloat(values['4. close'])
      }));
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      return [];
    }
  };

  // 计算股票的日收益率
  const calculateDailyReturns = (priceData) => {
    return priceData.slice(1).map((entry, index) => {
      const prevClose = priceData[index].close;
      const dailyReturn = (entry.close - prevClose) / prevClose;
      return dailyReturn;
    });
  };

  // 生成投资组合建议
  const generateRecommendations = async () => {
    try {
      setLoading(true);
      const allStockData = await Promise.all(
        watchListData.map(async (stock) => {
          const history = await fetchStockHistory(stock.name);
          const dailyReturns = calculateDailyReturns(history);
          return { name: stock.name, dailyReturns };
        })
      );

      // 过滤掉为空的股票数据
      const validStockData = allStockData.filter(stock => stock.dailyReturns && stock.dailyReturns.length > 0);

      // 提取所有股票的收益率矩阵
      const returnsMatrix = validStockData.map(stock => stock.dailyReturns);
      const covarianceMatrix = math.cov(returnsMatrix);

      // 生成投资组合 (穷举法示例，可扩展为遗传算法等)
      const portfolios = generatePortfolios(validStockData, covarianceMatrix);

      // 取出表现最好的前三个投资组合
      const topPortfolios = portfolios
        .sort((a, b) => b.sharpeRatio - a.sharpeRatio)
        .slice(0, 3);

      setPortfolioRecommendations(topPortfolios);
    } catch (error) {
      console.error("Error generating recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  // 生成投资组合（穷举法示例，可替换为遗传算法）
  const generatePortfolios = (stockData, covarianceMatrix) => {
    const portfolios = [];

    // 随机生成 1000 组组合权重
    for (let i = 0; i < 1000; i++) {
      const weights = stockData.map(() => Math.random());
      const weightSum = weights.reduce((acc, w) => acc + w, 0);
      const normalizedWeights = weights.map(w => w / weightSum); // 归一化权重

      // 计算组合收益率和风险
      const portfolioReturn = stockData.reduce((acc, stock, index) => acc + (math.mean(stock.dailyReturns) * normalizedWeights[index]), 0);
      const variance = math.multiply(math.multiply(normalizedWeights, covarianceMatrix), normalizedWeights);
      const portfolioRisk = Math.sqrt(variance);

      // 计算夏普比率 (无风险收益率假设为 0)
      const sharpeRatio = portfolioReturn / portfolioRisk;

      portfolios.push({
        weights: normalizedWeights,
        expectedReturn: portfolioReturn,
        risk: portfolioRisk,
        sharpeRatio
      });
    }

    return portfolios;
  };

  useEffect(() => {
    if (watchListData.length > 0) {
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
          <h2 className="text-xl font-bold mb-4">推荐的投资组合</h2>
          {portfolioRecommendations.map((portfolio, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold">投资组合 {index + 1}</h3>
              <Table>
                <Table.Head>
                  <Table.HeadCell>股票代码</Table.HeadCell>
                  <Table.HeadCell>权重</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {watchListData.map((stock, idx) => (
                    <Table.Row key={idx}>
                      <Table.Cell>{stock.name}</Table.Cell>
                      <Table.Cell>{(portfolio.weights[idx] * 100).toFixed(2)}%</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <p>预期回报率: {portfolio.expectedReturn.toFixed(4)}</p>
              <p>风险 (标准差): {portfolio.risk.toFixed(4)}</p>
              <p>夏普比率: {portfolio.sharpeRatio.toFixed(4)}</p>
            </div>
          ))}
        </>
      )}
    </Card>
  );
};

export default Recommend;
