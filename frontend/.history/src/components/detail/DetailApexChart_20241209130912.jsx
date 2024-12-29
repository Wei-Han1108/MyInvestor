import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
  const [state, setState] = useState({
    series: [{
      name: 'AAPL Stock Price',
      data: []
    }],
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: 'zoom',
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'AAPL Stock Price Movement',
        align: 'left',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        title: {
          text: 'Price (USD)',
        },
      },
      xaxis: {
        type: 'datetime',
        min: undefined, // Set this dynamically for current month view
        max: undefined, // Set this dynamically for current month view
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return val.toFixed(2); // Formatting the price value
          },
        },
      },
    },
  });

  useEffect(() => {
    const API_KEY = "LGN314BMZQPOI8TL"; // Your API key here
    const BASE_URL = "https://www.alphavantage.co/query";

    const fetchStockData = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            function: "TIME_SERIES_DAILY",
            symbol: "AAPL", // Stock symbol (AAPL in this case)
            apikey: API_KEY,
          },
        });

        const timeSeries = response.data["Time Series (Daily)"];
        const dates = Object.keys(timeSeries).reverse(); // Reverse to get the most recent date first
        
        // Get 5 years of data
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

        const prices = dates
          .filter((date) => new Date(date) >= fiveYearsAgo) // Filter to get data from the last 5 years
          .map((date) => ({
            x: new Date(date).getTime(), // Convert date to timestamp
            y: parseFloat(timeSeries[date]["4. close"]), // Close price
          }));

        // Get the current month range for zooming
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        setState((prevState) => ({
          ...prevState,
          series: [{
            name: 'AAPL Stock Price',
            data: prices, // Set the stock price data
          }],
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              min: firstDayOfMonth.getTime(),
              max: lastDayOfMonth.getTime(),
            },
          },
        }));
      } catch (err) {
        console.error("Error fetching stock data:", err);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={800}
        />
      </div>
    </div>
  );
};

export default ApexChart;
