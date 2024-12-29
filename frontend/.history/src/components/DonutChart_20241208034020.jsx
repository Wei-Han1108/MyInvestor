import React from 'react';
import PropTypes from 'prop-types';

function generateStockStorage() {
  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
  };

  return [
    { name: 'Cluster 1', value: 210, color: generateRandomColor() },
    { name: 'Cluster 2', value: 30, color: generateRandomColor() },
    { name: 'Cluster 3', value: 180, color: generateRandomColor() },
    { name: 'Cluster 4', value: 260, color: generateRandomColor() },
    { name: 'Cluster 5', value: 60, color: generateRandomColor() },
  ].sort((a, b) => a.value - b.value);
}

const DonutChart = () => {
  const data = generateStockStorage();
  const total_value = data.reduce((a, b) => a + b.value, 0);
  const convertToPercent = (num) => Math.round((num / total_value) * 100);
  const convertToDegrees = (num) => Math.round((num / 100) * 360);

  const css_string = data
    .reduce((items, item, index, array) => {
      items.push(item);

      item.count = item.count || 0;
      item.count += array[index - 1]?.count || item.count;
      item.start_value = array[index - 1]?.count ? array[index - 1].count : 0;
      item.end_value = item.count += item.value;
      item.start_percent = convertToPercent(item.start_value);
      item.end_percent = convertToPercent(item.end_value);
      item.start_degrees = convertToDegrees(item.start_percent);
      item.end_degrees = convertToDegrees(item.end_percent);

      return items;
    }, [])
    .map((chart) => {
      const { color, start_degrees, end_degrees } = chart;
      return ` ${color} ${start_degrees}deg ${end_degrees}deg`;
    })
    .join();

  return (
    <div className="flex flex-col gap-8 grow">
      <div className="flex flex-col grow">
        <h2 className="m-0 text-white text-xl font-bold">Donut Chart 2</h2>
        <a
          href="https://github.com/PaulieScanlon/css-conic-gradient-charts/blob/main/components/donut-2.js"
          target="_blank"
          rel="noopener"
          className="m-0 text-xs text-gray-400 flex hover:text-fuchsia-300"
        >
          ./components/donut-2.js
        </a>
      </div>
      <div>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rounded-full">
          <clipPath id="hole">
            <path d="M 50 0 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100 v 18 a 2 2 0 0 0 0 64 2 2 0 0 0 0 -64" />
          </clipPath>

          <foreignObject x="0" y="0" width="100" height="100" clipPath="url(#hole)">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              className="w-full h-full"
              style={{
                background: `conic-gradient(${css_string})`,
              }}
            />
          </foreignObject>
        </svg>
      </div>
    </div>
  );
};

export default DonutChart;