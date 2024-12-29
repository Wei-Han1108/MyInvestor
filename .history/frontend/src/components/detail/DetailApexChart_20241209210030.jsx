import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import { Card } from "flowbite-react";
import { useParams } from "react-router-dom";

const ApexChart = () => {
  // 1️⃣ 在组件的最顶层调用 hooks，确保 hooks 数量和顺序一致
  const { source, id } = useParams(); // 从 URL 中获取 source 和 id
  console.log('Received source:', source, 'id:', id); // 确认 useParams 是否工作正常

  const [stock, setStock] = useState(null); // 确保 hooks 在顶层调用
  const [state, setState] = useState({
    series: [],
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
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return val.toFixed(2);
          },
        },
      },
    },
  });

  // 2️⃣ 使用 useEffect 获取 stock 数据
  useEffect(() => {
    const fetchStock = async () => {
      if (!source || !id) return; // 这里确保 source 和 id 可用
      try {
        const { data } = await axios.get(`/api/details/${source}/${id}`);
        setStock(data); // 设置 stock 数据
      } catch (error) {
        console.error('Error fetching stock:', error);
      }
    };

    fetchStock();
  }, [source, id]); // 确保 useEffect 在 source 和 id 变化时调用

  // 3️⃣ 在 stock 变化时获取股价数据
  useEffect(() => {
    if (!stock) return; // stock 不存在时不执行
    const API_KEY = "LGN314BMZQPOI8TL";
    const BASE_URL = "https://www.alphavantage.co/query";

    const fetchStockData = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            function: "TIME_SERIES_DAILY",
            symbol: `${stock.name}`,
            apikey: API_KEY,
          },
        });

        const timeSeries = response.data["Time Series (Daily)"];
        const dates = Object.keys(timeSeries).reverse(); // 反转日期顺序
        const prices = dates.map((date) => ({
          x: new Date(date).getTime(),
          y: parseFloat(timeSeries[date]["4. close"]),
        }));

        setState((prevState) => ({
          ...prevState,
          series: [{
            name: `${stock.name} Stock Price`,
            data: prices,
          }],
        }));
      } catch (err) {
        console.error("Error fetching stock data:", err);
      }
    };

    fetchStockData();
  }, [stock]); // 当 stock 变化时重新调用 fetchStockData

  // 如果 stock 为空，显示加载页面，确保 hooks 数量不变
  if (!stock) {
    return <p>Loading stock data...</p>;
  }

  return (
    <div>
      <Card>
        <h5 className="text-xl font-bold p-1">{stock.name}</h5>
        <div id="chart">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="area"
            height={840}
          />
        </div>
      </Card>
    </div>
  );
};

export default ApexChart;
