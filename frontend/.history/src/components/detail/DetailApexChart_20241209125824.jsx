import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";

const DetailApexChart = () => {
  const [chartData, setChartData] = useState([]);
  const [dates, setDates] = useState([]);
  const [prices, setPrices] = useState([]);
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

      const timeSeries = response.data["Time Series (Daily)"];
      const allDates = Object.keys(timeSeries).reverse(); // Reverse to get most recent date first
      const allPrices = allDates.map(
        (date) => parseFloat(timeSeries[date]["4. close"])
      );

      // Get data for the last month (30 days)
      const lastMonthData = allDates.slice(0, 30);
      const lastMonthPrices = lastMonthData.map(
        (date) => parseFloat(timeSeries[date]["4. close"])
      );

      // Set chart data (showing the last month's data initially)
      setDates(lastMonthData);
      setPrices(lastMonthPrices);

      setChartData([
        {
          name: "Close Price",
          data: lastMonthPrices,
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

  // Chart options
  const chartOptions = {
    chart: {
      id: "stock-chart",
      type: "area", // Line chart to show stock prices
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
      categories: dates, // Use the dates for the X axis
      title: {
        text: "Date",
      },
      labels: {
        rotate: -45, // Rotate the labels for better readability
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
    tooltip: {
      x: {
        format: "yyyy-MM-dd", // Format the tooltip to show the date in a readable format
      },
    },
  };

  return (
    <div className="chart-container">
      <ApexCharts options={chartOptions} series={chartData} type="area" height={350} />
    </div>
  );
};

export default DetailApexChart;
