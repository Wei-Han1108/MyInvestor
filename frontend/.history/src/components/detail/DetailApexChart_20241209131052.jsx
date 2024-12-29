import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import { Card } from "flowbite-react";

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
        const prices = dates.map((date) => ({
          x: new Date(date).getTime(), // Convert date to timestamp
          y: parseFloat(timeSeries[date]["4. close"]), // Close price
        }));

        setState((prevState) => ({
          ...prevState,
          series: [{
            name: 'AAPL Stock Price',
            data: prices, // Set the stock price data
          }],
        }));
      } catch (err) {
        console.error("Error fetching stock data:", err);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div>
      <Card>
        <div id="chart">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="area"
            height={800}
        />
      </div>
        
      </Card>
      
    </div>
  );
};

export default ApexChart;
