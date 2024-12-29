import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";

const DetailApexChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "LGN314BMZQPOI8TL"; // Replace with your AlphaVantage API key
  const BASE_URL = "https://www.alphavantage.co/query";

  // Fetch stock data
  const fetchStockData = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          function: "TIME_SERIES_DAILY",
          symbol: "AAPL", // Replace with the desired stock symbol
          apikey: API_KEY,
        },
      });

      // Format data for ApexCharts
      const timeSeries = response.data["Time Series (Daily)"];
      const dates = Object.keys(timeSeries).reverse(); // Reverse to get the most recent date first
      const prices = dates.map((date) => parseFloat(timeSeries[date]["4. close"]));

      setChartData([
        {
          name: "Close Price",
          data: prices,
        },
      ]);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching stock data:", err.message);
      setError("Failed to fetch stock data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  if (loading) return <p>Loading chart data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const chartOptions = {
    chart: {
      id: "stock-chart",
      type: "line", // Use line chart instead of candlestick
      zoom: {
        enabled: true, // Enable zooming
        type: "x", // Enable zooming on the x-axis (date)
        resetIcon: {
          offsetX: -10,
          offsetY: 0,
          zoomInIcon: "fa fa-search-plus",
          zoomOutIcon: "fa fa-search-minus",
          resetIcon: "fa fa-times-circle",
        },
      },
    },
    xaxis: {
      categories: Object.keys(timeSeries).reverse(), // Dates
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Price (USD)",
      },
    },
    title: {
      text: "AAPL Stock Price (Close)",
      align: "center",
    },
  };

  return (
    <div className="chart-container">
      <ApexCharts options={chartOptions} series={chartData} type="line" height={350} />
    </div>
  );
};

export default DetailApexChart;
