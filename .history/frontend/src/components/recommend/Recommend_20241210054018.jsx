import React, { useState, useEffect } from "react";
import { Card, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";

// 主组件
const Recommend = () => {
  const [watchListData, setWatchListData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/watchlists");
        setWatchListData(Array.isArray(data) ? data : []);
        // Step 2: 为每个股票从 API 获取历史数据
        const stockDataPromises = data.map(stock => 
          getStockHistory(stock.name, 1) // 获取过去 20 年的股票数据
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



  return (
    <Card className="h-80 w-full">
      watchListData.length
    </Card>
  );
};

export default Recommend;
