import React, { useState, useEffect } from "react";
import { Card, Table } from "flowbite-react";
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
      } catch (error) {
        console.error("Error fetching watchlist data:", error);
        setWatchListData([]); // 处理失败，回退到空数组
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="h-80 w-full">
      {watchListData.length}
    </Card>
  );
};

export default Recommend;
