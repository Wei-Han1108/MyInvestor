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
        type: 'datetime', // Using datetime for X-axis to plot the dates correctly
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

    // Function to fetch stock data
    const fetchStockData = async (startDate) => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            function: "TIME_SERIES_DAILY",
            symbol: "AAPL", // Stock symbol
            apikey: API_KEY,
            outputsize: "full", // Ensures that we get the full historical data (up to 20 years)
          },
        });

        const timeSeries = response.data["Time Series (Daily)"];
        const dates = Object.keys(timeSeries).reverse(); // Reverse to get the most recent date first
        const prices = dates.map((date) => ({
          x: new Date(date).getTime(), // Convert date to timestamp
          y: parseFloat(timeSeries[date]["4. close"]), // Close price
        }));

        return prices;
      } catch (err) {
        console.error("Error fetching stock data:", err);
        return [];
      }
    };

    // Fetch data for the last 5 years
    const fetchData = async () => {
      let allData = [];
      let startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 5); // Set start date to 5 years ago
      const formattedStartDate = startDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD

      const data = await fetchStockData(formattedStartDate);
      allData = [...allData, ...data]; // Combine the data

      setState((prevState) => ({
        ...prevState,
        series: [{
          name: 'AAPL Stock Price',
          data: allData, // Set the stock price data
        }],
      }));
    };

    fetchData();
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default ApexChart;
