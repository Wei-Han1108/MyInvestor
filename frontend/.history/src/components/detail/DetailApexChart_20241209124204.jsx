import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const DetailApexChart = () => {
  const [stockData, setStockData] = useState([]);

  // AlphaVantage API Key and Base URL
  const API_KEY = 'LGN314BMZQPOI8TL';
  const BASE_URL = 'https://www.alphavantage.co/query';

  // Function to fetch the last 5 years of stock data
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

      // Format the data to fit the format required by ApexCharts
      const formattedData = Object.keys(rawData).map(date => ({
        x: new Date(date),
        y: [
          parseFloat(rawData[date]['1. open']),
          parseFloat(rawData[date]['2. high']),
          parseFloat(rawData[date]['3. low']),
          parseFloat(rawData[date]['4. close'])
        ]
      }));

      // Sort the data by date to ensure proper time sequence
      formattedData.sort((a, b) => new Date(a.x) - new Date(b.x));

      // Filter only the last 5 years of data
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
      const filteredData = formattedData.filter(item => item.x >= fiveYearsAgo);

      setStockData(filteredData);
    } catch (error) {
      console.error('❌ Error fetching stock data:', error.message);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  // Get today's date and the date one month ago
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  // ApexCharts configuration options
  const chartOptions = {
    chart: {
      type: 'candlestick',
      height: 500,
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
      text: 'AAPL Stock Prices (Last 5 Years)',
      align: 'left'
    },
    xaxis: {
      type: 'datetime',
      min: oneMonthAgo.getTime(), // Initial view from one month ago to today
      max: today.getTime(), // Maximum date for the initial view is today
      tickAmount: 6, // Number of ticks on the x-axis
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  return (
    <div>
      <h1>AAPL Stock Data</h1>
      {stockData.length > 0 ? (
        <Chart 
          options={chartOptions} 
          series={[{ data: stockData }]} 
          type="candlestick" 
          height={350} 
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default DetailApexChart;
