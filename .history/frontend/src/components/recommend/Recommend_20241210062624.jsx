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

  // 获取 watchlist 中的股票
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

  // 获取股票的历史数据 (动态时间范围)
  const fetchStockHistory = async (symbol, years) => {
    try {
      const { data } = await axios.get(`${BASE_URL}?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`);
      const timeSeries = data["Weekly Adjusted Time Series"];
      if (!timeSeries) return [];
      
      const endDate = new Date();
      const startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - years);

      const history = Object.entries(timeSeries)
        .filter(([date]) => new Date(date) >= startDate && new Date(date) <= endDate)
        .map(([date, values]) => ({
          date,
          close: parseFloat(values['4. close']),
        }));
        
      return history;
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      return [];
    }
  };

  // 使用Kelly公式计算最佳投资比例
  const calculateKellyCriterion = (winProbability, winLossRatio) => {
    return (winProbability - (1 - winProbability) / winLossRatio);
  };

  // 生成投资组合建议
  const generateRecommendations = async () => {
    try {
      setLoading(true);
      const timePeriods = [1, 3, 5]; // 1年, 3年, 5年
      const allStockData = await Promise.all(
        watchListData.map(async (stock) => {
          const stockHistory = {};
          for (let years of timePeriods) {
            stockHistory[years] = await fetchStockHistory(stock.name, years);
          }

          if (!stockHistory[1].length) return null; // 没有数据时跳过

          return {
            name: stock.name,
            history: stockHistory,
          };
        })
      );

      const validStockData = allStockData.filter(stock => stock !== null);

      const portfolioRecommendations = timePeriods.map(period => {
        const optimizedPortfolio = optimizePortfolio(validStockData, period);
        return {
          period: `${period} Year`,
          stocks: optimizedPortfolio
        };
      });

      setPortfolioRecommendations(portfolioRecommendations);
    } catch (error) {
      console.error("Error generating recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  // 生成组合的所有可能的排列 (3个为一组)
  const generateCombinations = (stockData, size) => {
    const results = [];
    const combination = (arr, k) => {
      if (k === 0) {
        results.push(arr);
        return;
      }
      for (let i = 0; i < stockData.length; i++) {
        combination([...arr, stockData[i]], k - 1);
      }
    };
    combination([], size);
    return results;
  };

  // 计算投资组合的风险 (协方差)
  const calculatePortfolioRisk = (returns) => {
    const averageReturn = returns.map(stockReturns => 
      stockReturns.reduce((sum, value) => sum + value, 0) / stockReturns.length
    );

    const covarianceMatrix = returns.map(stockReturns =>
      returns.map(otherStockReturns => {
        const n = stockReturns.length;
        const meanA = stockReturns.reduce((sum, val) => sum + val, 0) / n;
        const meanB = otherStockReturns.reduce((sum, val) => sum + val, 0) / n;
        return stockReturns.reduce((sum, val, i) => sum + (val - meanA) * (otherStockReturns[i] - meanB), 0) / (n - 1);
      })
    );

    return covarianceMatrix.flat().reduce((a, b) => a + b, 0);
  };

  // 生成投资组合优化方案
  const optimizePortfolio = (stockData, years) => {
    const allCombinations = generateCombinations(stockData, 3);
    const portfolioScores = allCombinations.map(combination => {
      const portfolioReturns = combination.map(stock => stock.history[years].map(h => h.close));
      const totalKelly = combination.reduce((acc, stock) => acc + stock.kellyRatio, 0);
      const combinedCovariance = calculatePortfolioRisk(portfolioReturns);
      return { combination, risk: combinedCovariance, totalKelly };
    });

    portfolioScores.sort((a, b) => b.totalKelly - a.totalKelly);
    return portfolioScores.slice(0, 3).map(portfolio => ({
      stocks: portfolio.combination.map(stock => stock.name),
      totalKelly: portfolio.totalKelly.toFixed(2),
      risk: portfolio.risk.toFixed(2),
    }));
  };

  // 页面加载时生成推荐
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
                  <Table.HeadCell>股票代码</Table.HeadCell>
                  <Table.HeadCell>Kelly 比率</Table.HeadCell>
                  <Table.HeadCell>风险 (协方差)</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {stocks.map((stock, idx) => (
                    <Table.Row key={idx}>
                      <Table.Cell>{stock.stocks.join(", ")}</Table.Cell>
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
