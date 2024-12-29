import React from 'react';
// import ApexCharts from 'react-apexcharts';
import PropTypes from 'prop-types';
import StockStorageData from '../genarateStockStorage';

const DonutChart = () => {
  // Generate the data for the chart using StockStorage shareAmount
  const data = {
    name: StockStorageData.map((item) => item.name),
    price: StockStorageData.map((item) => item.shareAmount),
  };

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
                label: "Total Investment",
                fontFamily: "Inter, sans-serif",
                formatter: function (w) {
                  const sum = w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                  return '$' + sum;
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
    <div id="donut-chart">
      <ApexCharts options={getChartOptions()} series={data.price} type="donut" height={320} />
    </div>
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
