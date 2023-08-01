import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, Title, Tooltip, Legend, ArcElement, PieController } from 'chart.js';

const colorPalette = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
  '#FF7F50',
  '#DE3163',
  '#9FE2BF',
  '#40E0D0',
  '#6495ED',
  '#CCCCFF',
  '#FFC0CB',
  '#800000',
  '#FFD700',
  '#008080',
  '#800080',
  '#00FF00',
  '#FF00FF',
  '#0000FF',
  '#808000',
  '#FFA500',
  '#FF4500',
  '#2E8B57',
  '#FF6347',
  '#00FFFF',
  '#FF69B4',
  '#008000',
  '#000080',
  '#ADFF2F',
  '#FF1493',
  '#008B8B',
  '#DC143C',
  '#7FFF00',
  '#FF8C00',
  '#BA55D3',
  '#FFDAB9',
  '#7FFFD4',
  '#FFA07A',
  '#BDB76B',
  '#FA8072',
  '#00CED1',
  '#DA70D6',
  '#87CEEB',
  '#F08080',
  '#7CFC00',
  '#9932CC',
  '#48D1CC',
  '#DB7093',
  '#ADFF2F',
  '#FF00FF',
  '#FFD700',
  '#FF6347',
  '#FF4500',
  '#2E8B57',
  '#FF69B4',
  '#DC143C',
  '#FF8C00',
  '#FF1493',
  '#FFB6C1',
  '#8FBC8F',
  '#FFC0CB',
  '#FF00FF',
  '#00FFFF',
  '#7FFF00',
  '#FF4500',
  '#ADFF2F',
  '#BA55D3',
  '#FFDAB9',
  '#DAA520',
  '#FF6347',
  '#FF69B4',
  '#00FFFF',
  '#FFA07A',
  '#CD853F',
  '#BDB76B',
  '#FF7F50',
  '#7CFC00',
  '#DB7093',
  '#00CED1',
  '#FF8C00',
  '#7B68EE',
  '#98FB98',
  '#FF1493',
  '#AFEEEE',
  '#FFE4C4',
  '#F08080',
  '#00FF7F',
  '#9370DB',
  '#00FA9A',
  '#FF00FF',
  '#FFFACD',
  '#3CB371',
  '#8B008B',
  '#00FF00',
  '#FFDAB9',
  '#FFB6C1',
  '#8FBC8F',
  '#CD853F',
  '#D2691E',
  '#7FFF00',
  '#FFFF00',
  '#ADFF2F',
  '#FFE4E1',
  '#FF8C00',
  '#FF7F50',
  '#DC143C',
  '#FF6347',
  '#FF4500',
  '#2E8B57',
  '#FF69B4',
  '#008080',
  '#800080',
  '#00FF00',
  '#FF00FF',
  '#0000FF',
  '#808000',
  '#FFA500',
  '#FF1493',
];


const StatsChart = ({ data, chartType, title }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = new Chart(chartRef.current, {
      type: chartType,
      data: {
        labels: data?.labels,
        datasets: [
          {
            data: data?.datasets,
            backgroundColor: colorPalette.slice(0, data?.datasets.length),
          },
        ],
      },
      options: {
        indexAxis: 'y', // Set the indexAxis to 'y' to swap the labels with the data points
        scales: {
          x: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: title,
          },
          legend: {
            display: chartType === 'bar' ? false : true,
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
