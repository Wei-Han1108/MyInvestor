import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { Card } from 'flowbite-react';
import axios from 'axios';
const DonutChart = () => {
  const [StockStorage, setStockStorage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/storages");
        setStockStorage(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setStockStorage([]); // Fallback to an empty array
      }
    };    
    fetchData();
  }, []);
  // Generate the data for the chart using StockStorage shareAmount
  const data = {
    name: StockStorage.map((item) => item.name),
    price: StockStorage.map((item) => item.shareAmount),
  };
  const totalValue = StockStorage.map((item) => item.currentValue * item.shareAmount).reduce((a, b) => a + b, 0);
  

  const getChartOptions = () => {
    return {
      series: data.price,
      colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694", "#6F42C1"],
      chart: {
        height: 320,
        width: "100%",
        type: "donut",
      },
      stroke: {
        colors: ["transparent"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: 20,
              },
              total: {
                showAlways: true,
                show: true,
                label: "Current Value",
                fontFamily: "Inter, sans-serif",
                formatter: function (w) {
                  const sum = totalValue;
                  return '$' + sum.toFixed(2);
                },
              },
              value: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: -20,
                formatter: function (value) {
                  return value;
                },
              },
            },
            size: "80%",
          },
        },
      },
      grid: {
        padding: {
          top: -2,
        },
      },
      labels: data.name,
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value;
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value;
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    };
  };

  return (
    <Card className="h-96 w-full">
        <h5 className="text-xl font-bold">
            Assets Allocation:
        </h5>
        <div id="donut-chart">
          <ApexCharts options={getChartOptions()} series={data.price} type="donut" height={380} />
        </div>
      </Card>
  );
};

// DonutChart.propTypes = {
//   stockData: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       shareAmount: PropTypes.number.isRequired,
//     })
//   ).isRequired,
// };

export default DonutChart;
