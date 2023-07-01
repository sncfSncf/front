import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, Title, Tooltip, Legend, ArcElement, PieController } from 'chart.js';
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const StatsChart = ({ data ,chartType,title}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = new Chart(chartRef.current, {
      type: chartType,
      data: {
        labels: data?.labels,
        datasets: [
          {
            label: 'Dataset',
            data: data?.datasets,
            backgroundColor: data?.datasets?.map(() => getRandomColor()),
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: title,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};
export default StatsChart;