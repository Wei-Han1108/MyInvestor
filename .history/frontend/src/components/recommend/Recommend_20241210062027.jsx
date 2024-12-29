import React, { useState, useEffect } from "react";
import { Card, Table, Spinner } from "flowbite-react";
import axios from "axios";

const API_KEY = 'LGN314BMZQPOI8TL';
const BASE_URL = 'https://www.alphavantage.co/query';

// 计算协方差
const covariance = (x, y) => {
  if (x.length !== y.length) {
    throw new Error("X 和 Y 的长度必须相同");
  }
  const xMean = x.reduce((acc, xi) => acc + xi, 0) / x.length;
  const yMean = y.reduce((acc, yi) => acc + yi, 0) / y.length;
  
  const cov = x.reduce((acc, xi, i) => acc + (xi - xMean) * (y[i] - yMean), 0) / (x.length - 1);
  return cov;
};

// 计算Kelly标准的函数
const calculateKellyCriterion = (winProbability, winLossRatio) => {
  return (winProbability - (1 - winProbability) / winLossRatio);
};

// 计算股票的技术指标，如移动平均线
const calculateTechnicalIndicators = (historicalData) => {
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

const Recommend = () => {
  const [watchListData, setWatchListData] = useState([]);
  const [portfolioRecommendations, setPortfolioRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const fetchStockHistory = async (symbol) => {
    try {
      const { data } = await axios.get(`${BASE_URL}?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`);
      const timeSeries = data["Time Series (Daily)"];
      if (!timeSeries) return [];
      return Object.entries(timeSeries).map(([date, values]) => ({
        date,
        close: parseFloat(values['4. close']),
      }));
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      return [];
    }
  };

  const generateRecommendations = async () => {
    try {
      setLoading(true);
      const allStockData = await Promise.all(
        watchListData.map(async (stock) => {
          const history = await fetchStockHistory(stock.name);
          if (!history.length) return null;

          const { shortTermMA, longTermMA } = calculateTechnicalIndicators(history);
          const winProbability = 0.55; 
          const winLossRatio = 2;
          const kellyRatio = calculateKellyCriterion(winProbability, winLossRatio);

          return {
            name: stock.name,
            history: history.map(h => h.close),
            kellyRatio,
            shortTermMA,
            longTermMA,
          };
        })
      );

      const validStockData = allStockData.filter(stock => stock !== null);
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

  const optimizePortfolio = (stockData, years) => {
    const allCombinations = generateCombinations(stockData, 3);
    const portfolioScores = allCombinations.map(combination => {
      const combinedCovariance = calculatePortfolioRisk(combination);
      const totalKelly = combination.reduce((acc, stock) => acc + stock.kellyRatio, 0);
      return { combination, risk: combinedCovariance, totalKelly };
    });

    portfolioScores.sort((a, b) => b.totalKelly - a.totalKelly);
    return portfolioScores.slice(0, 3).map(portfolio => ({
      stocks: portfolio.combination.map(stock => stock.name),
      totalKelly: portfolio.totalKelly.toFixed(2),
      risk: portfolio.risk.toFixed(2),
    }));
  };

  const generateCombinations = (arr, k) => {
    if (k === 1) return arr.map(stock => [stock]);
    const combinations = [];
    arr.forEach((stock, index) => {
      const smallerCombos = generateCombinations(arr.slice(index + 1), k - 1);
      smallerCombos.forEach(combo => combinations.push([stock, ...combo]));
    });
    return combinations;
  };

  const calculatePortfolioRisk = (portfolio) => {
    const portfolioReturns = portfolio.map(stock => stock.history.slice(-30)); 
    let totalRisk = 0;

    for (let i = 0; i < portfolioReturns.length; i++) {
      for (let j = i; j < portfolioReturns.length; j++) {
        const cov = covariance(portfolioReturns[i], portfolioReturns[j]);
        totalRisk += i === j ? cov : 2 * cov;
      }
    }

    return totalRisk;
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
          <h2 className="text-xl font-bold mb-4">推荐投资组合</h2>
          {portfolioRecommendations.map(({ period, stocks }, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold">{period} 组合</h3>
              <Table>
                <Table.Head>
                  <Table.HeadCell>股票组合</Table.HeadCell>
                  <Table.HeadCell>总 Kelly 比率</Table.HeadCell>
                  <Table.HeadCell>风险</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {stocks.map((stock, idx) => (
                    <Table.Row key={idx}>
                      <Table.Cell>{stock.stocks.join(', ')}</Table.Cell>
                      <Table.Cell>{stock.totalKelly}</Table.Cell>
                      <Table.Cell>{stock.risk}</Table.Cell>
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
