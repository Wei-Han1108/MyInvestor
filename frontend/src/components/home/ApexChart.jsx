import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react';
import { useGetWatchlistsQuery } from "../../slices/watchlistApiSlice";
import ReactApexChart from 'react-apexcharts';

const API_KEY = "LGN314BMZQPOI8TL"; // 替换为您的 AlphaVantage API Key
const BASE_URL = "https://www.alphavantage.co/query";

// 獲取股票數據的函數
const fetchStockData = async (symbol) => {
  try {
    const response = await fetch(`${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${API_KEY}`);
    const data = await response.json();

    if (!data["Time Series (60min)"]) {
      throw new Error('未能從API獲取有效數據');
    }

    // 格式化數據
    const seriesData = Object.entries(data["Time Series (60min)"]).map(([time, value]) => ({
      x: new Date(time).getTime(),
      y: parseFloat(value["4. close"])
    }));

    return seriesData.reverse(); // 反轉時間排序
  } catch (error) {
    console.error("獲取數據失敗: ", error);
    return [];
  }
};

// 主組件
const ApexChart = () => {
  const { data: watchListData, isLoading, isError, error } = useGetWatchlistsQuery();

  // 儲存選擇的股票名稱和圖表數據
  const [firstName, setFirstName] = useState(''); // 用狀態存儲股票名稱
  const [chartData, setChartData] = useState([]); // 存儲圖表數據
  const [state, setState] = useState({
    series: [{ name: 'Stock Price', data: [] }],
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: { type: 'x', enabled: true, autoScaleYaxis: true },
        toolbar: { autoSelected: 'zoom' }
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      title: { text: 'Stock Price Movement', align: 'left' },
      fill: {
        type: 'gradient',
        gradient: { shadeIntensity: 1, inverseColors: false, opacityFrom: 0.5, opacityTo: 0, stops: [0, 90, 100] }
      },
      yaxis: {
        labels: { formatter: (val) => val.toFixed(2) },
        title: { text: 'Price (USD)' }
      },
      xaxis: { type: 'datetime' },
      tooltip: {
        shared: false,
        y: { formatter: (val) => val.toFixed(2) + ' USD' }
      }
    }
  });

  // 獲取 watchListData 中的第一個名稱
  useEffect(() => {
    if (!isLoading && !isError && watchListData && watchListData.length > 0) {
      const name = watchListData[0].name; // 確保數據有效後才讀取
      console.log('FirstName:', name);
      setFirstName(name); // 設置第一個股票名稱
    }
  }, [watchListData, isLoading, isError]); // 監聽數據變化

  // 根據 FirstName 請求股票數據
  useEffect(() => {
    const loadData = async () => {
      if (firstName) { // 確保 firstName 有值才請求
        const stockData = await fetchStockData(firstName);
        setChartData(stockData); // 存儲數據
        setState((prevState) => ({
          ...prevState,
          series: [{ name: firstName, data: stockData }]
        }));
      }
    };

    loadData();
  }, [firstName]); // 當 firstName 更新時重新請求數據

  return (
    <Card className="h-80 w-full">
      <h5 className="text-xl font-bold p-1">
        {firstName || 'Loading...'} {/* 顯示當前股票名稱 */}
      </h5>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
      </div>
    </Card>
  );
};

export default ApexChart;
