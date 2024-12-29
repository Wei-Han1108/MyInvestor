import React, { useState, useEffect } from 'react';
import { Card, Table } from 'flowbite-react';
import ReactApexChart from 'react-apexcharts';
const API_KEY = "LGN314BMZQPOI8TL"; // 替换为您的 AlphaVantage API Key
const BASE_URL = "https://www.alphavantage.co/query";

const fetchStockData = async (symbol) => {
  try {
    const response = await fetch(`${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${API_KEY}`);
    const data = await response.json();
    
    // 检查数据的正确性
    if (!data["Time Series (60min)"]) {
      throw new Error('未能从API获取有效数据');
    }
    
    // 将时间和价格提取成 ApexChart 需要的格式
    const seriesData = Object.entries(data["Time Series (60min)"]).map(([time, value]) => {
      return {
        x: new Date(time).getTime(), // 将时间字符串转为时间戳
        y: parseFloat(value["4. close"]) // 获取收盘价
      };
    });

    // 仅保留最近7天的数据
    const last7DaysData = seriesData.slice(0, 7 * 24); // 每小时1个点，7天x24小时 = 168个点
    return last7DaysData.reverse(); // 按时间排序
  } catch (error) {
    console.error("获取数据失败: ", error);
  }
};

const ApexChart = () => {
    const [state, setState] = React.useState({
      series: [{
        name: 'Stock Price',
        data: [] // 初始数据为空
      }],
      options: {
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'Stock Price Movement',
          align: 'left'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val.toFixed(2); // 保留两位小数
            },
          },
          title: {
            text: 'Price (USD)'
          },
        },
        xaxis: {
          type: 'datetime',
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return val.toFixed(2) + ' USD'; // 格式化工具提示
            }
          }
        }
      },
    });
  
    // 当组件加载完成后加载数据
    React.useEffect(() => {
      const loadData = async () => {
        const stockData = await fetchStockData('Best stock this week: AAPL'); // 可以替换成你感兴趣的股票代码
        if (stockData) {
          setState((prevState) => ({
            ...prevState,
            series: [{ 
              name: 'AAPL', 
              data: stockData 
            }]
          }));
        }
      };
  
      loadData();
    }, []);
  
    return (
        <Card className="h-80 w-full">
        <h5 className="text-xl font-bold p-1">
        AAPL
        </h5>
        <div id="chart">
          <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
        </div>
      </Card>
    );
  };
  
//   const domContainer = document.querySelector('#app');
//   ReactDOM.render(<ApexChart />, domContainer);
  
  export default ApexChart;  
