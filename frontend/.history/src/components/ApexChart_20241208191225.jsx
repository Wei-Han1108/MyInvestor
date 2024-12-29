import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [state, setState] = useState({
    series: [{ name: 'AAPL', data: [] }],
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
        size: 0
      },
      title: {
        text: 'AAPL Stock Price Movement (Past Week)',
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
        }
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return `$${val.toFixed(2)}`;
          }
        },
        title: {
          text: 'Price (USD)'
        }
      },
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'MMM dd'
        }
      },
      tooltip: {
        shared: false,
        x: {
          format: 'dd MMM yyyy'
        },
        y: {
          formatter: function (val) {
            return `$${val.toFixed(2)}`;
          }
        }
      }
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.twelvedata.com/time_series?symbol=AAPL&interval=1day&outputsize=7&apikey=YOUR_API_KEY');
        const data = await response.json();
        
        if (data.values) {
          const formattedData = data.values.map(d => [new Date(d.datetime).toISOString(), parseFloat(d.close)]);
          
          setState(prevState => ({
            ...prevState,
            series: [{ name: 'AAPL', data: formattedData.reverse() }] // 反转数据，使得最早的日期在前
          }));
        } else {
          console.error('No data returned from API');
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
      </div>
    </div>
  );
};

export default ApexChart;
