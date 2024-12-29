import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const DetailApexChart = () => {
  const [stockData, setStockData] = useState([]);

  // AlphaVantage API Key 和 URL
  const API_KEY = 'LGN314BMZQPOI8TL';
  const BASE_URL = 'https://www.alphavantage.co/query';

  // 获取最近 5 年的股票数据
  const fetchStockData = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          function: 'TIME_SERIES_DAILY_ADJUSTED',
          symbol: 'AAPL',
          apikey: API_KEY
        }
      });

      const rawData = response.data['Time Series (Daily)'];

      // 格式化数据，适配ApexCharts的格式
      const formattedData = Object.keys(rawData).map(date => ({
        x: new Date(date),
        y: [
          parseFloat(rawData[date]['1. open']),
          parseFloat(rawData[date]['2. high']),
          parseFloat(rawData[date]['3. low']),
          parseFloat(rawData[date]['4. close'])
        ]
      }));

      // 按时间排序，确保图表从过去到现在的顺序
      formattedData.sort((a, b) => new Date(a.x) - new Date(b.x));

      // 仅获取最近 5 年的数据
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
      const filteredData = formattedData.filter(item => item.x >= fiveYearsAgo);

      setStockData(filteredData);
    } catch (error) {
      console.error('❌ 获取股票数据出错:', error.message);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  // 获取今天和一个月前的时间戳
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  // ApexCharts 配置项
  const chartOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        show: true,
        tools: {
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      }
    },
    title: {
      text: 'AAPL 股票价格（最近 5 年）',
      align: 'left'
    },
    xaxis: {
      type: 'datetime',
      min: oneMonthAgo.getTime(), // 初始范围从一个月前到今天
      max: today.getTime(), // 初始范围的最大日期为今天
      tickAmount: 6, // 显示的刻度数量
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  return (
    <div>
      <h1>AAPL 股票数据</h1>
      {stockData.length > 0 ? (
        <Chart 
          options={chartOptions} 
          series={[{ data: stockData }]} 
          type="candlestick" 
          height={350} 
        />
      ) : (
        <p>加载数据中...</p>
      )}
    </div>
  );
};

export default DetailApexChart;
