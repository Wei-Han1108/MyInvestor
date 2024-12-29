import React, { useState, useEffect } from "react";
import { Card, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";

// 获取股票历史数据的函数
const getStockHistory = async (ticker, years) => {
  const BASE_URL = 'https://www.alphavantage.co/query';
  const API_KEY = 'LGN314BMZQPOI8TL';
  console.log("ticker" + ticker);
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: `${ticker}`,
        apikey: API_KEY,
      }
    });
    console.log(response.data);
    const data = response.data['Time Series (Daily)'];
    const history = Object.entries(data)
      .map(([date, values]) => ({
        date,
        close: parseFloat(values['4. close']),
      }))
      .slice(0, years * 252); // 252个交易日/年

    return { ticker, history };

  } catch (error) {
    console.error(`Error fetching stock history for ${ticker}:`, error);
    return null;
  }
};

// 主组件
const Recommend = () => {
  const [watchListData, setWatchListData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/watchlists");
        setWatchListData(Array.isArray(data) ? data : []);
        console.log("Watchlist data:", data);
        // Step 2: 为每个股票从 API 获取历史数据
        const stockDataPromises = data.map(stock => 
          getStockHistory(stock.ticker, 1) // 获取过去 20 年的股票数据
        );
        const stockData = await Promise.all(stockDataPromises);
        
        // 将历史数据存储到数据库
        await storeStockHistory(stockData);
      } catch (error) {
        console.error("Error fetching watchlist data:", error);
        setWatchListData([]); // 处理失败，回退到空数组
      }
    };

    fetchData();
  }, []);

  // 存储股票历史数据到数据库
  const storeStockHistory = async (stockData) => {
    try {
      setLoading(true);

      // 假设你有一个API端点用于保存数据
      const response = await axios.post("/api/saveStockHistory", stockData);
      if (response.status === 200) {
        console.log('Stock history successfully saved to database');
      }
    } catch (error) {
      console.error("Error saving stock data to the database:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-80 w-full">
      <h5 className="text-xl font-bold p-1">WatchList:</h5>
      <div className="overflow-y-auto">
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Percent Change</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Action</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {watchListData.length > 0 ? (
              watchListData.map((stock) => (
                <Table.Row
                  key={stock._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {stock.name}
                  </Table.Cell>
                  <Table.Cell>{stock.price.toFixed(2)}</Table.Cell>
                  <Table.Cell
                    className={
                      stock.percentChange >= 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    {stock.percentChange.toFixed(2)}%
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/details/watchlists/${stock._id}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Remove
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={7} className="text-center">
                  No stock data available.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </Card>
  );
};

export default Recommend;
